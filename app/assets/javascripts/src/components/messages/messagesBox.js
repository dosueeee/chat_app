import React from 'react'
import classNames from 'classNames'
// 不要なコメントアウトはコードの可読性と保守性を下げるため、削除する
// 必要はコメントアウトは、
// TODO: 〇〇, NOTE: 〇〇, FIXME: 〇〇のように書くと、後から見返したときに便利
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
            {message.image ? <img className='image-message' src={`/message_images/${message.image}`} /> : message.contents}
          </div>
        </li>
      )
    })

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
