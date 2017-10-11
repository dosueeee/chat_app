import React from 'react'
import _ from 'lodash'
import classNames from 'classnames'
import MessagesStore from '../../stores/messages'
import UserStore from '../../stores/user'
import MessagesAction from '../../actions/messages'
import CurrentUserAction from '../../actions/currentUser'
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

  onStoreChange() {
    this.setState(this.getStateFromStores())
  }

  changeOpenChat(userId) {
    MessagesAction.getMessages(userId)
  }

  deleteFriendships(userId) {
    UserAction.deleteFriendships(userId)
  }

  render() {
    const {users, openChatId} = this.state
    const friendUsers = _.map(users, (user) => {
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
              value='X'
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
