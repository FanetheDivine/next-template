'use client'

import { useEffect, useRef, useState } from 'react'
import { Socket,io } from 'socket.io-client'
import { isDeepStrictEqual } from 'util'

/** 套接字监听或触发的事件 */
export type EventsMap = {
    [key in string]:(...args:any)=>void
}
type Props = Parameters<typeof io>

/**
 * 根据指定参数取得一个webSocket套接字
 * 使用socket.io-client
 * @returns socket对象
 */
export default function useSocket<T extends EventsMap = {}>(...args: Props) {
    const [socket, setSocket] = useState<Socket<T>>()
    const prevProps = useRef<Props>()
    useEffect(() => {
        const isPropsDeepEqual = isDeepStrictEqual(prevProps.current, args)
        prevProps.current = args
        if (isPropsDeepEqual) {
            return
        } else {
            const newSocket = io(...args)
            setSocket(newSocket)
            return () => {
                newSocket.close()
            }
        }
    }, [args])
    return socket
}