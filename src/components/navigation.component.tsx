import React, {useEffect, useState} from "react";
import {Link, LinkProps, useMatch, useResolvedPath} from "react-router-dom";

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

    return (
        <header className="d-flex flex-wrap justify-content-center justify-content-sm-between flex-sm-row flex-column align-items-center py-3">
            <a href="/" className="text-dark text-decoration-none logo-margin">
                <h1>Aequus</h1>
            </a>
            <h3>galleria delle interpretazioni cibernetiche</h3>
            <ul className="nav nav-pills">
                <li className="nav-item mx-4"><NavLink to={"/"}>__home</NavLink></li>
                <li className="nav-item mx-4"><NavLink to={"/how"}>__how?</NavLink></li>
                <li className="nav-item mx-4"><NavLink to={"/why"}>__why?</NavLink></li>
            </ul>
        </header>
    );
}