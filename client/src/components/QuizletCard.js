import React from "react";

export const QuizletCard = ({link}) => {
    return(
        <>
            <h2>Link</h2>
            <p>Your link <a href={link.to} target='_blank' rel='noopener noreferrer'>{link.to}</a></p>
            <p>From: <a href={link.from} target='_blank' rel='noopener noreferrer'>{link.from}</a></p>
            <p>Number of clicks on your link: <strong> {link.clicks}</strong></p>
            <p>Creation Data: <strong> {new Date (link.date).toLocaleDateString()}</strong></p>
        </>
    )
}
