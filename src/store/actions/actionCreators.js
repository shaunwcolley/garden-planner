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

export const allPlansFetched = (userId) => {
  let url = 'http://localhost:8080/api/plans/' + userId
  return dispatch => {
    fetch(url)
    .then(response => response.json())
    .then(json => {
      dispatch({type: actionTypes.PLANS_FETCH, plans: json})
    })
  }
}

export const onePlanFetched = (plan) => {
  return dispatch =>
      dispatch({type: actionTypes.PLAN_FETCH, plan: plan})
}

export const newPlan = () => {
  return dispatch =>
  dispatch({type: actionTypes.NEW_PLAN})
}
