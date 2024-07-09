'use client';

import './global.css'
import Layout from "@/composition/layout/layout";
import {Provider} from "react-redux";
import {store} from "@/store";

export default function RootLayout({
                                       children
                                   }: {
    children: React.ReactNode
}) {

    return (
        <html lang="en">
        <body><Provider store={store}><Layout>{children}</Layout></Provider></body>
        </html>
    )
}
