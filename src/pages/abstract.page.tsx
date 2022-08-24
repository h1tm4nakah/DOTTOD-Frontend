import {useTranslation} from "react-i18next";
import image from "../assets/images/gen6.png";
import {Helmet} from "react-helmet";
import React from "react";

export function AbstractPage() {
    const { t } = useTranslation();
    return (
        <div className="container" style={{backgroundColor: "white"}}>
            <Helmet>
                <title>{ "DOEST gallery - abstract" }</title>
            </Helmet>
            <div className="row mt-5">
                <div className="col-12 col-md-4">
                    <div className="piece-image">
                        <img src={image} className="img-fluid" />
                    </div>
                </div>
                <div className="col-12 col-md-8 mt-3 mt-md-0">
                    <h3><b>{t('HEADER_ABSTRACT')}</b></h3>
                    <p className="text-justify">{t('ABSTRACT_TEXT_1')}</p>
                    <p className="text-justify">{t('ABSTRACT_TEXT_2')}</p>
                    <p className="text-justify">{t('ABSTRACT_TEXT_3')}</p>
                    <p className="text-justify"><small><b>{t('ABSTRACT_TEXT_EXPL')}</b></small></p>
                </div>
            </div>
        </div>
    )
}