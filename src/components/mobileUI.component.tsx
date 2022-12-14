import * as React from 'react';
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";

interface MobileUIProps {
    flip: boolean,
    setFlip: (value: boolean) => void,
    focusIDX: number,
    handleIDXChange: (value: number) => void,
}
// @ts-ignore
export function MobileUI({flip, setFlip, focusIDX, handleIDXChange}: MobileUIProps) {
    const { t } = useTranslation();

    return (
        <div className="mobile-ui d-block d-md-none">
            <div className="d-flex justify-content-between align-items-center h-100">
                <div onClick={() => handleIDXChange(-1)} className="px-4 py-2" style={{borderRight: "2px solid black"}}>
                    <b>←</b>
                </div>
                <div className="">
                    <b onClick={() => setFlip(!flip)}>
                        { flip ? t('UI_MENU_HIDE') : t('UI_MENU_SHOW') }
                    </b>
                </div>
                <div onClick={() => handleIDXChange(1)} className="px-4 py-2" style={{borderLeft: "2px solid black"}}>
                    <b>→</b>
                </div>
            </div>
        </div>
    );
}