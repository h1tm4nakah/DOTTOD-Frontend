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
import {useTranslation} from "react-i18next";
import {InfoOverlay} from "./components/infoOverlay.component";
import {ContactsPage} from "./pages/contacts.page";
import {MobileUI} from "./components/mobileUI.component";

function App() {
    const { t } = useTranslation();

    useEffect(() => {
        document.title = "DOEST gallery"
    }, []);

  return (
    <>
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
                    <Route path="/contacts" element={<ContactsPage />} />
                </Routes>
            </BrowserRouter>
        </div>
        <Marquee slow={true} text={t('ABSTRACT_TEXT_2')}></Marquee>
    </>
);
}

export default App;
