'use client'

type Props = {
    multiple?: boolean
    accept?: string
    capture?: string
}

/** 从指定源加载一个或多个指定类型的文件的句柄 */
export default async function loadFile(props: Props) {
    const loader = document.createElement('input')
    loader.type = 'file'
    if(props.multiple){
        loader.multiple = props.multiple
    }
    if(props.accept){
        loader.accept = props.accept
    }
    if(props.capture){
        loader.capture = props.capture
    }
    return new Promise<FileList | null>((resolve, reject) => {
        loader.addEventListener('change', () => {
            resolve(loader.files)
        })
        loader.addEventListener('error', (event) => {
            reject(event.error)
        })
        loader.click()
    })
}