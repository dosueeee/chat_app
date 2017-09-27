// stores/messages.js
import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
import UserStore from '../stores/user'
import {ActionTypes} from '../constants/app'
import MessagesAction from '../actions/messages'

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

// class ChatStore extends BaseStore {
//   addChangeListener(callback) {
//     this.on('change', callback)
//   }

//   removeChangeListener(callback) {
//     this.off('change', callback)
//   }

//   // getOpenChatUserID() {
//   //   return openChatID
//   // }

//   getOpenChatUserId() {
//     const users = UserStore.getUsers()
//     if (Number.isNaN(openChatId) && users.length !== 0) {
//       openChatId = users[0].id
//       MessagesAction.getMessages(openChatId)
//     }
//     return openChatId
//   }

//   getChatByUserID(id) {
//     return messages[id]
//   }

//   getAllChats() {
//     return messages
//   }

//   getMessages() {
//     if (!this.get('messages')) this.setMessages([])
//     return this.get('messages')
//   }

//   setMessages(messages) {
//     // return this.set('messages', messages)
//     this.set('messages', messages)
//   }
// }
const MessagesStore = new MessageStore()

MessagesStore.dispatchToken = Dispatcher.register(payload => {
  const action = payload.action
  
  switch (action.type) {
    // case 'updateOpenChatID':
    //   openChatID = action.userID
    //   messages[openChatID].lastAccess.currentUser = +new Date()
    //   MessagesStore.emitChange()
    //   break

    case ActionTypes.POST_MESSAGE: {
        messages[2].messages.push({
          contents: action.message,
          timestamp: action.timestamp,
          from: 1,
        })
        MessagesStore.emitChange()
        break
      }
    // case ActionTypes.GET_MESSAGE:
    //   messages[2].messages.push({
    //     contents: action.json[0].contents, // action.json[]内に指定したidのcontentsが表示される
    //     timestamp: action.timestamp,
    //     from_user_id: action.json[1].from_user_id,
    //     to_user_id: action.json[1].to_user_id,
    //   })
    //   // messages[2].messages.push(
    //   //   MessagesStore.setMessages(action.json))
    //   MessagesStore.emitChange()
    //   break
    
    case ActionTypes.GET_MESSAGES:
      openChatId = payload.action.id
      MessagesStore.setUserMessages(payload.action.json)
      MessagesStore.emitChange()
      break
  }
  return true
})

export default MessagesStore
