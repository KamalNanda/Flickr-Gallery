import React, { useEffect, useState } from 'react'
import './style.css'
import searchbarlogo from '../../assets/searchbar.png'
import {filterImages,fetchImages} from '../../redux/gallery/actions'
import { useSelector, useDispatch } from "react-redux";
const Searchbar = () => {
    const dispatch = useDispatch();
    const [searchKey, setSearchKey] = useState('')
    const [isSuggesting, setSuggesting] = useState(false)
    const [suggestions, setSuggestions] = useState([])
    useEffect(()=>{
        setSuggestions(localStorage.getItem('suggestions') ? JSON.parse(localStorage.getItem('suggestions')) : [] )
    }, []) 
    const handleSubmit = (e) => {
        e.preventDefault()
        let suggests = localStorage.getItem('suggestions') ? JSON.parse(localStorage.getItem('suggestions')) : []
        if(suggests.indexOf(searchKey) === -1){
            if(searchKey === "" || searchKey === " "){
                suggests = [...suggests]
                setSuggestions(suggests) 
            }
            else{
                suggests = [...suggests, searchKey]
                setSuggestions(suggests) 
            }
        }
        setSuggesting(false)
        localStorage.setItem('suggestions', JSON.stringify(suggests))
        dispatch(filterImages(searchKey))
    }
    const handleSuggestionClick = (value) => { 
        setSuggesting(false)
        setSearchKey(value)
        dispatch(filterImages(value))

    }
    return(
        <div>
            <form className="message-input" onSubmit={(e) => handleSubmit(e)}>
                <input  
                    value={searchKey}
                    onFocus={() => setSuggesting(true)}  
                    onChange={(e) => setSearchKey(e.target.value) } 
                    type="text" 
                    placeholder="Search...." />
                <img src={searchbarlogo} onClick={(e) => handleSubmit(e)} />
                {
                    isSuggesting 
                        ? <div className="suggestions">
                            {
                                suggestions.length > 0 ? suggestions?.map((suggestion,i) =>{
                                    return <div onClick={() => handleSuggestionClick(suggestion)}>{suggestion}</div>
                                }) : <div>{"FIND SOMETHING"}</div>
                            } 
                        </div>
                        : <></>
                }
            </form>
        </div>
    )
}

export default Searchbar