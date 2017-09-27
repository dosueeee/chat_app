import React from 'react'
import _ from 'lodash'
import MessagesStore from '../../stores/messages'
import UserList from './userList'
import MessagesBox from './messagesBox'

class App extends React.Component {

  constructor(props) {
  	super(props)
  	this.state = this.initialState
  	this.onChangeHandler = this.onStoreChange.bind(this)
  }

  get initialState() {
  	return this.getStateFromStores()
  }

  getStateFromStores() {
  	const openChatId = MessagesStore.getOpenChatUserId()
  	const users = MessagesStore.getUserMessages()
  	const openUserMessages = users.messages ? users.messages : []
    const allMessages = _.concat(openUserMessages)
    const messages = _.sortBy(allMessages, (message) => { return message.created_at })
// debugger
  	return {
      messages,
  	}
  }

  componentDidMount() {
  	MessagesStore.onChange(this.onChangeHandler)
  }

  componentWillUnmount() {
    MessagesStore.offChange(this.onChangeHandler)
  }

  onStoreChange() {
  	this.setState(this.getStateFromStores())
  }

  render() {
    return (
        <div className='app'>
          <UserList />
          <MessagesBox {...this.state}/>
        </div>
      )
  }
}

export default App
