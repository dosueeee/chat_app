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
      searchString: '',
    }
  }

  handleChange(e) {
    const searchString = e.target.value
    this.setState({
      searchString,
    })
    UserAction.searchUsers(searchString)
  }

  render() {
    const {searchString} = this.state
    return (
      <div className='search'>
        <form>
          <input
            type='text'
            className='search_form'
            value={searchString}
            onChange={this.handleChange.bind(this)}
            placeholder='ユーザー名で検索しよう'
          />
        </form>
        <UserList {...this.state} />
      </div>
    )
  }

}

export default searchForm
