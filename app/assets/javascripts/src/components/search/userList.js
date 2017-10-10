import React from 'react'
import UserStore from '../../stores/user'
import UserAction from '../../actions/user'
import _ from 'lodash'

class UserList extends React.Component {
  static get propTypes() {
    return {
      searchString: React.PropTypes.string,
    }
  }

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

  createFriendships(to_user_id) {
    UserAction.createFriendships(to_user_id)
  }

  render() {
    const searchUsers = this.state.users

    return (
      <ul className='search_user_list'>
        {
          _.map(searchUsers, (user, index) => {
            return (
              <li className='search_user_list_item' key={user.id}>
                <div
                className='search_user_list_result'
                onClick={this.createFriendships.bind(this, user.id)}
                >
                  {user.name}
                </div>
              </li>
            )
          })
        }
      </ul>
    )
  }

}
export default UserList
