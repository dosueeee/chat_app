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
      // components/messages/userList.jsでもUserStore.getUsers()を使っている
      // components/messages/userList.jsでは友達関係にあるユーザー一覧を表示するのに対して、
      // このuserListコンポーネントでは検索したユーザーを表示するため、異なる関数で取得できるようにすると良い
      // 今回は動いているが、ユーザー一覧と検索したユーザーを一緒に表示したい場合は今の状態では上手くいかないはず
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
              <li className='search_user_list_item' key={index}> {/* indexはcollectionの長さによって変わりうるので、keyにはuser.idを使う */}
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
