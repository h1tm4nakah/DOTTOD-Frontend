import {useTranslation} from "react-i18next";
import image from "../assets/images/gen6.jpg";
import React, {useEffect} from "react";
import {ZoomableImage} from "../components/ZoomableImage.component";

export function AbstractPage() {
    useEffect(() => {
        document.title = "DOTTOD gallery - abstract";
    }, [])

    const { t } = useTranslation();
    return (
        <div className="container" style={{backgroundColor: "white"}}>
            <div className="row mt-5">
                <div className="col-12 col-md-4">
                    <div className="piece-image">
                        <ZoomableImage alt="high quality photo of a computer projecting an image on space" src={image} />
                    </div>
                    <p className="piece-description"><small><b>prompt:</b> a watercolour painting of an apartment on uranus looking onto earth's problems</small></p>
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