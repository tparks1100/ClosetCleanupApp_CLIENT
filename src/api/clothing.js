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

// export const viewPosts = (user, devpost) => {
//   return axios({
//     url: apiUrl + '/devposts',
//     method: 'GET',
//     headers: {
//       'Authorization': `Bearer ${user.token}`
//     }
//   })
// }
//
// export const showPost = (user, devpost, id) => {
//   return axios({
//     url: apiUrl + `/devposts/${id}`,
//     method: 'GET',
//     headers: {
//       'Authorization': `Bearer ${user.token}`
//     }
//   })
// }
//
// export const updatePost = (user, devpost, id) => {
//   return axios({
//     url: `${apiUrl}/devposts/${id}`,
//     method: 'PATCH',
//     data: { devpost },
//     headers: {
//       'Authorization': `Bearer ${user.token}`
//     }
//   })
// }
