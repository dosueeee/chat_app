import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
import {ActionTypes} from '../constants/app'
import _ from 'lodash'

// const UserStore = {
//   user: {
//     id: 1,
//     name: 'John Doek',
//     profilePicture: 'https://avatars1.githubusercontent.com/u/8901351?v=3&s=200',
//   },
// }

class UserStore extends BaseStore {
  getUsers() {
    if (!this.get('users')) this.setUsers([])
    return this.get('users')
  }
  setUsers(json) {
    this.set('users', json)
  }
}

const User = new UserStore()

User.dispatchToken = Dispatcher.register(payload => {
  const action = payload.action

  switch (action.type) {
    case ActionTypes.SEARCH_USERS:
      var hoge = action.json
      var hoge2 = _.map(hoge, 'name')
      User.setUsers(hoge2)
      User.emitChange()
      break
  }
  return true
})

export default User
