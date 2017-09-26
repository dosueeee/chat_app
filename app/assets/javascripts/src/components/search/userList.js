import React from 'react'
import UserStore from '../../stores/user'
// import UserAction from '../../actions/user'
import _ from 'lodash'
import Utils from '../../lib/utils'

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

  // createFriendships(to_user_id) {
  //   UserAction.createFriendships(to_user_id)
  // }

  onSubmitHandler(to_user_id) {
    Utils.post('/friendships', {to_user_id})
  }

  render() {
    const searchUsers = this.state.users

    return (
      <ul className='search_user_list'>
        {
          _.map(searchUsers, (user, index) => {
            return (
              <li className='search_user_list_item' key={index}>
                <div
                className='search_user_list_result'
                onClick={this.onSubmitHandler.bind(this, user.id)}
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

  // render() {
  //   const users = this.state.users.map((user, index) => {
  //     return (
  //       <li
  //         key={index}
  //         onClick={this.onSubmitHandler.bind(this, user.id)}
  //         className='list'
  //       >
  //         {user}
  //       </li>
  //     )
  //   })
  //   return (
  //     <div>
  //       <ul
  //         className='list'
  //         name='fstr'
  //       >
  //       {users}
  //       </ul>
  //     </div>
  //     )
  // }

}
export default UserList
