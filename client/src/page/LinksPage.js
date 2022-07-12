import React, {useCallback, useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {Authcontext} from "../context/Authcontext";
import {Loader} from "../components/Loader";
import {LinksList} from "../components/LinkList";

export const LinksPage = () => {
    const [links, setLinks] = useState([])
    const {loading, request} = useHttp()
    const {token} = useContext(Authcontext)

    const fetchLinks = useCallback(async () => {
        try{
            const fetched = await request('/api/link', 'GET',null, {
                Authorization: `Bearer ${token}`
            })
            setLinks(fetched)
        }
        catch (e) {}
        }, [token, request]   )

    useEffect(() => {
        fetchLinks()
    }, [fetchLinks])

    if(loading){
        return <Loader />
    }
    return(
        <>
            {!loading && <LinksList links = {links}/>}
        </>
    )
}
