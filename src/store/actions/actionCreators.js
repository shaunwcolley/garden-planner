import * as actionTypes from './actionTypes'

export const plantsFetched = () => {

  return dispatch => {
    fetch('http://localhost:8080/api/plants')
    .then(response => response.json())
    .then(json => {
      dispatch({type: actionTypes.PLANTS_FETCH, plants: json})
    })
  }
}

export const sizeSave = (dimensions) => {
  return dispatch => {
    dispatch({type: actionTypes.SIZE_SAVE, dimensions: dimensions})
  }
}
