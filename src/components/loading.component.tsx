import 'react-app-polyfill/ie11';
import * as React from 'react';

// @ts-ignore
export function Loading() {
    return (
        <div style={{
            position: "absolute",
            right:"50%",
            top:"50%",
            width:"200px",
        }}>
            <h1>loading ...</h1>
        </div>
    );
}