import { connect } from 'react-redux';
import SignUp from './SignUp';
import { signUp } from '../../../actions/user';

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = {
  signUp,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
