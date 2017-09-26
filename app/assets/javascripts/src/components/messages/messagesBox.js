import React from 'react'
import classNames from 'classNames'
// import MessagesStore from '../../stores/messages'
import ReplyBox from '../../components/messages/replyBox'
import _ from 'lodash'

class MessagesBox extends React.Component {

  static get propTypes() {
    return {
      currentUser: React.PropTypes.object,
      messages: React.PropTypes.array,
    }
  }

  // constructor(props) {
  //   super(props)
  //   this.state = this.initialState
  // }
  // get initialState() {
  //   return this.getStateFromStore()
  // }
  // getStateFromStore() {
  //   return MessagesStore.getChatByUserID(MessagesStore.getOpenChatUserID())
  //   // return {
  //   //   messages: MessagesStore.getMessages()
  //   // }
  // }
  // componentWillMount() {
  //   MessagesStore.onChange(this.onStoreChange.bind(this))
  // }
  // componentWillUnmount() {
  //   MessagesStore.offChange(this.onStoreChange.bind(this))
  // }
  // onStoreChange() {
  //   this.setState(this.getStateFromStore())
  // }
  render() {
    const {messages, currentUser} = this.props

    const userMessages = _.map(messages, (message) => {
      const messageClasses = classNames({
        'message-box__item': true,
        'message-box__item--from-current': message.user_id === currentUser.id,
        'clear': true,
      })
      return (
        <li key={message.id} className={messageClasses}>
          <div className='message-box__item__contents'>
            {message.image ? <img className='image-message' src={`/message_images/${message.image}`} /> : message.body}
          </div>
        </li>
      )
    })

    // const currentUserID = 1
    // const messages = this.state.messages.map((message, index) => {
    //   const messageClasses = classNames({
    //     'message-box__item': true,
    //     'message-box__item--from-current': message.from === currentUserID,
    //     'clear': true,
    //   })

    //   return (
    //       <li key={ message.timestamp + '-' + message.from } className={ messageClasses }>
    //         <div className='message-box__item__contents'>
    //           { message.contents }
    //         </div>
    //       </li>
    //     )
    // })

    // const lastMessage = this.state.messages[messagesLength - 1]

    // if (lastMessage.from === currentUserID) {
    //   if (this.state.lastAccess.recipient >= lastMessage.timestamp) {
    //     const date = Utils.getShortDate(lastMessage.timestamp)
    //     messages.push(
    //         <li key='read' className='message-box__item message-box__item--read'>
    //           <div className='message-box__item__contents'>
    //             Read { date }
    //           </div>
    //         </li>
    //       )
    //   }
    // }
    return (
        <div className='message-box'>
          <ul className='message-box__list'>
            {userMessages}
          </ul>
          <ReplyBox />
        </div>
      )
  }
}

export default MessagesBox
