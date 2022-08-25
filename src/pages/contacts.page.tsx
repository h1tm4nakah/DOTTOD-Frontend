import {useTranslation} from "react-i18next";
import image from "../assets/images/gen8.png";
import React, {useEffect} from "react";
import {ZoomableImage} from "../components/ZoomableImage.component";

export function ContactsPage() {
    useEffect(() => {
        document.title = "DOEST gallery - contacts";
    }, [])
    const { t } = useTranslation();

    return (
        <div className="container" style={{backgroundColor: "white"}}>
            <div className="row mt-5">
                <div className="col-12 col-md-4">
                    <div className="piece-image">
                        <ZoomableImage alt="an old typewriter on a fur pink rug" src={image} />
                    </div>
                    <small><b>prompt:</b> an old typewriter on a fur pink rug</small>
                </div>
                <div className="col-12 col-md-8 mt-3 mt-md-0">
                    <h3><b>{t('HEADER_CONTACTS')}</b></h3>
                    <p className="mb-1"><b>Email</b> - <a className="text-decoration-none" href="mailto:info@doest-work.com" target="_blank" rel="noreferrer">info@doest-work.com</a></p>
                    <p className="mb-1"><b>Twitter</b> - <a className="text-decoration-none" href="https://twitter.com/DOEST_gallery" target="_blank" rel="noreferrer">@DOEST_gallery</a></p>
                    <h3 className="mt-3"><b>{t('HEADER_ROLES')}</b></h3>
                    <p className="mb-1">
                        <b>Concept and implementation:</b><br/>
                        Pietro -&nbsp;
                        <a className="text-decoration-none" href="https://www.linkedin.com/in/prustici/" target="_blank" rel="noreferrer">linkedin</a> -&nbsp;
                        <a className="text-decoration-none" href="https://www.instagram.com/piehtm/" target="_blank" rel="noreferrer">instagram</a>
                    </p>
                    <p className="mb-1">
                        <b>UX/UI Design:</b><br/>
                        Jana -&nbsp;
                        <a className="text-decoration-none" href="https://www.linkedin.com/in/jana-tothill-calvo-88a830217" target="_blank" rel="noreferrer">linkedin</a> -&nbsp;
                        <a className="text-decoration-none" href="https://www.instagram.com/janatcalvo/" target="_blank" rel="noreferrer">instagram</a>
                    </p>
                    <p className="mb-1">
                        <b>Creative strategist:</b><br/>
                        Luca -&nbsp;
                        <a className="text-decoration-none" href="https://www.linkedin.com/in/luca-giacolini/" target="_blank" rel="noreferrer">linkedin</a> -&nbsp;
                        <a className="text-decoration-none" href="https://www.instagram.com/luca_giacoli/" target="_blank" rel="noreferrer">instagram</a>
                    </p>
                    <p className="mb-1">
                        <b>Knowledge and access to AI tools:</b><br/>
                        Chris -&nbsp;
                        <a className="text-decoration-none disabled" href="#" target="_blank" rel="noreferrer">linkedin</a> -&nbsp;
                        <a className="text-decoration-none disabled" href="#" target="_blank" rel="noreferrer">instagram</a>
                    </p>
                </div>
            </div>
        </div>
    )
}