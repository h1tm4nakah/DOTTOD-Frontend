import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../services/auth.context";
import {LoginPage} from "./login.page";
import {GenerateTwitterPage} from "../components/admin/generatetweets.component";
import "react-datepicker/dist/react-datepicker.css";
import {TranslateTwitterPage} from "../components/admin/translatetweets.component";
import {GenerateImagesPage} from "../components/admin/generateimages.component";
import {useNavigate} from "react-router-dom";
import {DashboardAdminPage} from "../components/admin/dashboard.component";

export function AdminPage() {
    // @ts-ignore
    const { state } = useContext(AuthContext);

    useEffect(() => {
    }, [state]);

    if (state.token === "") { return <LoginPage/> }
    else { return <InnerAdminPage/> }
}

function InnerAdminPage() {
    // @ts-ignore
    const { logout, isTokenValid } = useContext(AuthContext);
    const [tab, setTab] = useState("dashboard");
    const navigate = useNavigate();

    useEffect(() => {
        if(!isTokenValid()) {
            navigate('/admin');
        }
    }, [tab]);

    const onLogout = (e: any) => {
        e.preventDefault();
        logout();
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <ul className="nav nav-pills justify-content-center pb-3 border-bottom">
                        <li className="nav-item">
                            <a className={"nav-link" + (tab === "dashboard" ? " active" : "")} href="#" onClick={() => setTab("dashboard")}>dashboard</a>
                        </li>
                        <li className="nav-item">
                            <a className={"nav-link" + (tab === "fetch" ? " active" : "")} href="#" onClick={() => setTab("fetch")}>fetch tweets</a>
                        </li>
                        <li className="nav-item">
                            <a className={"nav-link" + (tab === "translate" ? " active" : "")} href="#" onClick={() => setTab("translate")}>translate tweets</a>
                        </li>
                        <li className="nav-item">
                            <a className={"nav-link" + (tab === "generate" ? " active" : "")} href="#" onClick={() => setTab("generate")}>generate images</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" onClick={onLogout}>logout</a>
                        </li>
                    </ul>
                </div>
                <div className="col-12 mt-4">
                    { (tab === "dashboard") && <DashboardAdminPage /> }
                    { (tab === "fetch") && <GenerateTwitterPage /> }
                    { (tab === "translate") && <TranslateTwitterPage /> }
                    { (tab === "generate") && <GenerateImagesPage />}
                </div>
            </div>

        </div>
    )
}