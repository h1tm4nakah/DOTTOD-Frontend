import * as React from 'react';
import {useEffect, useRef, useState} from "react";
import image from "../assets/images/gen6.jpg";
import {useTranslation} from "react-i18next";
import {LangSelector} from "./navigation.component";

// @ts-ignore
export function InfoOverlay() {
    const [show, setShow] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const { t } = useTranslation();

    useEffect(() => {
        if (localStorage.getItem("first_visit_consent") === null) {
            setShow(true);
        }
        const handleClickOutside = (event: any) => {
            if (ref.current && !ref.current.contains(event.target)) {
                dismissModal();
            }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [])

    function dismissModal() {
        localStorage.setItem("first_visit_consent", "true");
        setShow(false);
    }

    return (
        <div className={"modal fade" + (show ? "show d-block" : " d-none") } style={{backgroundColor: "rgba(255,255,255,0.9)"}}>
            <div className="modal-dialog modal-dialog-centered modal-fullscreen">
                <div className="modal-content" style={{backgroundColor: "transparent"}}>
                    <div ref={ref} className="container my-auto p-5 position-relative" style={{backgroundColor: "white"}}>
                        <div className="position-absolute end-0 top-0 mt-2 me-2">
                            <LangSelector />
                        </div>
                        <div className="row">
                            <div className="col-12 col-md-8 text-center text-md-start">
                                <h3>{t('WELCOME')}</h3>
                                <button className="btn btn-sm btn-dark d-sm-none mb-3 mt-2" onClick={dismissModal}>{t('BTN_ENTER')}</button>
                            </div>
                            <div className="col-12 col-lg-8 mb-3 mb-lg-0">
                                <p className="text-justify">{t('ABSTRACT_TEXT_2')}</p>
                                <p className="text-justify d-none d-md-block">{t('ABSTRACT_TEXT_3')}</p>
                                <p className="text-justify"><small><b>{t('ABSTRACT_TEXT_EXPL')}</b></small></p>
                                <div className="text-center text-md-start mb-5">
                                    <button className="btn btn-sm btn-dark" onClick={dismissModal}>{t('BTN_ENTER')}</button>
                                </div>
                            </div>
                            <div className="col-12 col-lg-4 d-none d-md-block">
                                <div className="piece-image">
                                    <img src={image} className="img-fluid" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}