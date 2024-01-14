import { Button, Card, Layout } from "antd";
import { Login } from "./module/components/Login";
import { fullBox, positionCenter } from "@/styles";
import { getCsrfToken } from "next-auth/react";

export default async function Page() {
    const token = await getCsrfToken()
    return (
        <Layout className={fullBox}>
            <Card className={[positionCenter, 'w-1/3'].join(' ')}>
                <Login token={token}></Login>
            </Card>
        </Layout>
    )
}