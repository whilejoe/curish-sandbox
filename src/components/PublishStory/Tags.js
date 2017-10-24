import React from 'react';
import { gql, graphql } from 'react-apollo';
import InputGroup from 'components/InputGroup';
import Button from 'components/Button';

const MAX_COUNT = 5;

class Tags extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmitCallback();
  };

  // executeSearch = async queryString => {
  //   // this.props.setSearchForm(queryString);
  //   const result = await this.props.client.query({
  //     query: ALL_TAGS_SEARCH_QUERY,
  //     variables: { tags: queryString }
  //   });
  //   console.log('tags search result', result);
  // };

  render() {
    const { data, formTags } = this.props;
    if (data.loading) return <p>loading...</p>;
    return (
      <form onSubmit={this.handleSubmit}>
        <InputGroup
          inputType="select"
          currentCount={formTags ? formTags.length : 0}
          countMax={MAX_COUNT}
          id="tags"
          placeholder="Search and Select Tags"
          label={`Categorize your story in ${MAX_COUNT} tags or less`}
          labelLarge
          model="publish.tags"
          multi
          valueKey="id"
          labelKey="key"
          // loading={data.loading}
          // defaultValue={storyTags && storyTags.length > 0 ? storyTags : null}
          options={data.allTags}
          clearable
          searchable
          validators={{ required: val => !val.length, length: val => val.length > MAX_COUNT }}
          errorMessages={{
            required: 'Tags are required',
            length: 'Too many tags :('
          }}
        />
        <Button type="button" theme="secondary">
          Back
        </Button>
        <Button type="submit">Next</Button>
      </form>
    );
  }
}

// const ALL_TAGS_SEARCH_QUERY = gql`
// query AllTagsSearchQuery($searchText: String!) {
//   allTags(
//     filter: { key_starts_with: $searchText }}
//   ) {
//     id
//     key
//   }
// }
// `;

const ALL_TAGS_QUERY = gql`
  query AllTagsQuery {
    allTags {
      id
      key
    }
  }
`;

export default graphql(ALL_TAGS_QUERY)(Tags);
// export default withApollo(Tags);
