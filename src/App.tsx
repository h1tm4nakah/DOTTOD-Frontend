import React, {useContext, useEffect} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import './App.css';
import {ExhibitionPage} from "./pages/exhibition.page";
import {NavigationComponent} from "./components/navigation.component";
import {Marquee} from "./components/marquee.component";
import {AdminPage} from "./pages/admin.page";
import {PiecePage} from "./pages/piece.page";
import {ParticipantPage} from "./pages/participant.page";
import {MethodologyPage} from "./pages/methodology.page";
import {AbstractPage} from "./pages/abstract.page";
import {Helmet} from "react-helmet";
import ogimg from '../src/assets/images/gen3.png'
import {useTranslation} from "react-i18next";
import {InfoOverlay} from "./components/infoOverlay.component";
import {CreditsPage} from "./pages/credits.page";

function App() {
    const { t } = useTranslation();

    useEffect(() => {
        document.title = "DOEST gallery"
    }, []);

  return (
    <>
        <Helmet>
            <meta charSet="utf-8" />

            <title>DOEST gallery</title>
            <meta name="title" content="DOEST gallery" />
            <meta name="description" content={"DOES " + t('SLOGAN')} />

            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://doest-work.com/" />
            <meta property="og:title" content="DOEST gallery" />
            <meta property="og:description" content={"DOES " + t('SLOGAN')} />
            <meta property="og:image" content={ogimg} />

            <meta property="twitter:card" content={ogimg} />
            <meta property="twitter:url" content="https://doest-work.com/" />
            <meta property="twitter:title" content="DOEST gallery" />
            <meta property="twitter:description" content={"DOES " + t('SLOGAN')} />
            <meta property="twitter:image" content={ogimg} />

            <meta name="google-site-verification" content="ZbNLEcFdJFKVhONaa9FNQDfzMBgsHUaFbHQ4tOkBjF0" />
        </Helmet>
        <div className="container-fluid min-vh-100">
            <InfoOverlay />
            <BrowserRouter>
                <NavigationComponent/>
                <Routes>
                    <Route path="/" element={<ExhibitionPage/>}/>
                    <Route path="/piece/:tweet_id" element={<PiecePage />} />
                    <Route path="/participant/:username" element={<ParticipantPage />} />
                    <Route path="/admin" element={<AdminPage/>} />
                    <Route path="/methodology" element={<MethodologyPage />} />
                    <Route path="/abstract" element={<AbstractPage />} />
                    <Route path="/contacts" element={<CreditsPage />} />
                </Routes>
            </BrowserRouter>
        </div>
        <Marquee slow={true} text={t('ABSTRACT_TEXT_2')}></Marquee>
    </>
);
}

export default App;
