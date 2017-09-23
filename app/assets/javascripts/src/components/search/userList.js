import React from 'react'
import UserStore from '../../stores/user'
import UserAction from '../../actions/user'

class UserList extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.initialState	
  }	

  get initialState() {
    return this.getStateFromStore()	
  }

  getStateFromStore() {
    return {
      users: UserStore.getUsers(),
    }
  }

  componentWillMount() {
    UserStore.onChange(this.onStoreChange.bind(this))
  }

  componentWillUnmount() {
    UserStore.offChange(this.onStoreChange.bind(this))
  }

  onStoreChange() {
    this.setState(this.getStateFromStore())
  }

  changeOpenChat(newUserID) {
    UserAction.changeOpenChat()
  }

  render() {
    const users = this.state.users.map((user, index) => {
      return (
        <li
          key={index}
          onClick={this.changeOpenChat.bind(this)}
          className='list'
        >
          {user}
        </li>
      )
    })
    return (
      <div>
        <ul
          className='list'
          name='fstr'
        >
        {users}
        </ul>
      </div>
      )
  }
}

export default UserList
