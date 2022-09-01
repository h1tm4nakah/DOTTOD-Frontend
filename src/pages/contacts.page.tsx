import {useTranslation} from "react-i18next";
import image from "../assets/images/gen8.jpg";
import React, {useEffect} from "react";
import {ZoomableImage} from "../components/ZoomableImage.component";

export function ContactsPage() {
    useEffect(() => {
        document.title = "DOTTOD gallery - contacts";
    }, [])
    const { t } = useTranslation();

    return (
        <div className="container" style={{backgroundColor: "white"}}>
            <div className="row mt-5">
                <div className="col-12 col-md-4">
                    <div className="piece-image">
                        <ZoomableImage alt="an old typewriter on a fur pink rug" src={image} />
                    </div>
                    <p className="piece-description">
                        <small><b>prompt:</b> charles and ray eames speclating about the future of design in their living room in front of a fireplace in 1950</small>
                    </p>
                </div>
                <div className="col-12 col-md-8 mt-3 mt-md-0">
                    <h3><b>{t('HEADER_CONTACTS')}</b></h3>
                    <p className="mb-1"><b>Email</b> - <a className="text-decoration-none" href="mailto:info@dottod.net" target="_blank" rel="noreferrer">info@dottod.net</a></p>
                    <p className="mb-1"><b>Twitter</b> - <a className="text-decoration-none" href="https://twitter.com/DOTTOD_gallery" target="_blank" rel="noreferrer">@DOTTOD_gallery</a></p>
                    <h3 className="mt-3"><b>{t('HEADER_ROLES')}</b></h3>
                    <p className="mb-1">
                        <b>Concept and implementation:</b><br/>
                        Pietro -&nbsp;
                        <a className="text-decoration-none" href="https://www.linkedin.com/in/prustici/" target="_blank" rel="noreferrer">linkedin</a> -&nbsp;
                        <a className="text-decoration-none" href="https://www.instagram.com/piehtm/" target="_blank" rel="noreferrer">instagram</a> -&nbsp;
                        <a className="text-decoration-none disabled" href="https://github.com/h1tm4nakah" target="_blank" rel="noreferrer">github</a>
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
                        <a className="text-decoration-none disabled" href="https://www.linkedin.com/in/christian-m-ernst/" target="_blank" rel="noreferrer">linkedin</a> -&nbsp;
                        <a className="text-decoration-none disabled" href="https://github.com/chris-ernst" target="_blank" rel="noreferrer">github</a>
                    </p>
                </div>
            </div>
        </div>
    )
}