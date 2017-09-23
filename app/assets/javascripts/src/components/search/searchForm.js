import React from 'react'
import UserAction from '../../actions/user'
import UserList from '../../components/search/userList'

class searchForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.initialState
  }

  get initialState() {
    return {
      value: '',
    }
  }

  updateValue(e) {
    UserAction.searchUsers(e.target.value)
    this.setState({
      value: e.target.value,
    })
  }
    render() {
      return (
        <div>
          <div className='header text-center'>
            <h1>Search</h1>
          </div>
          <form>
            <input
              type='text'
              value={this.state.value}
              onChange={this.updateValue.bind(this)}
              className='search_form_input'
              placeholder='Type Name!'
              name='fstr'
            />
          </form>
          <UserList />,
        </div>
        )
    }
}

export default searchForm
