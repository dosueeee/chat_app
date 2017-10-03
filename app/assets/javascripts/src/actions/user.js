import Dispatcher from '../dispatcher'
import request from 'superagent'
import {ActionTypes, APIEndpoints, CSRFToken} from '../constants/app'

export default {
  loadUsers() {
    return new Promise((resolve, reject) => {
      request
      .get(`${APIEndpoints.USERS}`)
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.LOAD_USERS,
            json: json,
          })
          resolve(json)
        } else {
          reject(res)
        }
      })
    })
  },

  searchUsers(search_name) {
    return new Promise((resolve, reject) => {
      request
      .get(`${APIEndpoints.SEARCH_USERS}`)
      .query({search_name})
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.SEARCH_USERS,
            json,
          })
          resolve(json)
        } else {
          reject(res)
        }
      })
    })
  },
  createFriendships(to_user_id) {
    return new Promise((resolve, reject) => {
      request
      .post(`${APIEndpoints.CREATE_FRIENDSHIPS}`)
      .set('X-CSRF-Token', CSRFToken())
      .send({
        to_user_id,
      })
      .end((error, res) => {
        const json = JSON.parse(res.text)
        if (!error && json.status === 200) {
          var redirect_url = 'http://localhost:3000'
          location.href = redirect_url
        } else {
          reject(res)
        }
      })
    })
  },

  deleteFriendships(userId) {
    return new Promise((resolve, reject) => {
      request
      .delete(`${APIEndpoints.DELETE_FRIENDSHIPS + userId}`)
      .set('X-CSRF-Token', CSRFToken())
      .send({
        to_user_id: userId,
      })
      .end((error, res) => {
        const json = JSON.parse(res.text)
        if (!error && json.status === 200) {
          Dispatcher.handleServerAction({
            type: ActionTypes.DELETE_FRIENDSHIPS,
            json,
          })
        } else {
          reject(res)
        }
      })
    })
  },
}
