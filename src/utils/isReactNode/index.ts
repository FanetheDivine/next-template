import { isValidElement, ReactNode } from 'react'
import { match, P } from 'ts-pattern'

/** 判断一个值是不是ReactNode */
export function isReactNode(arg: any): arg is ReactNode {
  // ReactNode是string number boolean null undefined以及几个指定对象类型的联合
  // 基本数据类型使用typeof判断 对象类型通过isValidElement判断
  return (
    arg === null ||
    match(typeof arg)
      .with(P.union('string', 'number', 'boolean', 'undefined'), () => true)
      .otherwise(() => false) ||
    isValidElement(arg)
  )
}
