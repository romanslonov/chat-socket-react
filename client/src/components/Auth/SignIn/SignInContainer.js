import { connect } from 'react-redux';
import SignIn from './SignIn';
import { signIn } from '../../../actions/user';

const mapStateToProps = state => ({
  store: state, 
  user: state.user
});

const mapDispatchToProps = {
  signIn,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
