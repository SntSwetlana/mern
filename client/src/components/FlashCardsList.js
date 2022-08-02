import React from "react";
import FlashCards from "./FlashCards";

export default function FlashCardsList({flashcards}){
    return(
        <div className='card1-grid' >
            {flashcards.map((flashcard,index) => {
                flashcard.index = Math.floor(Math.random() * 1000);
                return <FlashCards key={flashcard.id} flashcard={flashcard} />
            })}
        </div>
    )
}
