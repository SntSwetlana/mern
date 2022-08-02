import React, {useCallback, useContext, useEffect, useState} from "react";
//import styled, {ThemeProvider} from 'styled-components'
import {useHttp} from "../hooks/http.hook";
import {Authcontext} from "../context/Authcontext";
import {Loader} from "../components/Loader";
import FlashcardsList from "../components/FlashCardsList";
import MatchingGame from "../components/MatchingGame";

import './PlayCardGame.css'
import FlashCardPag from "../components/FlashCardPag";

export const PlayCardGame = () => {
    const [flashcards, setFlashcards] = useState([])
    const {loading, request} = useHttp()
    const {token} = useContext(Authcontext)


    const checkSeaHandler = (async () => {
        try{
            const fetched = await request('/api/card', 'GET',null, {
                Authorization: `Bearer ${token}`
            })
            setFlashcards(fetched)
        }
        catch (e) {
            console.log(e)
        }
    })

    if(loading){
        return <Loader />
    }

    return (
        <>
            <button
                className='btn1 blue lighten-1 black-text'
                onClick={checkSeaHandler}
            >Let's see cards</button>
            <div className='container'>
                <FlashcardsList flashcards = {flashcards}/>
            </div>
            <div className='container'>
                <MatchingGame flashcards = {flashcards.slice(0,6)}/>
            </div>
            <div className='container'>
                <FlashCardPag flashcards = {flashcards}/>
            </div>
            <div className='container'>
                <></>
            </div>
        </>
    );
}
