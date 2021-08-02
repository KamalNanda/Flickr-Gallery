import React from 'react'
import Searchbar from '../Searchbar'
import './style.css'

const Header = () => {
    return(
        <div className="header">
            <p>Flickr App By Kamal Nanda</p>
            <Searchbar />
        </div>
    )
}

export default Header