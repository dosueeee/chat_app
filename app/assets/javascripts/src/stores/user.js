import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
import {ActionTypes} from '../constants/app'

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
    case ActionTypes.LOAD_USERS:
      User.setUsers(payload.action.json)
      User.emitChange()
      break

    case ActionTypes.SEARCH_USERS:
      var hoge = action.json
      User.setUsers(hoge)
      User.emitChange()
      break

    case ActionTypes.DELETE_FRIENDSHIPS:
      User.setUsers(payload.action.json.user)
      User.emitChange()
      break
  }
  return true
})

export default User
