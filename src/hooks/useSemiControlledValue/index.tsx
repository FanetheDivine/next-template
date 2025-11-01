import { useRef, useState } from 'react'
import { useMemoizedFn } from 'ahooks'
import type { ValueController, ValueControllerOptions, OnChange, ValueObj } from 'value-controller'
import { useImmediateEffect } from '../useImmediateEffect'

/**
 * 根据原始值生成一个半受控的新值.原始值的改变会同时新值;也可以单独更改新值\
 * 原始值的改变优先级较高
 * @example
 * ```
 * // text是半受控的值
 * // props变化时 text会变为新的props.value
 * // 与此同时 还可以仅变更text的值
 *
 * // props: {value,onChange}
 * const [text,setText] = useSemiControlledValue(props)
 *
 * <input value={text} onChange={e => setText(e.target.value)}/>
 * ```
 */
export function useSemiControlledValue<
  V = any,
  Options extends Omit<ValueControllerOptions, 'updater'> = object,
>(
  valueController: ValueController<
    V,
    // onChange不会接受到函数参数
    Omit<Options, 'updater'> & { updater: false }
  >,
) {
  const { value, onChange } = valueController
  const [changedValue, setChangedValue] = useState(value)
  const currentValueRef = useRef(value)
  useImmediateEffect(() => {
    currentValueRef.current = changedValue
  }, [changedValue])
  useImmediateEffect(() => {
    currentValueRef.current = value
  }, [value])
  const currentValue = currentValueRef.current as ValueObj<V, Options>['value']

  // 对外暴露的更新函数可以接受更新函数
  const onInnerChange: OnChange<V, void, Omit<Options, 'updater'>> = useMemoizedFn((arg: any) => {
    const newValue = typeof arg === 'function' ? arg(currentValue) : arg
    setChangedValue(newValue)
    onChange?.(newValue)
  })

  return [currentValue, onInnerChange] as const
}
