import { NextResponse } from "next/server"
import pic from '../module/images/example.png'

export async function GET() {
    return new NextResponse(await fetch(`http://127.0.0.1:3000/${pic.src}`).then(res=>res.blob()));
};