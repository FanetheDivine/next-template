'use client'

import { useEffect } from "react"

export function Test(props: any) {
    useEffect(() => {
        console.log(props)
    })

    return 1
}