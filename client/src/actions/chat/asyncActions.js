import actions from './actions'

export const chat = data =>
  async function thunk(...args) {
    const [dispatch] = args
    try {
      dispatch(actions.chat.receive(data))
    } catch (error) {
      dispatch(actions.chat.receive(error))
    }
  }
export const navToggle = data =>
  async function thunk(...args) {
    const [dispatch] = args
      dispatch(actions.navToggle(data))
  }