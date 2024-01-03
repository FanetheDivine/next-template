'use server'
import { LoginField } from "./loginField"

export default async function checkEmail(values: LoginField) {
    const checkedValues = LoginField.parse(values)
    return checkedValues
}