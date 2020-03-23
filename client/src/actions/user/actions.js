import { createActions } from 'redux-actions'

const prefix = 'USER'

const actionMap = {
  SIGN_IN: {
    REQUEST: null,
    RECEIVE: null,
    ERROR: null
  },
  SIGN_UP: {
    REQUEST: null,
  },
  GET_USER_PROFILE: {
    REQUEST: null,
    RECEIVE: null,
    ERROR: null
  }
}

export default createActions(actionMap, { prefix })
