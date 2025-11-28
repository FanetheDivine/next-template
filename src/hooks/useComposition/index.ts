'use client'

import { CompositionEventHandler, ChangeEventHandler, useState } from 'react'
import { useMemoizedFn } from 'ahooks'
import { ValueController, ValueControllerOptions } from 'value-controller'
import { useSemiControlledValue } from '../useSemiControlledValue'

export type CompositionProps<Options extends ValueControllerOptions = object> = {
  value: Options['strictValue'] extends true ? string : string | undefined
  onChange: ChangeEventHandler<HTMLInputElement>
  onCompositionStart: () => void
  onCompositionEnd: CompositionEventHandler<HTMLInputElement>
}

/**
 * 处理输入法合成问题
 * @returns 返回一个是否正在合成的state,以及由input使用的合成props
 * @example
 * ```tsx
 * // 基础用法：search是合成后的值
 * const [search, setSearch] = useState<string>()
 * const { compositionProps } = useComposition({ value: search, onChange: setSearch })
 * <Input {...compositionProps} />
 * ```
 * @example
 * ```tsx
 * // 带防抖：只需要将 onChange 包装为防抖函数即可
 * import { useDebounceFn } from 'ahooks'
 *
 * const [search, setSearch] = useState<string>()
 * const { run: debouncedSetSearch } = useDebounceFn(setSearch, { wait: 300 })
 * const { compositionProps } = useComposition({ value: search, onChange: debouncedSetSearch })
 * <Input {...compositionProps} />
 * ```
 */
export function useComposition<StrictValue extends boolean>(
  valueController: ValueController<string, { updater: false; strictValue: StrictValue }>,
) {
  const [isComposing, setComposing] = useState(false)
  const [value, onInnerChange] = useSemiControlledValue({
    value: valueController.value,
  })
  // 合成时更新本地value
  const onChange = useMemoizedFn<ChangeEventHandler<HTMLInputElement>>((e) => {
    onInnerChange(e.target.value)
    if (!isComposing) {
      valueController.onChange?.((e.target as HTMLInputElement).value)
    }
  })
  const onCompositionStart = useMemoizedFn(() => {
    setComposing(true)
  })
  // 输入法合成后更新外部value
  const onCompositionEnd = useMemoizedFn<CompositionEventHandler<HTMLInputElement>>((e) => {
    setComposing(false)
    valueController.onChange?.((e.target as HTMLInputElement).value)
  })
  const compositionProps: CompositionProps<{ strictValue: StrictValue }> = {
    value: value!,
    onChange,
    onCompositionStart,
    onCompositionEnd,
  }
  return {
    isComposing,
    compositionProps,
  }
}
