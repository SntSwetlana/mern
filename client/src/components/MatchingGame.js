
import React, {useEffect, useState} from "react";
import MatchFlashCard from "./MatchFlashCard";

export default function MatchingGame({flashcards}){
    const [cards, setCards] = useState([])
    const [turns, setTurns] = useState(0)

    const [choiceOne, setChoiceOne] = useState(null)
    const [choiceTwo, setChoiceTwo] = useState(null)

    const [disabled, setDisabled] = useState(false)

    const copy = JSON.parse(JSON.stringify(flashcards));
    copy.forEach(function (item){
        const temp=item.term
        item.term=item.definition
        item.definition=temp
    })

    //shuffle cards
    const shuffleCards = () => {
        const shuffledCards = [...flashcards, ...copy]
            .sort(() => Math.random() - .5)
            .map((card) => ({ ...card, id: Math.random() }))

        setChoiceOne(null)
        setChoiceTwo(null)

        setCards(shuffledCards)
        setTurns(0)
    }

    const handleChoice = (card) =>  {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    }

    //compare 2 selected cards

    useEffect(() => {
        if(choiceOne && choiceTwo){
            setDisabled(true)
            if(choiceOne._id === choiceTwo._id){
                setCards(preCards => {
                    return preCards.map(card => {
                        if(card._id === choiceOne._id){
                            {
                                console.log(`matched ${card.term}`)}
                            return {...card, matched: true}
                        } else{
                            return card
                        }
                    })
                })
                resetTurns()
            } else {
                setTimeout(() => resetTurns(), 500)

            }
        }
    },[choiceOne,choiceTwo])

    //reset choices & increment turns

    const resetTurns = () => {
        setChoiceOne(null)
        setChoiceTwo(null)
        setTurns(prevTurns => prevTurns + 1)
        setDisabled(false)
    }

    useEffect(()=>{
        shuffleCards()
    },[])

    return (
        <>
            <h3> Matching game</h3>
            {console.log('here')}
            <button className={'btn1'} onClick={shuffleCards}>New Game</button>
            <div className='card-memo-grid'>
                {cards.map(card =>(
                    <MatchFlashCard
                        key={card.id}
                        card={card}
                        handleChoice = {handleChoice}
                        bordered = {card === choiceOne || card === choiceTwo || card.matched}
                        disabled = {disabled}
                    />
                ))}

            </div>
            <p>Turns: {turns} </p>
        </>
    );
}
