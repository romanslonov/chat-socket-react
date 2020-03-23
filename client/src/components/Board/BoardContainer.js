import { connect } from 'react-redux';
import Board from './Board';
import { getUserProfile } from '../../actions/user';

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});

const mapDispatchToProps = {
  getUserProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
