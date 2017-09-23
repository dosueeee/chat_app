import Dispatcher from '../dispatcher'
import request from 'superagent'
import {ActionTypes, APIEndpoints} from '../constants/app'

export default {
  searchUsers(search_fstr) {
    return new Promise((resolve, reject) => {
      request
      .get(`${APIEndpoints.SEARCH_USERS}`)
      .query({search_fstr})
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
  changeOpenChat(newUserID) {
    Dispatcher.handleViewAction({
      type: 'updateOpenChatID',
      userID: newUserID,
    })
  },
}
