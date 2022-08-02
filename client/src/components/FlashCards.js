import React, {useEffect, useRef, useState} from "react";

export default function Flashcards({flashcard}){
    const [flip, setFlip] = useState(false)
    const [height, setHeight] = useState('initial')

    const frontEl = useRef()
    const backEl = useRef()

    function setMaxHeight() {
        const frontHeight = frontEl.current.getBoundingClientRect().height
        const backHeight = backEl.current.getBoundingClientRect().height
        setHeight( Math.max(frontHeight, backHeight, 100) )
    }

    useEffect(setMaxHeight,
        [flashcard.term, flashcard.definition])
    useEffect(()=>{
        window.addEventListener('resize', setMaxHeight)
        return() => window.removeEventListener('resize',setMaxHeight)
    },[])

    return(
        <div
            className={`card1 ${flip ? 'flip' : ''}`}
            style={{height: height}}
            onClick={() => setFlip(!flip)}>

            <div className='front' ref={frontEl}>
                {flashcard.term}
            </div>
            <div className='back' ref={backEl}>{flashcard.definition}</div>
        </div>
    )
}


