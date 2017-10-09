import React from 'react'
import _ from 'lodash'
import MessagesStore from '../../stores/messages'
import UserList from './userList'
import MessagesBox from './messagesBox'
import CurrentUserStore from '../../stores/currentUser'

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.initialState
    this.onChangeHandler = this.onStoreChange.bind(this)
  }

  get initialState() {
    return this.getStateFromStores()
  }

  getStateFromStores() {
    const openChatId = MessagesStore.getOpenChatUserId()
    // CurrentUserStoreに関数を定義するより、UserStoreに定義して、UserStore.getCurrentUser()とした方が良い
    const currentUser = CurrentUserStore.getCurrentUser()
    if (!currentUser) return {}
    const currentUserMessages = currentUser.messages ? currentUser.messages : []
    const currentUserMessagesToUser = _.filter(currentUserMessages, {to_user_id: openChatId})
    // 〇〇Storeから取得しているコードはまとめた方が良い
    const users = MessagesStore.getUserMessages()
    const openUserMessages = users.messages ? users.messages : []
    const allMessages = _.concat(currentUserMessagesToUser, openUserMessages)
    const messages = _.sortBy(allMessages, (message) => { return message.created_at })
    return {
      currentUser,
      messages,
    }
  }

  componentDidMount() {
    MessagesStore.onChange(this.onChangeHandler)
    CurrentUserStore.onChange(this.onChangeHandler)
  }

  componentWillUnmount() {
    MessagesStore.offChange(this.onChangeHandler)
    CurrentUserStore.offChange(this.onChangeHandler)
  }

  onStoreChange() {
    this.setState(this.getStateFromStores())
  }

  render() {
    return (
        <div className='app'>
          {/* 細かいけど、こういう部分のインデントも揃えた方が良い */}
          <UserList />
          <MessagesBox {...this.state}/>
        </div>
      )
  }
}

export default App
