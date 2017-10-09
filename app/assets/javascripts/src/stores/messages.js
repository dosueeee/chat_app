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
  // const {action} = payloadと書ける？
  const action = payload.action
  switch (action.type) {
    case ActionTypes.SEND_MESSAGE:
      {
        /*
        CurrentUserStoreからmessagesを取得するのは良い実装ではない
        messagesStoreにgetCurrentUserMessages()のような関数を作成し、引数にcurrentUserのidを渡すなどして、
        messagesStoreから取得できるようにすると良い
        基本的にStoreは①コンポーネントでデータを取得するために使う、②dispatcher経由でデータを更新する
        という2つの役割に絞るのが良い
        */
        const messages = CurrentUserStore.getCurrentUser().messages
        // こちらも引数で受け取るか何かしらで、storeから取得しない方法で実装できると良い
        const currentUserId = CurrentUserStore.getCurrentUser().id
        // messagesの中身をよく見ること。全然違うオブジェクトを格納している。
        messages.push({
          id: Math.floor(Math.random() * 1000000),
          contents: payload.action.contents,
          to_user_id: payload.action.to_user_id,
          user_id: currentUserId,
        })
      }
      MessagesStore.emitChange()
      break

    case ActionTypes.GET_MESSAGES:
      /*
      上でconst action = ...
      のようにしているので、
      openCHatId = action.id
      と書けるはず。
      */
      openChatId = payload.action.id
      MessagesStore.setUserMessages(payload.action.json) // action.jsonで良い
      MessagesStore.emitChange()
      break

    case ActionTypes.SAVE_IMAGE_CHAT:
      {
        const messages = CurrentUserStore.getCurrentUser().messages
        const currentUserId = CurrentUserStore.getCurrentUser().id
        messages.push({
          id: Math.floor(Math.random() * 1000000),
          image: payload.action.image,
          to_user_id: payload.action.to_user_id,
          user_id: currentUserId,
        })
      }
      MessagesStore.emitChange()
      break

    case ActionTypes.DELETE_FRIENDSHIPS:
      openChatId = payload.action.id // action.json
      MessagesStore.setUserMessages(payload.action.json)
      MessagesStore.emitChange()
      break
  }
  return true
})

export default MessagesStore
