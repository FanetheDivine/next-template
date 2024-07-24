declare module 'value-controller' {
  export type ValueControllerOptions = {
    /** 此项为true时value非可选 更新函数的参数非可选 */
    strictValue?: boolean
    /** 此项为true时onChange非可选 */
    strictOnChange?: boolean
    /** 此项为false时onChange的参数可选 */
    strictOnChangeArg?: boolean
    /** 此项为true时onChange接受更新函数 */
    updater?: boolean
  }

  /**
   * 非函数类型的值`value`与其控制器`onChange`\
   * 可以在第二个类型参数处进行配置\
   * 默认情况下 value/onChange均可选 onChange的参数非可选 onChange不接受更新函数
   */
  export type ValueController<V = any, Options extends ValueControllerOptions = object, R = void> =
    isFunction<V> extends true ? never : ValueObj<V, Options> & OnChangeObj<V, R, Options>

  export type ValueObj<
    V,
    Options extends ValueControllerOptions,
  > = Options['strictValue'] extends true ? { value: V } : { value?: V }

  export type OnChangeObj<
    V,
    R,
    Options extends ValueControllerOptions,
  > = Options['strictOnChange'] extends true
    ? { onChange: OnChange<V, R, Options> }
    : { onChange?: OnChange<V, R, Options> }

  export type OnChange<
    V,
    R,
    Options extends ValueControllerOptions,
  > = Options['strictOnChangeArg'] extends false
    ? (arg?: OnChangeArg<V, Options>) => R
    : (arg: OnChangeArg<V, Options>) => R

  export type OnChangeArg<
    V,
    Options extends ValueControllerOptions,
  > = Options['updater'] extends true ? V | Updater<V, Options> : V

  export type Updater<
    V,
    Options extends ValueControllerOptions,
  > = Options['strictValue'] extends true ? (prev: V) => V : (prev?: V) => V
}
