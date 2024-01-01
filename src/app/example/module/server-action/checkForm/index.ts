'use server'
import { FormField } from "./form"

export default async function checkEmail(values: FormField) {
    const checkedValues = FormField.parse(values)
    return checkedValues
}