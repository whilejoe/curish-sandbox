import styled from 'styled-components';
import { THEME, TERTIARY_KEY } from 'constants/theme';

export const UNSAVED = 'Unsaved Changes';
export const SAVING = 'Saving...';
export const SAVED = 'Saved';

const EditModeStatus = styled.span`
  display: inline-block;
  margin-right: 1.4em;
  color: ${props => (props.mode === SAVING ? THEME[TERTIARY_KEY] : '#a0a0a0')};
  font-size: 0.75em;
`;

export default EditModeStatus;
