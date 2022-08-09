import React, {useEffect, useState} from "react";
import {Link, LinkProps, useMatch, useResolvedPath} from "react-router-dom";
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
                {children}
            </Link>
        </div>
    );
}

export function NavigationComponent() {
    const { t } = useTranslation();

    return (
        <header className="d-flex flex-wrap justify-content-sm-evenly justify-content-md-between flex-sm-row flex-column align-items-center py-3">
            <a href="/" className="text-dark text-decoration-none logo-margin">
                <h1>Aequus</h1>
            </a>
            <h3 className="text-center mb-0">
                {t('SLOGAN')}
                <p className="mb-0" style={{fontSize: ".475em"}}>{t('EXIBITION_DATES')}</p>
            </h3>
            <div className="d-flex flex-wrap justify-content-sm-evenly justify-content-between mt-sm-1 mt-3">
                <span className="px-3"><NavLink to={"/"}>{t('MENU_GALLERY')}</NavLink></span>
                <span className="px-3"><NavLink to={"/methodology"}>{t('MENU_METHODOLOGY')}</NavLink></span>
                <span className="px-3"><NavLink to={"/abstract"}>{t('MENU_ABSTRACT')}</NavLink></span>
                <LangSelector />
            </div>
        </header>
    );
}

const LangSelector = () => {
    const { i18n } = useTranslation();
    const [selectedLang, setSelectedLang] = useState('it');

    const changeLanguage = (language: string) => {
        setSelectedLang(language);
        i18n.changeLanguage(language);
    }

    return (
        <span className="px-3">
            &#123;&nbsp;
             <span className={(selectedLang === 'it') ? "menu-link-active" : ""} onClick={() => changeLanguage('it')}>it</span>&nbsp; - &nbsp;
             <span className={(selectedLang === 'en') ? "menu-link-active" : ""} onClick={() => changeLanguage('en')}>en</span>
            &nbsp;&#125;
        </span>
    )
}