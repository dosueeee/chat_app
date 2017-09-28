import keyMirror from 'keymirror'

export const ActionTypes = keyMirror({
  UPDATE_OPEN_CHAT_ID: null,
  SEND_MESSAGE: null,
  // POST_MESSAGE: null,
  GET_MESSAGES: null,
  SAVE_IMAGE_CHAT: null,
  
  SEARCH_USERS: null,
  LOAD_USERS: null,
  LOAD_CURRENT_USER: null,
  CREATE_FRIENDSHIPS: null,
})

export function CSRFToken() {
  return document.querySelector('meta[name="csrf-token"]').getAttribute('content')
}

const Root = window.location.origin || `${window.location.protocol}//${window.location.hostname}`
const APIRoot = `${Root}/api`
export const APIEndpoints = {
  MESSAGE: APIRoot,
  SEND_MESSAGE: APIRoot + '/messages',
  USERS: APIRoot + '/users',
  SEARCH_USERS: APIRoot + '/users/search',
  CREATE_FRIENDSHIPS: APIRoot + '/friendships',
  CURRENT_USER: APIRoot + '/current_user',
}
