import React from "react";


export function Marquee({text, inverted, slow}: {text: string, inverted?: boolean, slow?:boolean}) {
    return (
        <p className={"d-none d-sm-block marquee" + (inverted ? " marquee-inverted" : "") + (slow ? " marquee-slow" : "")}>
            <span>{text} </span>
            <span>{text} </span>
            <span>{text} </span>
        </p>
    )
}