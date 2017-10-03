import ReactDecorator from '../base/react_decorator'
import BaseRouter from '../base/router'
import App from '../components/messages/app'
import UserAction from '../actions/user'
import CurrentUserAction from '../actions/currentUser'

export default class MessageRouter extends BaseRouter {
  register() {
    this.route('/', this.decorateApp, this.loadUsers, this.loadMessages, this.loadCurrentUser)
  }

  decorateApp(ctx, next) {
    (new ReactDecorator()).decorate('react-main', App)
    next()
  }

  loadUsers(ctx, next) {
    UserAction.loadUsers()
    next()
  }

  loadMessages(ctx, next) {
    next()
  }

  loadCurrentUser(ctx, next) {
    CurrentUserAction.loadCurrentUser()
    next()
  }
}
