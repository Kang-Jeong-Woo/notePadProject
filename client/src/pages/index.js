import Head from 'next/head'
import Login from "@/components/Login/Login";
import MainPage from "@/components/Main/MainPage";
import Container from "@/components/UI/Container";

export default function Home() {
    return (
        <>
            <Head>
                <meta charSet="utf-8"/>
                <title>DuckZil Pad | Home</title>
                <link rel="icon" href="/favicon.ico"/>
                <link rel="apple-touch-icon" href="/apple-touch-icon.png"/>
                <meta name="description" content="마음껏 꾸밀 수 있는 나만의 다이어리"/>
                <meta name="keywords" content="다이어리 diary"/>
                <meta name="author" content="KangJeongWoo"/>
                <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0 minimum-scale=1.0"/>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
                <meta name="theme-color" content="#111111"/>
            </Head>
            <main>
                <Container>
                <MainPage></MainPage>
                </Container>
            </main>
        </>
)
}
