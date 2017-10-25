import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import InputGroup from 'components/InputGroup';
import Button from 'components/Button';
import { LATEST_TERMS_ID } from 'constants/terms';

const TermsContainer = styled.div`
  max-height: 15rem;
  margin-bottom: 1rem;
  padding: 0.8rem;
  font-size: 0.9em;
  border: 1px solid #eee;
  border-radius: 2px;
  overflow-y: auto;
`;

class Terms extends React.Component {
  componentWillMount() {
    // if (this.props.storyTags) this.setState({ selectedTags: this.props.storyTags });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmitCallback();
  };

  render() {
    const { publishTerms } = this.props;
    if (publishTerms.loading) return <p>loading...</p>;
    return (
      <form onSubmit={this.handleSubmit}>
        <TermsContainer>{publishTerms.Terms.copy}</TermsContainer>
        <InputGroup
          inputType="checkbox"
          id="terms"
          label="I Agree"
          hideLabel
          model="publish.terms"
          validators={{ required: val => !val }}
          errorMessages={{ required: 'Agreement required' }}
        />
        <Button type="button" theme="secondary">
          Back
        </Button>
        <Button type="submit">Publish</Button>
      </form>
    );
  }
}

const TERMS_QUERY = gql`
  query termsQuery($termsId: ID!) {
    Terms(id: $termsId) {
      id
      version
      copy
    }
  }
`;

export default graphql(TERMS_QUERY, {
  name: 'publishTerms',
  options: () => ({ variables: { termsId: LATEST_TERMS_ID } })
})(Terms);
