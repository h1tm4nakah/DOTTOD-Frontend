import React, {useContext, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import image from "../assets/images/gen3.png"

export function MethodologyPage() {
    const { t } = useTranslation();
    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col-12 col-md-4">
                    <div className="piece-image">
                        <img src={image} className="img-fluid" />
                    </div>
                </div>
                <div className="col-12 col-md-8 mt-3 mt-md-0">
                    <h3>{t('HEADER_METHODOLOGY')}</h3>
                    <p className="text-justify">{t('METHODOLOGY_TEXT_1')}</p>
                    <p className="text-justify">{t('METHODOLOGY_TEXT_2')}</p>
                    <p className="text-justify">{t('METHODOLOGY_TEXT_3')}</p>
                </div>
            </div>
        </div>
    )
}