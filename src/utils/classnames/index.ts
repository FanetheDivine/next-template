import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** tailwind-merge & clsx合并class */
export function classnames(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs))
}
