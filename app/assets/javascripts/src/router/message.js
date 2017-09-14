import ReactDecorator from '../base/react_decorator'
import BaseRouter from '../base/router'
import App from '../components/messages/app'
import MessagesAction from '../actions/messages'

export default class MessageRouter extends BaseRouter {
  register() {
    this.route('/', this.decorateApp, this.loadMessages)
  }

  decorateApp(ctx, next) {
    (new ReactDecorator()).decorate('react-main', App)
    next()
  }
  loadMessages(ctx, next) {
  	    MessagesAction.getMessage()
  	    next()
  }
}
