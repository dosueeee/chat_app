import keyMirror from 'keymirror'

export const ActionTypes = keyMirror({
  UPDATE_OPEN_CHAT_ID: null,
  SEND_MESSAGE: null,
  POST_MESSAGE: null,
  GET_MESSAGE: null,
  SEARCH_USERS: null,
})

export function CSRFToken() {
  return document.querySelector('meta[name="csrf-token"]').getAttribute('content')
}

const Root = window.location.origin || `${window.location.protocol}//${window.location.hostname}`
const APIRoot = `${Root}/api`
export const APIEndpoints = {
  MESSAGE: APIRoot,
  SEND_MESSAGE: APIRoot + '/messages',
  SEARCH_USERS: APIRoot + '/users/search',
}
