import React from 'react';
import { gql, graphql } from 'react-apollo';
import InputGroup from 'components/InputGroup';
import Button from 'components/Button';

class Tags extends React.Component {
  componentWillMount() {
    // if (this.props.storyTags) this.setState({ selectedTags: this.props.storyTags });
  }

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
    const { storyTags, data } = this.props;
    console.log('this.props', this.props);
    console.log('storyTags', storyTags);
    // const { selectedTags } = this.state;
    if (data.loading) return <p>loading...</p>;
    return (
      <form onSubmit={this.handleSubmit}>
        <InputGroup
          inputType="select"
          // currentCount={formTags ? formTags.length : 0}
          // countMax={5}
          id="tags"
          label="Add tags (up to 5)"
          model="publish.tags"
          multi
          valueKey="id"
          labelKey="key"
          // loading={data.loading}
          // defaultValue={storyTags && storyTags.length > 0 ? storyTags : null}
          options={data.allTags}
          clearable
          searchable
          validators={{ required: val => !val.length, length: val => val.length > 5 }}
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
