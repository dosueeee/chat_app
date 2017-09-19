import request from 'superagent'
import Dispatcher from '../dispatcher'
import {ActionTypes, APIEndpoints, CSRFToken} from '../constants/app'

export default {
  changeOpenChat(newUserID) {
    Dispatcher.handleViewAction({
      type: 'updateOpenChatID',
      userID: newUserID,
    })
  },
  // sendMessage(userID, message) {
  //   Dispatcher.handleViewAction({
  //     type: ''sendMessage'',
  //     userID: userID,
  //     message: message,
  //     timestamp: +new Date(),
  //   })
  // },
  sendMessage(userID, message) {
    Dispatcher.handleViewAction({
            type: ActionTypes.POST_MESSAGE,
            userID: userID,
            message: message,
            timestamp: +new Date(),
          })
    return new Promise((resolve, reject) => {
      request
      .post(`${APIEndpoints.SEND_MESSAGE}`)
      .set('X-CSRF-Token', CSRFToken())
      .send({
        contents: message,
        from_user_id: 1,
      })
      .end((error, res) => {
        if (!error && res.status === 200 ) {
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.SEND_MESSAGE,
            json,
          })
        }
      })
    })
  },
  getMessages() {
    return new Promise((resolve, reject) => {
      request
      .get('/api/messages')
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.GET_MESSAGE,
            json,
          })
          resolve(json)
        } else {
          reject(res)
        }
      }
      )
    })
  },
  // postMessage() {
  //   console.log("huga")
  //   return new Promise((resolve, reject) => {
  //     request
  //     .post('${APIEndpoints.MESSAGE}')
  //     .set('X-CSRF-Token', CSRFToken())
  //     .send({messages_id: messagesId})
  //     .end((error, res) => {
  //       if (!error && res.status === 200) {
  //         const json = JSON.parse(res.text)
  //         Dispatcher.handleServerAction({
  //           type: ActionTypes.POST_MESSAGE,
  //           messageId,
  //           json,
  //         })
  //       } else {
  //         reject(res)
  //       }
  //     })
  //   })
  // },
}
