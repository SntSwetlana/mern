import React, {useEffect, useState} from "react";
import './FlashCardPag.css'
import FlashCardItemPag from "./FlashCardItemPag"

export default function FlashCardPag({flashcards}){
    const [questions, setQuestions] = useState([])
    const [error, setError] = useState(false)

    const [isModalOpen, setIsModalOpen] = useState(false)

    const [correct, setCorrect] = useState(0);
    const [index, setIndex] = useState(0);

    const random_start = 0; // От какого генерировать
    const random_end = flashcards.length-1; // До какого генерировать
    const allСycles = 3; // number of random numbers

    //make random arrow for indexing questions
    const array_IndexQuestions = []
    for (let i=random_start;i<flashcards.length;i++){
        array_IndexQuestions.push(i)
    }
    array_IndexQuestions.sort(() => Math.random()- .5) //список перемешаных нормеров карточек
    if(flashcards.length===0) return;

    const nextQuestion = ()=>{
        setIndex((oldIndex) => {
            const index = oldIndex + 1
            if (index > flashcards.length - 1 ){
                console.log('all questions done') //ModalFinish
                setIndex(0);
                setCorrect(0);
                return 0
            }else{
                return index
            }
        })
    }
    const checkAnswer = value => {
        if(value){
            setCorrect((oldState) => oldState +1)
        }
        nextQuestion()
    }
    const answers = []
    const array= []
    for(let i=random_start;i<=random_end;i++){ //[start... end]
        array.push(i)
    }
    //searching random index for wrong answer
    for(let countCycles=1;countCycles <= allСycles; countCycles++){
        answers.push(flashcards[array.splice(Math.random()*array.length,1)[0]].term);
    }
    answers.push(flashcards[array_IndexQuestions[index]].term);

    return(
        <div className='paging-card'>
            <section className='quiz'>
                <p className="correct-answers">
                    correct answers: {correct}/{index}
                </p>
                <article className="container">
                    <h2>{flashcards[array_IndexQuestions[index]].definition}</h2>
                    <div className='answer-grid'>
                            {answers.map((answer, index1) => {
                                return <button
                                    key={index1}
                                    className='answer-btn'
                                    onClick={()=>{
                                        checkAnswer(flashcards[array_IndexQuestions[index]].term === answer)}}
                                >
                                    {answer.toString()}
                                </button>})
                            }
                    </div>
                </article>
                <button className='next-question'onClick={nextQuestion}> next question</button>
            </section>
        </div>
    )
}

