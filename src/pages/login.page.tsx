import React, {useContext} from "react";
import {AuthContext} from "../services/auth.context";
import {useSetState} from "react-use";

const initialState = {
    email: '',
    password: ''
}

export function LoginPage() {
    // @ts-ignore
    const {state: ContextState , login } = useContext(AuthContext);
    const {
        token,
        isLoginPending,
        loginError
    } = ContextState;
    const [state, setState] = useSetState(initialState);

    const onSubmit = (e: any) => {
        e.preventDefault();
        const { email, password } = state;
        login(email, password);
        setState({
            email: '',
            password: ''
        });
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12 col-md-4 offset-md-4" style={{marginTop: "15%"}}>
                    <div className="form-signin w-100 m-auto">
                        <form onSubmit={onSubmit}>
                            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
                            <div className="form-floating">
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    placeholder="name@example.com"
                                    onChange={e => setState({email: e.target.value})}
                                    value={state.email}
                                />
                                <label htmlFor="floatingInput">Email address</label>
                            </div>
                            <div className="form-floating">
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    placeholder="Password"
                                    onChange={e => setState({password: e.target.value})}
                                    value={state.password}
                                />
                                <label htmlFor="floatingPassword">Password</label>
                            </div>
                            <button className="w-100 btn btn-lg btn-dark" type="submit">
                                {
                                    isLoginPending ? (
                                        <><span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Loading ...</>
                                    ) : (
                                        <>Sign in</>
                                    )
                                }
                            </button>
                            { loginError && <p><small>{loginError}</small></p> }
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )

}