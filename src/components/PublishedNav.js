import React from 'react';
import { Flex, FlexContent } from 'components/Flex';
import SubHeaderTitle from 'components/SubHeaderTitle';

const PublishedNav = ({ titleText }) => {
  return (
    <Flex align="center">
      <FlexContent space="self">
        <SubHeaderTitle>{titleText}</SubHeaderTitle>
      </FlexContent>
    </Flex>
  );
};

export default PublishedNav;
