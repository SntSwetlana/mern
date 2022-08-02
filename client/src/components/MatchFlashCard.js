import React from "react";

export default function MatchFlashCard({card, handleChoice ,bordered, disabled}){
    const handleClick = () => {
        if(!disabled){
            handleChoice(card)
        }
    }
    return(
            <div
                className= {`card-memo ${bordered ? 'bordered' : ''}`}
                onClick={handleClick}>
                {card.term}
            </div>
    )
}

