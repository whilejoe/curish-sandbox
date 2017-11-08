import styled from 'styled-components';
import { THEME, SECONDARY_KEY } from 'constants/theme';

export const UNSAVED = 'Unsaved Changes';
export const SAVING = 'Saving...';
export const SAVED = 'Saved';

const EditModeStatus = styled.span`
  display: inline-block;
  margin-right: 0.4em;
  color: ${props => (props.mode === SAVING ? THEME[SECONDARY_KEY] : '#b4b4b4')};
  font-size: 0.75em;
`;

export default EditModeStatus;
