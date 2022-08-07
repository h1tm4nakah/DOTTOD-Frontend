import React from 'react';
import { useSetState } from 'react-use';
import {fetchLogin, fetchLogout} from "./auth.service";
import jwtDecode from "jwt-decode";

export const AuthContext = React.createContext(null);

export interface initialStateModel {
    token: string,
    isLoginPending: boolean,
    loginError: null | string
}

const initialState: initialStateModel = {
    token: localStorage.getItem("token") || "",
    isLoginPending: false,
    loginError: null
}

export const ContextProvider = (props: any) => {
    const [state, setState] = useSetState(initialState);

    const setLoginPending = (isLoginPending: boolean) => setState({isLoginPending});
    const setToken = (token: string) => setState({token});
    const setLoginError = (loginError: null | string) => setState({loginError});

    const login = (email: string, password: string) => {
        setLoginPending(true);
        setToken("");
        setLoginError(null);

        fetchLogin(email, password).then((res: any) => {
            if (res.data.status === "success") {
                setToken(res.data.access_token);
                localStorage.setItem("token", res.data.access_token);
            } else {
                setLoginError("wrong email or password");
            }
        }).catch(err => {
            setLoginError("wrong email or password");
        }).finally(() => {
            setLoginPending(false);
        });
    }

    const logout = () => {
        setLoginPending(false);
        setToken("");
        setLoginError(null);
        fetchLogout();
    }

    const isTokenValid = () => {
        const token: string | null = localStorage.getItem("token");
        if (token) {
            const decoded: any = jwtDecode(token);
            if (decoded.exp < Date.now() / 1000) {
                localStorage.clear();
                return false;
            }
            return true;
        } else {
            return false;
        }
    }

    return (
        <AuthContext.Provider
            // @ts-ignore
            value={{
                state,
                login,
                logout,
                isTokenValid
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

