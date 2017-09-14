import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import AppFade from 'components/AppFade';
// import { gql, graphql } from 'react-apollo';
import FadeRoute from 'components/FadeRoute';
import { FlexApp, FlexMain, FlexHeader } from 'components/FlexApp';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import TutsAppHeader from 'components/TutsAppHeader';
// import AppHeader from 'components/AppHeader';
// import CreateStoryContainer from 'containers/CreateStoryContainer';
// import StoriesContainer from 'containers/StoriesContainer';
// import UserAuthContainer from 'containers/UserAuthContainer';
// import ProfileContainer from 'containers/ProfileContainer';
// import CreateProfileContainer from 'containers/CreateProfileContainer';
import LoginContainer from 'containers/LoginContainer';
import CreateUserContainer from 'containers/CreateUserContainer';
import Home from 'routes/Home';
import About from 'routes/About';
import Callback from 'routes/Callback';
import UserProfile from 'routes/UserProfile';
import NoMatch from 'routes/NoMatch';
import QuillEditor from 'components/QuillEditor';
// import Search from 'routes/Search';
// import Profile from 'routes/Profile';

class App extends Component {
  render() {
    return (
      <AppFade>
        <FlexApp>
          <FlexHeader>
            <TutsAppHeader />
          </FlexHeader>
          <Route
            children={props => {
              return (
                <TransitionGroup component={FlexMain}>
                  <Switch key={props.location.pathname} location={props.location}>
                    <FadeRoute exact path="/" component={Home} />
                    <FadeRoute path="/101" component={About} />
                    <FadeRoute path="/profile" component={UserProfile} />
                    <FadeRoute path="/write/:id?" component={QuillEditor} />
                    <FadeRoute path="/join" component={CreateUserContainer} />
                    <FadeRoute path="/login" component={LoginContainer} />
                    <FadeRoute path="/callback" component={Callback} />
                    <FadeRoute component={NoMatch} />
                  </Switch>
                </TransitionGroup>
              );
            }}
          />
        </FlexApp>
      </AppFade>
    );
  }
}

// export const USER_QUERY = gql`
// query UserQuery {
//   user {
//     id
//   }
// }
// `;

// export default graphql(ALL_LINKS_QUERY, { name: 'allLinksQuery' })(LinkList);

// const USER_QUERY = gql`
//   query {
//     user {
//       id
//     }
//   }
// `;

// export default graphql(USER_QUERY, { options: { fetchPolicy: 'network-only' } })(App);
export default App;
