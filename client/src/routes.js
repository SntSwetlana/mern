import React from "react";
import { Route, Routes, Navigate} from "react-router-dom";
import {AuthPage} from "./page/AuthPage";
import {DetailPage} from "./page/DetailPage";
import {CreatePage} from "./page/CreatePage";
import {LinksPage} from "./page/LinksPage";
import {SchoolPage} from "./page/SchoolPage";
import {QuizletPage} from "./page/QuizletPage";
import {CreateQuizletPage} from "./page/CreateQuizletPage";
import {PlayCardGame} from "./page/PlayCardGame";

export const useRoutes = isAuthenticated => {
    if(isAuthenticated){
        return(
            <Routes>
                <Route path="PlayCardGame" element={<PlayCardGame />} />
                <Route path="CreateQuizletPage" element={<CreateQuizletPage />} />
                <Route path="QuizletPage" element={<QuizletPage />} />
                <Route path="SchoolPage" element={<SchoolPage />} />
                <Route path="links" element={<LinksPage />} />
                <Route path="detail/:id" element={<DetailPage />} />
                <Route path="create" element={<CreatePage />} />
                <Route  path="*"  element={<Navigate to="create" replace />} />
            </Routes>
        )
    }
    return (
        <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route  path="*" element={<Navigate to="/" replace />} />
        </Routes>
    )
}
