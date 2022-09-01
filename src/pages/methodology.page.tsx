import React, {useContext, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import image from "../assets/images/gen9.jpg"
import {ZoomableImage} from "../components/ZoomableImage.component";

export function MethodologyPage() {
    useEffect(() => {
        document.title = "DOTTOD gallery - methodology";
    }, [])
    const { t } = useTranslation();
    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col-12 col-md-4">
                    <div className="piece-image">
                        <ZoomableImage alt="a room full of neons with a scientist sitting in the middle" src={image} />
                    </div>
                    <p className="piece-description"><small><b>prompt:</b> a kandinsky style painting of a robot painting frida kahlo</small></p>
                </div>
                <div className="col-12 col-md-8 mt-3 mt-md-0">
                    <h3><b>{t('HEADER_METHODOLOGY')}</b></h3>
                    <p className="text-justify">{t('METHODOLOGY_TEXT_1')}</p>
                    <p className="text-justify">{t('METHODOLOGY_TEXT_2')}</p>
                    <p className="text-justify">{t('METHODOLOGY_TEXT_3')}</p>
                    <p className="text-justify"><small><b>{t('ABSTRACT_TEXT_EXPL')}</b></small></p>
                </div>
            </div>
        </div>
    )
}