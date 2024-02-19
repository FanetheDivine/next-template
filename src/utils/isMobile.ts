import { headers } from 'next/headers'

const mobileDevices = ['android', 'webos', 'iphone', 'ipad', 'ipod', 'blackberry', 'iemobile', 'opera mini']

/**
 * 判断当前设备是否是移动设备
 * 仅在服务端组件中使用
 */
export function isMobile() {
    const ua = headers().get('user-agent')?.toLocaleLowerCase()
    return Boolean(ua && mobileDevices.some(item => ua.includes(item)))
}