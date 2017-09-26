// stores/messages.js
import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
import UserStore from '../stores/user'
import {ActionTypes} from '../constants/app'
import MessagesAction from '../actions/messages'

const messages = {
  2: {
    user: {
      profilePicture: 'https://avatars0.githubusercontent.com/u/7922109?v=3&s=460',
      id: 2,
      name: 'Ryan Clark',
      status: 'online',
    },
    lastAccess: {
      recipient: 1424469794050,
      currentUser: 1424469794080,
    },
    messages: [
      {
        contents: 'Hey!',
        from_user_id: 2,
        // to_user_id: 1,
        timestamp: 1424469793023,
      },
      {
        contents: 'Hey, what\'s up?',
        from_user_id: 1,
        // to_user_id: 2,
        timestamp: 1424469794000,
      },
    ],
  },
  3: {
    user: {
      read: true,
      profilePicture: 'https://avatars3.githubusercontent.com/u/2955483?v=3&s=460',
      name: 'Jilles Soeters',
      id: 3,
      status: 'online',
    },
    lastAccess: {
      recipient: 1424352522000,
      currentUser: 1424352522080,
    },
    messages: [
      {
        contents: 'Want a game of ping pong?',
        from_user_id: 3,
        // to_user_id: 1
        timestamp: 1424352522000,
      },
    ],
  },
  4: {
    user: {
      name: 'Todd Motto',
      id: 4,
      profilePicture: 'https://avatars1.githubusercontent.com/u/1655968?v=3&s=460',
      status: 'online',
    },
    lastAccess: {
      recipient: 1424423579000,
      currentUser: 1424423574000,
    },

    messages: [
      {
        contents: 'Please follow me on twitter I\'ll pay you',
        timestamp: 1424423579000,
        from_user_id: 4,
        // to_user_id: 1
      },
    ],
  },
}

// const messages = MessagesAction.getMessages.json

var openChatID = parseInt(Object.keys(messages)[0], 10)

let openChatId = parseInt(Object.keys(UserStore.getUsers())[0], 10)

class ChatStore extends BaseStore {
  addChangeListener(callback) {
    this.on('change', callback)
  }

  removeChangeListener(callback) {
    this.off('change', callback)
  }

  // getOpenChatUserID() {
  //   return openChatID
  // }

  getOpenChatUserId() {
    const users = UserStore.getUsers()
    if (Number.isNaN(openChatId) && users.length !== 0) {
      openChatId = users[0].id
      MessagesAction.getMessages(openChatId)
    }
    return openChatId
  }

  getChatByUserID(id) {
    return messages[id]
  }

  getAllChats() {
    return messages
  }

  getMessages() {
    if (!this.get('messages')) this.setMessages([])
    return this.get('messages')
  }

  setMessages(messages) {
    // return this.set('messages', messages)
    this.set('messages', messages)
  }
}
const MessagesStore = new ChatStore()

MessagesStore.dispatchToken = Dispatcher.register(payload => {
  const action = payload.action
  
  switch (action.type) {
    case 'updateOpenChatID':
      openChatID = action.userID
      messages[openChatID].lastAccess.currentUser = +new Date()
      MessagesStore.emitChange()
      break
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
    
    case ActionTypes.GET_MESSAGE:
      openChatId = payload.action.id
      MessagesStore.setMessages(payload.action.json)
      MessagesStore.emitChange()
      break
  }
  return true
})

export default MessagesStore
