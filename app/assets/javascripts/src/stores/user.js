import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
import {ActionTypes} from '../constants/app'
import CurrentUserStore from '../stores/currentUser'

class UserStore extends BaseStore {
  getUsers() {
    if (!this.get('users')) this.setUsers([])
    return this.get('users')
  }

  setUsers(json) {
    this.set('users', json)
  }

  getCurrentUser() {
    if (!this.get('currentUser')) this.setCurrentUser({})
    return this.get('currentUser')
  }

  setCurrentUser(obj) {
    this.set('currentUser', obj)
  }

  getSearchUsers() {
    if (!this.get('users')) this.setSearchUsers([])
    return this.get('users')
  }

  setSearchUsers(json) {
    this.set('users', json)
  }
}

const User = new UserStore()

User.dispatchToken = Dispatcher.register(payload => {
  const action = payload.action

  switch (action.type) {
    case ActionTypes.LOAD_USERS:
      User.setUsers(action.json)
      User.emitChange()
      break

    case ActionTypes.SEARCH_USERS:
      var user = action.json
      User.setUsers(user)
      User.emitChange()
      break

    case ActionTypes.DELETE_FRIENDSHIPS:
      User.setUsers(action.json.user)
      User.emitChange()
      break

    case ActionTypes.LOAD_CURRENT_USER:
      User.setCurrentUser(action.json)
      User.emitChange()
      break
  }
  return true
})

export default User
