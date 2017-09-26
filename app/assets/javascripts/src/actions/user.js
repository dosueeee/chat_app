import Dispatcher from '../dispatcher'
import request from 'superagent'
import {ActionTypes, APIEndpoints} from '../constants/app'

export default {
  searchUsers(search_string) {
    return new Promise((resolve, reject) => {
      request
      .get(`${APIEndpoints.SEARCH_USERS}`)
      .query({search_string})
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
  // createFriendships(to_user_id) {
  //   return new Promise((resolve, reject) => {
  //     request
  //     .post(`${APIEndpoints.CREATE_FRIENDSHIPS}`)
  //     .set('X-CSRF-Token', CSRFToken())
  //     .send({
  //       to_user_id
  //       // from_user_id: current_user.id,
  //     })
  //     .end((error, res) => {
  //       const json = JSON.parse(res.text)
  //       if (!error && json.status === 200) {
  //         var redirect_url = 'http://localhost:3000'
  //         location.href = redirect_url
  //       } else {
  //         reject(res)
  //       }
  //       debugger
  //     })
  //   })
  // },
  // changeOpenChat(newUserID) {
  //   Dispatcher.handleViewAction({
  //     type: 'updateOpenChatID',
  //     userID: newUserID,
  //   })
  // },
}
