'use client';

import {useEffect} from "react";

export default function Manuscript(): JSX.Element {

    useEffect(() => {
        console.log("test");
    }, []);

    // canvas.getContext("2d")
    // if(canvas.getContext()){
    //
    // }

    const manuscript = <div>
        <canvas id="canvas" width="200" height="200"></canvas>
    </div>;

    return manuscript;
};