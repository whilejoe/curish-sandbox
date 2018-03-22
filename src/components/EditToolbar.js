import React from 'react';
import styled from 'styled-components';
import Icon from 'components/Icon';
import { PALETTE } from 'constants/theme';

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
    background-color: ${PALETTE.GRAY.MEDIUM};
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
  </ToolBar>
);

export default EditToolbar;
