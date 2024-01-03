'use server'

import { File } from "buffer"

export default async function upload(formData: FormData) {
    const [fileName, file] = [...formData.entries()][0]
    if (file instanceof File) {
        return fileName
    }
    throw new Error('数据类型错误')
}
