import React from "react";
import styled, {ThemeProvider} from 'styled-components'
import { DragDropContext } from "react-beautiful-dnd";
import initialData from "../data/initial-data";
import Column from '../data/column'

const themes = {
    'correct':      { main: 'mediumseagreen'},
    'incorrect' :   { main: 'palevioletred'}
}

const Container = styled.div`
  border: 3px solid  ${({ theme }) => theme.main };
  color: ${({ theme }) => theme.main };
  display: flex;
`


const Header1 = styled.h3`
  display: flex;
  font-size: 28px;
  font-weight: bold;
`

const Button = styled.button`
    display: flex;
    margin: 8px;
    align: justify;
`

export default class LinkSchoolPage extends React.Component{
    state = initialData

    checkAnswerHandler = () => {
        let Checked = true
        this.state.strIsCorrect = 'correct'
        this.state.columnOrder.map((columnId) => {
            const column = this.state.columns[columnId];
            for (let i = 0; i < column.taskIds.length;i++)
            {
               if(!(this.state.answers[columnId].taskIds.indexOf(column.taskIds[i].toString(),0) != -1))
                   Checked=false;
            }
        })
        if(!Checked)
            this.state.strIsCorrect = 'incorrect'
        const newState = {
            ...this.state,
            isCorrect: {Checked},
            count: this.state.count + 1,
            strIsCorrect: this.state.strIsCorrect
        }
        this.setState(newState)
    }

    onDragStart = () => {
        document.body.style.transition = 'background-color 0.2s ease'
    }

    onDragUpdate = update => {
        const { destination } = update;
        const opacity = destination ? destination.index / Object.keys(this.state.tasks).length : 0;
        document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity})`;
    }


    onDragEnd = result => {

        document.body.style.color = 'inherit';
        document.body.style.backgroundColor = 'inherit';
        const { destination, source, draggableId } = result;
        if(!destination){
            return;
        }

        if((destination.droppableId === source.droppableId) &&
            destination.index === source.index){
            return;
        }
        const start = this.state.columns[source.droppableId];
        const finish = this.state.columns[destination.droppableId];

        if(start === finish){
            const newTaskIds = Array.from(start.taskIds);
            newTaskIds.splice(source.index,1);
            newTaskIds.splice(destination.index,0, draggableId);

            const newColumn = {
                ...start,
                taskIds: newTaskIds,
            };

            const newState = {
                ...this.state.initialData,
                columns: {
                    ...this.state.initialData.columns,
                    [newColumn.id]: newColumn,
                },
            };
            this.setState(newState);
            return;
        }

        const startTaskIds = Array.from(start.taskIds);
        startTaskIds.splice(source.index, 1);
        const newStart = {
            ...start,
            taskIds: startTaskIds,
        }

        const finishTaskIds = Array.from(finish.taskIds);
        finishTaskIds.splice(destination.index,0 , draggableId);
        const newFinish = {
            ...finish,
            taskIds:finishTaskIds,
        }


        const newState = {
            ...this.state,
            columns: {
                ...this.state.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish,
            }
        }
        this.setState(newState)
    }


    render() {
        return(
            <DragDropContext
                onDragStart={this.onDragStart}
                onDragEnd={this.onDragEnd}
            >
                <Header1>Put the words in the correct column</Header1>
                <ThemeProvider theme={themes[this.state.strIsCorrect]}>
                    <Container>
                        {
                            this.state.columnOrder.map((columnId) => {
                            const column = this.state.columns[columnId];
                            const tasks = column.taskIds.map(taskId => this.state.tasks[taskId])

                            return <Column key={column.id} column={column} tasks={tasks} />;
                        })}
                    </Container>
                    <Button
                    className='btn blue lighten-1 black-text'
                    disabled={!!(this.state.columns['column-1'].taskIds.length)}
                    onClick={this.checkAnswerHandler}
                    >Check answer</Button>
                </ThemeProvider>
            </DragDropContext>
        )
    }

}

