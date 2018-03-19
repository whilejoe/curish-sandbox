import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Button from 'components/Button';
import InputGroup from 'components/InputGroup';
import PageContainer from 'components/PageContainer';
import Container from 'components/Container';
import UserHome from 'routes/UserHome';
import { isAuthed } from 'utils/AuthService';

const Title = styled.h1`
  margin-top: 25vh;
  text-align: center;
`;

const SearchContainer = styled.div`
  max-width: 30rem;
  margin-right: auto;
  margin-left: auto;
  text-align: center;
`;

const Home = ({ userResult, searchModel, history }) => {
  if (!isAuthed()) {
    return (
      <PageContainer>
        <Container>
          <Title>Curious?</Title>
          <SearchContainer>
            <form
              onSubmit={e => {
                // temporary
                e.preventDefault();
                if (searchModel.param) {
                  history.push({
                    pathname: '/search',
                    search: `q=${searchModel.param}`
                  });
                }
              }}
            >
              <InputGroup type="text" placeholder="search curish" autoFocus model="search.param" />
              <Button type="submit">Search</Button>
            </form>
          </SearchContainer>
        </Container>
      </PageContainer>
    );
  }
  return <UserHome userResult={userResult} />;
};

const mapStateToProps = state => ({
  searchModel: state.forms.search.model
});

export default connect(mapStateToProps)(Home);
