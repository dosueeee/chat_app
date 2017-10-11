// stores/messages.js
import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
import UserStore from '../stores/user'
import {ActionTypes} from '../constants/app'
import MessagesAction from '../actions/messages'
import CurrentUserStore from './currentUser'

let openChatId = parseInt(Object.keys(UserStore.getUsers())[0], 10)

class MessageStore extends BaseStore {

  getOpenChatUserId() {
    const users = UserStore.getUsers()
    if (Number.isNaN(openChatId) && users.length !== 0) {
      openChatId = users[0].id
      MessagesAction.getMessages(openChatId)
    }
    return openChatId
  }

  getUserMessages() {
    if (!this.get('userMessages')) this.setUserMessages({})
    return this.get('userMessages')
  }

  setUserMessages(obj) {
    this.set('userMessages', obj)
  }

}

const MessagesStore = new MessageStore()

MessagesStore.dispatchToken = Dispatcher.register(payload => {
  const {action} = payload
  switch (action.type) {
    case ActionTypes.SEND_MESSAGE:
      {
        // const messages = CurrentUserStore.getCurrentUser().messages
        const userMessages = MessagesStore.getUserMessages()
        const currentUserMessages = userMessages.messages
        // const currentUserId = CurrentUserStore.getCurrentUser().id
        // const currentUserId = MessagesStore.getUserMessages().id
        // currentUserMessages.push({
        //   id: Math.floor(Math.random() * 1000000),
        //   contents: payload.action.contents,
        //   to_user_id: payload.action.to_user_id,
        //   user_id: currentUserId,
        // })
        currentUserMessages.push(
          action.json.message,
        ) 
      }
      MessagesStore.emitChange()
      break

    case ActionTypes.GET_MESSAGES:
      openChatId = action.id
      MessagesStore.setUserMessages(action.json)
      MessagesStore.emitChange()
      break

    case ActionTypes.SAVE_IMAGE_CHAT:
      {
        const userMessages = MessagesStore.getUserMessages()
        const currentUserMessages = userMessages.messages
        currentUserMessages.push(
          action.json.message,
        )
      }
      MessagesStore.emitChange()
      break

    case ActionTypes.DELETE_FRIENDSHIPS:
      openChatId = action.id
      MessagesStore.setUserMessages(payload.action.json)
      MessagesStore.emitChange()
      break
  }
  return true
})

export default MessagesStore
