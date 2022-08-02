import React, {useCallback, useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {Authcontext} from "../context/Authcontext";
import {Loader} from "../components/Loader";
import {QuizletList} from "../components/QuizletList";

export const QuizletPage = () => {
    const [quizlets, setQuizlets] = useState([])
    const {loading, request} = useHttp()
    const {token} = useContext(Authcontext)

    const fetchQuizlets = useCallback(async () => {
        try{
            const fetched = await request('/api/card', 'GET',null, {
                Authorization: `Bearer ${token}`
            })
            setQuizlets(fetched)
        }
        catch (e) {
            console.log(e)
        }
    }, [token, request]   )

    useEffect(() => {
        fetchQuizlets()
    }, [fetchQuizlets])

    if(loading){
        return <Loader />
    }
    return(
        <>
            {    console.log('quizlet here!!!')}
            <QuizletList quizlets = {quizlets}/>
        </>
    )
}
