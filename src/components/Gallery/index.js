import React, { useEffect, useState } from 'react' 
import './style.css'
import { useSelector, useDispatch } from "react-redux";
import ReactModal from 'react-modal';
import {fetchImages} from '../../redux/gallery/actions'
import useForceUpdate from 'use-force-update';

const Gallery = () => {
    const dispatch = useDispatch();
    const forceUpdate = useForceUpdate();
    const gallery = useSelector((state) => state.gallery); 
    const [showModal, setShowModal] = useState(false)
    const [images, setImages] = useState([])
    const [obj, setobj] = useState({})
    useEffect(()=>{ 
        dispatch(fetchImages())
        console.log(gallery)
    },[]) 
    useEffect(()=>{   
        console.log(gallery)
        setImages(gallery?.images) 
        forceUpdate()
        console.log(images)
    },[gallery]) 
    const onImageClick = (link,title) => {
        setShowModal(true)
        setobj({link,title})
    }
    return(<>
        <div className="gallery-grid">
            {
                images.length > 0
                ? images?.map(( img, i) =>{
                    const url = `https://live.staticflickr.com/${img.server}/${img.id}_${img.secret}.jpg`
                    return <div onClick={() => onImageClick(url, img.title)} key={i} className="gallery-post">
                                <img src = {url}/>
                                {
                                    img.title ? <p>{img.title}</p> : <></>
                                } 
                            </div>  
                })
                : <p>NO IMAGES FOUND</p>
            }
        </div>
      <ReactModal
        isOpen={showModal}
        contentLabel="Minimal Modal Example"
        closeTimeoutMS={500}
        style={{
          overlay: {
            backgroundColor: 'rgba(13, 13, 13, 0.16)',
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center', 
            zIndex: 20
          },
          content: {  
            borderRadius: "20px",
            padding: "40px",
            width:'fit-content',
            inset: 'unset',
          },

        }}
      > 
        <span className="closeicon" onClick={() => setShowModal(false)}>
            X
        </span>
        <div className="gallery-post">
            <img src = {obj.link}/> 
            {
                obj.title ? <p>{obj.title}</p> : ""
            }
            {/* <a download href={obj.link} target="_blank" >
              <img 
                className="download-icon" 
                src="https://www.searchpng.com/wp-content/uploads/2019/02/Download-Icon.png" />
            </a> */}
        </div>  
      </ReactModal>
    </>)
}

 
  export default Gallery