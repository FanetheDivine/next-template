export {}

declare global {
  type Style = {
    className?: string
    style?: React.CSSProperties
  }
  /**
   * 值`value`与其控制器`onChange`\
   * 第三个参数`Strict`用于控制`onChange`的参数是否可选
   */
  type ValueController<V = any, NV = V, Strict extends boolean = false> = {
    value?: V
    onChange?: Strict extends false ? (newVal?: NV) => void : (newVal: NV) => void
  }
}
