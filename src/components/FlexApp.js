import styled from 'styled-components';

export const FlexApp = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const FlexHeight = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`;

export const FlexMain = styled.div`
  flex: 1 0 auto;
  width: 100%;
`;

export const FlexHeightMain = styled.div`
  flex: 1 0 auto;
  width: 100%;
  height: 1px;
  overflow-y: auto;
`;

export const FlexHeader = styled.div`
  flex: none;
`;

export const FlexFooter = styled.div`
  flex: none;
`;
