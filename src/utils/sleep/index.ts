/**
 * 等待一段时间
 * @param ms 毫秒
 */
export const sleep = (ms: number) => {
  return new Promise((res) => setTimeout(res, ms))
}
