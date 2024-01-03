'use server'

import { File } from "buffer"

export default async function upload(formData: FormData) {
    const [encodedFileName, file] = [...formData.entries()][0]
    const fileName = decodeURIComponent(encodedFileName)
    if (file instanceof File) {
        return fileName
    }
    throw new Error('数据类型错误')
}