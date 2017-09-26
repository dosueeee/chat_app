import ReactDecorator from '../base/react_decorator'
import BaseRouter from '../base/router'
import App from '../components/messages/app'
import MessagesAction from '../actions/messages'
import UserAction from '../actions/user'

export default class MessageRouter extends BaseRouter {
  register() {
    this.route('/', this.decorateApp, this.loadUsers, this.loadMessages)
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
    MessagesAction.getMessages()
    next()
  }
}
