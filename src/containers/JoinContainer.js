import Join from 'routes/Join';
import { graphql, compose } from 'react-apollo';
import CreateUserMutation from 'graphql/CreateUserMutation.graphql';
import { connect } from 'react-redux';
import { getIdToken } from 'utils/AuthService';
import { submit } from 'abyss-form/lib/actions';

const mapStateToProps = state => ({
  profileForm: state.forms.profile.model
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  createUser: (email, fullName, userName) => {
    const { createUserMutation, userResult, history } = ownProps;
    dispatch(
      submit('profile', async () => {
        const idToken = getIdToken();
        await createUserMutation({
          variables: {
            idToken,
            fullName,
            userName,
            email
          }
        });
        // Refetch user query after create
        await userResult.refetch();
        history.push('/');
      })
    );
  }
});

export default compose(
  graphql(CreateUserMutation, { name: 'createUserMutation' }),
  connect(mapStateToProps, mapDispatchToProps)
)(Join);
