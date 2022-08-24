import 'react-app-polyfill/ie11';
import * as React from 'react';
import {useEffect, useRef, useState} from "react";

// @ts-ignore
export function ZoomableImage({src, alt}: {src: string, alt?: string}) {
    const ref = useRef<HTMLImageElement>(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    return (
        <>
            <img className="img-fluid" alt={alt} src={src} onClick={() => setOpen(true)} style={{cursor: "pointer"}}/>
            { open && (
                <div className="container-fluid position-absolute start-0 top-0 p-5" style={{zIndex: "99999", backgroundColor: "rgb(255 255 255 / 90%)", height: "100%"}}  >
                    <button type="button" className="btn-close position-absolute end-0 top-0 m-4" aria-label="Close" onClick={() => setOpen(false)}></button>
                    <div className="container text-center">
                        <img className="img-fluid" alt={alt} style={{maxHeight: "90vh"}} src={src} ref={ref}/>
                    </div>
                </div>
                )
            }
        </>
    )
}