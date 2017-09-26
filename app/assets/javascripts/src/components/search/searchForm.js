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

  // updateValue(e) {
  //   UserAction.searchUsers(e.target.value)
  //   this.setState({
  //     value: searchString,
  //   })
  // }

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
        <div className='header text-center'>
            <h1>Search</h1>
        </div>
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

    // render() {
    //   return (
    //     <div>
    //       <div className='header text-center'>
    //         <h1>Search</h1>
    //       </div>
    //       <form>
    //         <input
    //           type='text'
    //           value={this.state.value}
    //           onChange={this.updateValue.bind(this)}
    //           className='search_form_input'
    //           placeholder='Type Name!'
    //           name='fstr'
    //         />
    //       </form>
    //       <UserList />,
    //     </div>
    //     )
    // }
}

export default searchForm
