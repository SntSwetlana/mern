import React, {useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {Authcontext} from "../context/Authcontext";
import styled from 'styled-components'

const Button = styled.button`
    display: flex;
  margin: 8px;
  
    align: justify;
    justify-content: right;
    ustify-content: flex-end;
    margin-left: auto;
`

const Card = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  text-align: right;
  position: relative;
  border-radius: .25rem;
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, .3);
  background-color: #ffe0b2;
  transform-style: preserve-3d;
  transition: 150ms;
  transform: perspective(1000px)
  rotateY(var(--rotate-y, 0))
  translateY(var(--translate-y, 0));
  margin: 16px;
`

const Input = styled.input`
  display: flex;
  position: relative;
  
`

export const CreateQuizletPage = () => {
    const auth = useContext(Authcontext)
    const {request} = useHttp()
    const [term, setTerm] = useState('')
    const [definition, setDefinition] = useState('')


    useEffect(()=>{
        window.M.updateTextFields()
    },[])
    //term,definition,language

    const  handlerAddCard = async () => {
        console.log(term)
        console.log(definition)
        console.log('eng')
        try{
            const data = await request(
                '/api/card/generate',
                'POST',
                {term: term, definition: definition, language: 'eng'}, // point to quizlet shema
                {Authorization: `Bearer ${auth.token}`
                })
        } catch (e) {}
    }
    return(
        <Card>
            <div className="col s12 orange lighten-4" >
                <div className="input-field col s6 orange lighten-4">
                    <Input
                        placeholder="Enter term"
                        id="Term"
                        type="text"
                        value={term}
                        onChange={e => setTerm(e.target.value)}
                    />
                    <label htmlFor="link">Enter term</label>
                </div>
                <form className="input-field col s6">
                                <textarea
                                    id="definition"
                                    className="materialize-textarea"
                                    placeholder="Enter definition"
                                    value={definition}
                                    onChange={e => setDefinition(e.target.value)}
                                />
                    <label htmlFor="definition">Enter definition</label>
                </form>
                <Button
                    className='btn blue lighten-1 black-text'
                    onClick = {handlerAddCard}
                >Add term</Button>
            </div>
        </Card>

    )
}
