import { positionCenter } from "@/styles";
import classNames from "classnames";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: '404',
}

export default function NotFound(){
    return <span className={classNames(positionCenter,'relative text-5xl')}>404</span>
}