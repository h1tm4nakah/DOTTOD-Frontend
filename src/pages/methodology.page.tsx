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
                <div className="col-12 col-md-8">
                    <h3>{t('HEADER_METHODOLOGY')}</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
            </div>
        </div>
    )
}