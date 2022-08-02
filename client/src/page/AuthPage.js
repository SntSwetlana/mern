import React, {useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {Authcontext} from "../context/Authcontext";

export const AuthPage = () => {
    const auth = useContext(Authcontext)
    const message = useMessage()
    const {loading, request,error,clearError} = useHttp()
    const [form, setForm] = useState({email:'', password:''})

    useEffect(()=>{
        message(error)
        clearError()
    }, [error,message, clearError])

    useEffect(()=> {
        window.M.updateTextFields()
    }, [])

    const changeHandler = event => {
        console.log('registration')
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        try{
            const data = await request('/api/auth/register', 'POST', {...form})
            message(data.message)
        } catch (e) {}
    }

    const loginHandler = async () => {
        try{
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId)
        } catch (e) {}
    }

    return(
        <div className='row'>
            <div className="col s6 offset-s3">
                <div className="card orange darken-3">
                    <div className="card-content white-text">
                        <span className="card-title">Authorization</span>
                        <div>

                            <div className="input-field">
                                <input
                                    placeholder="Enter e-mail"
                                    id="email"
                                    type="text"
                                    name="email"
                                    value={form.email}
                                    onChange={changeHandler}
                                />
                                    <label htmlFor="email">E-mail</label>
                            </div>

                            <div className="input-field">
                                <input
                                    placeholder="Enter password"
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={form.password}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className='btn blue darken-3'
                            style={{marginRight: 10}}
                            disabled={loading}
                            onClick={loginHandler}
                        >
                            login
                        </button>
                        <button
                            className='btn grey lighten-1 black-text'
                            onClick={registerHandler}
                            disabled={loading}
                        >
                            Registration
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
