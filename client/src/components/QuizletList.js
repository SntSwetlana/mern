import React from "react";

export const QuizletList = ({quizlets}) => {
    return (
        <table>
            <thead>
            <tr>
                <th>Number</th>
                <th>Term</th>
                <th>Definition</th>
                <th>Leng</th>
                <th>Data</th>
            </tr>
            </thead>

            <tbody>
            {quizlets.map((quizlet, index) => {
                return(
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{quizlet.term}</td>
                        <td>{quizlet.definition}</td>
                        <td>{quizlet.leng}</td>
                        <td>
                        </td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}
