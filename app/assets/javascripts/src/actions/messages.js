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

  sendMessage(contents, to_user_id) {
    return new Promise((resolve, reject) => {
      request
      .post(`${APIEndpoints.SEND_MESSAGE}`)
      .set('X-CSRF-Token', CSRFToken())
      .send({
        contents,
        to_user_id,
      })
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.SEND_MESSAGE,
            contents,
            to_user_id,
            json,
          })
          resolve(json)
        } else {
          reject(res)
        }
      })
    })
  },

  getMessages(id) {
    return new Promise((resolve, reject) => {
      request
      .get(`${APIEndpoints.USERS}/${id}`)
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.GET_MESSAGES,
            id,
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

  saveImageChat(file, to_user_id) {
    return new Promise((resolve, reject) => {
      request
      .post(`${APIEndpoints.SEND_MESSAGE}/upload_image`)
      .set('X-CSRF-Token', CSRFToken())
      .attach('image', file, file.name)
      .field('to_user_id', to_user_id)
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.SAVE_IMAGE_CHAT,
            image: json.message.image,
            to_user_id,
            json,
          })
          resolve(json)
        } else {
          reject(res)
        }
      })
    })
  },
}
