import { connect } from 'react-redux'
import Chat from './Chat'

const mapStateToProps = state => ({
    rooms: state.chat.rooms
})

const mapDispatchToProps = {

}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat)
