import React from 'react'
import _ from 'lodash'
import classNames from 'classnames'
import Utils from '../../utils'
import MessagesStore from '../../stores/messages'
import UserStore from '../../stores/user'
import MessagesAction from '../../actions/messages'
import {CSRFToken} from '../../constants/app'
import CurrentUserAction from '../../actions/currentUser'
import CurrentUserStore from '../../stores/currentUser'
import UserAction from '../../actions/user'

class UserList extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.initialState
    this.onChangeHandler = this.onStoreChange.bind(this)
  }

  get initialState() {
    return this.getStateFromStores()
  }

  getStateFromStores() {
    const currentUser = CurrentUserStore.getCurrentUser()
    if (!currentUser) return {}
    const currentUserId = currentUser.id
    return {
      users: UserStore.getUsers(),
      openChatId: MessagesStore.getOpenChatUserId(),
      currentUser,
      currentUserId,
    }
  }

  componentDidMount() {
    MessagesStore.onChange(this.onChangeHandler)
    UserStore.onChange(this.onChangeHandler)
    CurrentUserStore.onChange(this.onChangeHandler)
  }

  componentWillMount() {
    MessagesStore.onChange(this.onStoreChange.bind(this))
    UserStore.onChange(this.onStoreChange.bind(this))
    CurrentUserStore.onChange(this.onChangeHandler)
  }

  // componentWillUnmount() {
  //   MessagesStore.offChange(this.onStoreChange.bind(this))
  //   UserStore.offChange(this.onStoreChange.bind(this))
  // }

  // componentWillUnmount() {
  //   MessagesStore.offChange(this.onChangeHandler)
  //   UserStore.offChange(this.onChangeHandler)
  // }

  onStoreChange() {
    this.setState(this.getStateFromStores())
  }

  changeOpenChat(userId) {
    MessagesAction.getMessages(userId)
    CurrentUserAction.loadCurrentUser()
  }

  // deleteChatConfirm(e) {
  //   if (!confirm('本当に削除しますか？(チャットの履歴は残ります。)')) {
  //     e.preventDefault()
  //   }
  // }

  deleteFriendships(userId) {
    UserAction.deleteFriendships(userId)
  }

  render() {
    const {users, openChatId} = this.state
    const friendUsers = _.map(users, (user) => {
      const messageLength = user.messages.length
      const lastMessage = user.messages[messageLength - 1]

      const itemClasses = classNames({
        'user-list__item': true,
        'clear': true,
        'user-list__item--active': openChatId === user.id,
      })

      return (
        <li
          key={user.id}
          onClick={this.changeOpenChat.bind(this, user.id)}
          className={itemClasses}
        >
          <div>
            <input
              type='button'
              value='&#xf00d;'
              // value='X'
              key={user.id}
              className='remove-chat-btn'
              onClick={this.deleteFriendships.bind(this, user.id)}
            />
            </div>
          <div className='user-list__item__picture'>
            <img src={user.image ? '/user_images/' + user.image : '/assets/images/default_image.jpg'} />
          </div>
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
