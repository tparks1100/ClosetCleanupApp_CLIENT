import apiUrl from '../apiConfig'
import axios from 'axios'
// import { withRouter } from 'react-router-dom'

export const createClothing = (user, clothing) => {
  return axios({
    url: apiUrl + '/clothes',
    method: 'POST',
    data: { clothing },
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}

export const viewClothes = (user, clothes) => {
  return axios({
    url: apiUrl + '/clothes',
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}

export const showClothing = (user, id) => {
  return axios({
    url: apiUrl + `/clothes/${id}`,
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}

export const updateClothing = (user, clothing, id) => {
  console.log('this is updates id', id)
  return axios({
    url: `${apiUrl}/clothes/${id}`,
    method: 'PATCH',
    data: { clothing },
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}
