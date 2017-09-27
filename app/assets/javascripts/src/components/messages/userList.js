import React from 'react'
import _ from 'lodash'
import classNames from 'classnames'
import Utils from '../../utils'
import MessagesStore from '../../stores/messages'
import UserStore from '../../stores/user'
import MessagesAction from '../../actions/messages'
import {CSRFToken} from '../../constants/app'

class UserList extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.initialState
    this.onChangeHandler = this.onStoreChange.bind(this)
  }

  get initialState() {
    return this.getStateFromStores()
  }

  // getStateFromStore() {
  //   const allMessages = MessagesStore.getAllChats()

  //   const messageList = []
  //   _.each(allMessages, (message) => {
  //     const messagesLength = message.messages.length
  //     messageList.push({
  //       lastMessage: message.messages[messagesLength - 1],
  //       lastAccess: message.lastAccess,
  //       user: message.user,
  //     })
  //   })
  //   return {
  //     openChatID: MessagesStore.getOpenChatUserID(),
  //     messageList: messageList,
  //   }
  // }

  // getStateFromStore() {
  //   return {
  //     users: UserStore.getUsers(),
  //     openChatId: MessagesStore.getOpenChatUserId(),
  //   }
  // }

  getStateFromStores() {
    return {
      users: UserStore.getUsers(),
      openChatId: MessagesStore.getOpenChatUserId(),
    }
  }

  componentDidMount() {
    MessagesStore.onChange(this.onChangeHandler)
    UserStore.onChange(this.onChangeHandler)
  }

  componentWillMount() {
    MessagesStore.onChange(this.onStoreChange.bind(this))
    UserStore.onChange(this.onStoreChange.bind(this))
  }

  // componentWillUnmount() {
  //   MessagesStore.offChange(this.onStoreChange.bind(this))
  //   UserStore.offChange(this.onStoreChange.bind(this))
  // }

  componentWillUnmount() {
    MessagesStore.offChange(this.onChangeHandler)
    UserStore.offChange(this.onChangeHandler)
  }

  onStoreChange() {
    this.setState(this.getStateFromStores())
  }

  changeOpenChat(userId) {
    MessagesAction.getMessages(userId)
  }

  deleteChatConfirm(e) {
    if (!confirm('本当に削除しますか？(チャットの履歴は残ります。)')) {
      e.preventDefault()
    }
  }

  // changeOpenChat(id) {
  //   MessagesAction.changeOpenChat(id)
  // }

  render() {
    const {users, openChatId} = this.state
    const friendUsers = _.map(users, (user) => {
      const messageLength = user.messages.length
      const lastMessage = user.messages[messageLength - 1]
      return (
        <li
          key={user.id}
          onClick={this.changeOpenChat.bind(this, user.id)}
        >
          <form action={`/friendships/${user.id}`} method='post'>
            <input
              type='hidden'
              name='authenticity_token'
              value={CSRFToken()}
            />
            <input
              type='hidden'
              name='_method'
              value='delete'
            />
            <input
              type='submit'
              value='&#xf00d;'
              // value='X'
              className='remove-chat-btn'
              onClick={this.deleteChatConfirm.bind(this)}
            />
          </form>
          <div>
            {user.name}
          </div>
        </li>
        )
    }, this)
    return (
      <div className='user-list'>
          <ul className='user-list__list'>
            {friendUsers}
           </ul>
      </div>
    )
  }
}

export default UserList
