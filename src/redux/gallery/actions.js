import {
  FETCHING_IMAGE,
  FETCHING_SUCCESS,
  FETCHING_FAILED,
  FILTERING_START,
  FILTERED,
  FILTERING_FAILED
} from "./constants.js";
import axios from 'axios'
import {API_ROOT_FOR_SEARCHING, API_ROOT_FOR_FETCHING} from '../../constants/constants.json' 

let page = 0

export const fetchImages = () => async (dispatch) => {
    dispatch({type: FETCHING_IMAGE}) 
    page = page + 1
    try{
        await axios
            .get(`${API_ROOT_FOR_FETCHING}&page=${page}`)
            .then(res =>{
                console.log(res)
                let obj = res.data.substring(14,res.data.length-1 ) 
                dispatch({type : FETCHING_SUCCESS, payload : JSON.parse(obj)})
            })
            .catch(err => {
                console.log(err)
                dispatch({type : FETCHING_FAILED, error : err.response})
            })
    }
    catch (error){
        console.log(error)
        dispatch({type : FETCHING_FAILED, error})
    }
}

export const filterImages = (tag) => async (dispatch) => {
    dispatch({type: FETCHING_IMAGE})  
    try{
        await axios
            .get(`${API_ROOT_FOR_SEARCHING}&tags=${tag}`)
            .then(res =>{
                console.log(res)
                let obj = res.data.substring(14,res.data.length-1 ) 
                dispatch({type : FILTERED, payload : JSON.parse(obj)})
            })
            .catch(err => {
                console.log(err)
                dispatch({type : FETCHING_FAILED, error : "No results found"})
            })
    }
    catch (error){
        console.log(error)
        dispatch({type : FETCHING_FAILED, error})
    }
}
