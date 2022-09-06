import React, {useEffect, useState} from "react";
import {Link, LinkProps, useMatch, useResolvedPath, useSearchParams} from "react-router-dom";
import { useTranslation } from 'react-i18next';

function NavLink({ children, to, ...props }: LinkProps) {
    let resolved = useResolvedPath(to);
    let match = useMatch({ path: resolved.pathname, end: true });

    return (
        <div>
            <Link className={"menu-link" + (!match ? "" : " menu-link-active")}
                  to={to}
                  {...props}
            >
                { (!match ? "" : "{ ") }
                {children}
                { (!match ? "" : " }") }
            </Link>
        </div>
    );
}

export function NavigationComponent() {
    const { t } = useTranslation();
    const [DFlip, setDFlip] = useState(true);

    return (
        <header className="d-flex flex-wrap justify-content-sm-evenly justify-content-md-between flex-sm-row flex-column align-items-center py-3">
            <a href="/" className="text-dark text-decoration-none logo-margin">
                <div
                    className="d-flex justify-content-center"
                    onMouseEnter={() => setDFlip(false)}
                    onMouseLeave={() => setDFlip(true)}
                >
                    <h1 style={{display: "block"}}>DOT</h1>
                    <h1 style={{display: "block"}} className={(DFlip ? "text-h-flip" : "")}>DOT</h1>
                </div>
            </a>
            <h3 className="text-center mb-0">
                {t('SLOGAN')}
                <p className="mb-0" style={{fontSize: ".475em"}}>{t('EXIBITION_DATES')}</p>
            </h3>
            <div className="d-flex flex-wrap justify-content-sm-evenly justify-content-between mt-sm-1 mt-3">
                <span className="px-3 mb-3"><NavLink to={"/"}>{t('MENU_GALLERY')}</NavLink></span>
                <span className="px-3 mb-3"><NavLink to={"/abstract"}>{t('MENU_ABSTRACT')}</NavLink></span>
                <span className="px-3 mb-3"><NavLink to={"/methodology"}>{t('MENU_METHODOLOGY')}</NavLink></span>
                <span className="px-3 mb-3"><NavLink to={"/contacts"}>{t('MENU_CONTACTS')}</NavLink></span>
                <LangSelector />
            </div>
        </header>
    );
}

export const LangSelector = () => {
    const { i18n } = useTranslation();
    const [selectedLang, setSelectedLang] = useState(i18n.language);

    const changeLanguage = (language: string) => {
        setSelectedLang(language);
        i18n.changeLanguage(language);
    }

    return (
        <span className="mb-3">
            <span className="ps-3 pe-0">
                 <a className={"menu-link" + (selectedLang === 'it' ? " menu-link-active" : "")} onClick={() => changeLanguage('it')}>
                     { (selectedLang === 'it' ? "{ " : "") }it{ (selectedLang === 'it' ? " }" : "") }
                 </a>
            </span>
            <span> &nbsp; | &nbsp; </span>
            <span className="ps-0 pe-3">
                 <a className={"menu-link" + (selectedLang === 'en' ? " menu-link-active" : "")} onClick={() => changeLanguage('en')}>
                     { (selectedLang === 'en' ? "{ " : "") }en{ (selectedLang === 'en' ? " }" : "") }
                 </a>
            </span>
        </span>
    )
}