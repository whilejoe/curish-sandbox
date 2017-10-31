import React from 'react';
import styled from 'styled-components';
import Icon from 'components/Icon';
import { rgba, darken, lighten } from 'polished';
// import { THEME, PRIMARY_KEY } from 'constants/theme';

// const CustomButton = () => <span className="octicon octicon-star">*</span>;

const COLOR = 'royalBlue';

const ToolBar = styled.div`
  position: fixed;
  right: 0.8rem;
  top: 8rem;
  opacity: ${props => (props.show ? '1' : '0')};
  border-radius: 2px;
  border: 1px solid ${lighten(0.05, COLOR)};
  box-shadow: -1px 1px 8px 0px ${rgba(COLOR, 0.2)};
  transition: opacity 80ms linear;
  z-index: 2;
`;

const FormatButton = styled.button`
  display: block;
  padding: 0.5rem 0.35rem;
  background-color: ${rgba(COLOR, 0.95)};
  color: white;

  &:not(:last-child) {
    border-bottom: 1px solid ${lighten(0.05, COLOR)};
  }

  &:hover {
    background-color: ${darken(0.1, COLOR)};
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
