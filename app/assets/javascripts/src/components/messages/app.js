import React from 'react'
import _ from 'lodash'
import MessagesStore from '../../stores/messages'
import UserList from './userList'
import MessagesBox from './messagesBox'
import CurrentUserStore from '../../stores/currentUser'
import UserStore from '../../stores/user'

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
    const currentUser = UserStore.getCurrentUser()
    const users = MessagesStore.getUserMessages()
    if (!currentUser) return {}
    const currentUserMessages = currentUser.messages ? currentUser.messages : []
    const currentUserMessagesToUser = _.filter(currentUserMessages, {to_user_id: openChatId})
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
    const {currentUser} = this.state
    return (
      <div className='app'>
        <UserList {...this.state} />
        <MessagesBox {...this.state}/>
      </div>
      )
  }
}

export default App
