import {
    FETCHING_IMAGE, 
    FETCHING_SUCCESS,
    FETCHING_FAILED, 
    FILTERING_START,
    FILTERED,
    FILTERING_FAILED
} from "./constants.js";

const initialState = {
    loading: false,
    images : [],
    error : ''
  }
  
  export const galleryReducers = (state = initialState, action) => { 
    switch (action.type) {
      case FETCHING_IMAGE: 
        return { ...state, loading: true };
      case FETCHING_SUCCESS:
        return { ...state, loading: false , images: [...state.images, ...action.payload.photos.photo]}; 
      case FILTERED:
        return { ...state, loading: false , images: [...action.payload.photos.photo]}; 
      case FETCHING_FAILED:
        return { ...state, error: action.error }; 
      default:
        return state;
    }
  };