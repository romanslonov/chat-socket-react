import { createActions } from 'redux-actions'

const prefix = 'CHAT'

const actionMap = {
  CHAT: {
    REQUEST: null,
    RECEIVE: null
  },
  NAV_TOGGLE: null,
}

export default createActions(actionMap, { prefix })
