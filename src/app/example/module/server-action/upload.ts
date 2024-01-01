'use server'

import { writeFileSync } from "fs"
import { File } from "buffer"

export default async function upload(formData: FormData) {
    const [fileName, file] = [...formData.entries()][0]
    if (file instanceof File) {
        writeFileSync(`E:/${decodeURI(fileName)}`, new Uint8Array(await file.arrayBuffer()))
        return 'success'
    }
    throw new Error('数据类型错误')
}
