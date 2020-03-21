import { connect } from 'react-redux';
import Sidebar from './Sidebar';
import { navToggle } from '../../actions/chat';

const mapStateToProps = state => ({
  rooms: state.chat.rooms,
  activeNav: state.chat.activeNav,
});

const mapDispatchToProps = {
  navToggle,
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
