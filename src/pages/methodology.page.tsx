import React, {useContext, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import image from "../assets/images/gen9.png"
import {Helmet} from "react-helmet";

export function MethodologyPage() {
    const { t } = useTranslation();
    return (
        <div className="container">
            <Helmet>
                <title>{ "DOEST gallery - methodology" }</title>
            </Helmet>
            <div className="row mt-5">
                <div className="col-12 col-md-4">
                    <div className="piece-image">
                        <img src={image} className="img-fluid" />
                    </div>
                    <small><b>prompt:</b> a room full of neons with a scientist sitting in the middle</small>
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