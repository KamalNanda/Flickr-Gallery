import React from 'react'
import Header from '../../components/Header'
import Gallery from '../../components/Gallery'
import Loader from '../../components/Loader'
const Homepage = () => {
    return(
        <div>
            <Header />
            <Gallery />
            <Loader />
        </div>
    )
}

export default Homepage