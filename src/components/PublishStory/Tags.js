import React from 'react';
import { graphql } from 'react-apollo';
import AllTagsOrderedQuery from 'graphql/AllTagsOrderedQuery.graphql';
import InputGroup from 'components/InputGroup';
import Button from 'components/Button';
import { Flex, FlexContent } from 'components/Flex';

const MAX_COUNT = 5;

class Tags extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmitCallback();
  };

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
        <Flex gutters justify={['space-between', { sm: 'flex-start' }]}>
          <FlexContent space="self">
            <Button type="button" theme="secondary">
              Back
            </Button>
          </FlexContent>
          <FlexContent space="self">
            <Button type="submit">Publish Story</Button>
          </FlexContent>
        </Flex>
      </form>
    );
  }
}

export default graphql(AllTagsOrderedQuery)(Tags);
