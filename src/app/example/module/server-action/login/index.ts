'use server'
import { LoginField } from "./loginField"

export default async function login(values: LoginField) {
    const checkedValues = LoginField.parse(values)
    return checkedValues
}