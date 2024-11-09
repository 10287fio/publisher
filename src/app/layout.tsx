'use client';

import {Provider} from "react-redux";
import {store} from "@/store";
import "@/app/global.css";
import Layout from "@/composition/layout/Layout";

export default function RootLayout({
                                       children
                                   }: {
    children: React.ReactNode
}) {

    return (
        <html>
        <body>
        <Provider store={store}>
            <Layout>{children}</Layout>
        </Provider>
        </body>
        </html>
    )
};