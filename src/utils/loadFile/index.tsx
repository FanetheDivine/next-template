let inputInstance: HTMLInputElement
let lastRejectFn: ((reason?: any) => void) | undefined

type Config = Partial<Pick<HTMLInputElement, 'accept' | 'multiple' | 'webkitdirectory'>>

/**
 * 函数式加载本地文件
 * @returns 获取上传的文件\
 * 注意，若取消上传，这个promise会下一次上传前进入rejected，而不是立刻变化
 */
export function loadFile(config: Config = {}) {
  if (!inputInstance) {
    inputInstance = document.createElement('input')
    inputInstance.type = 'file'
  }
  const { accept = '', multiple = false, webkitdirectory = false } = config
  inputInstance.value = '' // 清空上一次的选择 允许选择相同文件
  inputInstance.accept = accept
  inputInstance.multiple = multiple
  inputInstance.webkitdirectory = webkitdirectory
  const { promise, resolve, reject } = Promise.withResolvers<File[]>()
  lastRejectFn?.(new Error('上传已取消'))
  lastRejectFn = reject
  inputInstance.onchange = () => {
    const fileList = inputInstance.files
    if (!fileList || fileList.length === 0) {
      // 清空旧值后 取消选择一般不会触发onchange
      // 此处仅作兜底
      reject(new Error('没有上传有效文件'))
    } else {
      resolve(Array.from(fileList))
      lastRejectFn = undefined
    }
  }
  inputInstance.click()
  return promise
}

/** 描述一个文件夹内所有的文件和子文件夹 */
export type Directory = Map<string, File | Directory>

/** 上传文件夹时  */
export const convertFileListToDirectory = (
  fileList: Iterable<File> | ArrayLike<File>,
): Directory => {
  const directory: Directory = new Map()
  Array.from(fileList).forEach((file) => {
    const paths = file.webkitRelativePath.split('/').slice(0, -1)
    const insertFile = (currentDir: Directory, paths: string[]) => {
      if (paths.length === 0) {
        currentDir.set(file.name, file)
        return
      }
      const currentPath = paths[0]
      if (!currentDir.get(currentPath)) currentDir.set(currentPath, new Map())
      // 文件名和文件夹名不能相同 直接指定类型
      insertFile(currentDir.get(currentPath) as Directory, paths.slice(1))
    }
    insertFile(directory, paths)
  })
  return directory
}
