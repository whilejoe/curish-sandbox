import React from 'react';
import styled from 'styled-components';
import Icon from 'components/Icon';

// const CustomButton = () => <span className="octicon octicon-star">*</span>;
const SPACING = '0.4rem';

const ToolBar = styled.div`
  margin-right: -${SPACING};
  margin-left: -${SPACING};
  white-space: nowrap;
`;

const FormatButton = styled.button`
  display: inline-block;
  padding: 0.15rem ${SPACING};
  color: inherit;
  border-radius: 4px;

  &:hover {
    background-color: #f1f1f1;
  }
`;

const EditToolbar = ({ id, show }) => (
  <ToolBar id={id} show={show}>
    <FormatButton className="ql-header" value="2" type="button">
      <Icon type="formatHeader" title="format h2" />
    </FormatButton>
    <FormatButton className="ql-blockquote" type="button">
      <Icon type="formatQuote" title="format blockquote" />
    </FormatButton>
    <FormatButton className="ql-clean" type="button">
      <Icon type="formatClean" title="clean formatting" />
    </FormatButton>
    {/* <button className="ql-insertStar">
      <CustomButton />
    </button> */}
  </ToolBar>
);

export default EditToolbar;
