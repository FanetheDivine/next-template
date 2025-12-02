/**
 * 将 PageProps 的 searchParams 转换为 URLSearchParams
 * @param searchParams - Next.js PageProps 的 searchParams 对象，类型为 Record<string, string | string[] | undefined>
 * @returns URLSearchParams 实例
 *
 * @example
 * ```ts
 * const Page: FC<PageProps<'/example'>> = async (props) => {
 *   const searchParams = toURLSearchParams(await props.searchParams)
 *   const query = searchParams.get('query')
 *   // ...
 * }
 * ```
 */
export function toURLSearchParams(
  searchParams: Record<string, string | string[] | undefined>,
): URLSearchParams {
  const urlSearchParams = new URLSearchParams()
  Object.entries(searchParams).forEach(([key, value]) => {
    if (value === undefined) {
      return
    }

    if (Array.isArray(value)) {
      value.forEach((v) => urlSearchParams.append(key, v))
    } else {
      urlSearchParams.append(key, value)
    }
  })

  return urlSearchParams
}
