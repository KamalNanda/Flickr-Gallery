import React from 'react' 
import './style.css'
import { useSelector, useDispatch } from "react-redux";
import {fetchImages} from '../../redux/gallery/actions'

const Loader = () => {
    const dispatch = useDispatch();
    const gallery = useSelector((state) => state.gallery); 
    const onButtonClick = () => { 
        dispatch(fetchImages())
    }
    return(
        <div className="loader">
            {
                gallery.loading 
                    ? <img alt="spinner" src="https://preloaders.evidweb.com/images/preloaders/ajax-loading-c7.gif" />
                    : <button onClick={() => onButtonClick()}>LOAD MORE</button>
            } 
        </div>
    )
}

export default Loader