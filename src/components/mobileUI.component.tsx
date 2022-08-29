import * as React from 'react';
import {useTranslation} from "react-i18next";

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
        <div className="mobile-ui">
            <div className="d-flex justify-content-between align-items-center h-100">
                <div className="px-4 py-3" style={{borderRight: "2px solid black"}}>
                    <b onClick={() => handleIDXChange(-1)}>←</b>
                </div>
                <div className="">
                    <b onClick={() => setFlip(!flip)}>
                        { flip ? t('UI_MENU_HIDE') : t('UI_MENU_SHOW') }
                    </b>
                </div>
                <div className="px-4 py-3" style={{borderLeft: "2px solid black"}}>
                    <b onClick={() => handleIDXChange(1)}>→</b>
                </div>
            </div>
        </div>
    );
}