import styled from 'styled-components';
import { rgba } from 'polished';
import { THEME, SECONDARY_KEY } from 'constants/theme';

export const UNSAVED = 'unsaved changes';
export const SAVING = 'saving...';
export const SAVED = 'saved';

const EditModeStatus = styled.div`
  position: absolute;
  top: 50%;
  right: 0;
  padding: 0.1em 0.6em;
  background: ${rgba('#efefef', 0.6)};
  color: ${props => (props.mode === SAVING ? THEME[SECONDARY_KEY] : 'currentColor')};
  font-size: 0.75em;
  white-space: nowrap;
  border: 1px solid #e9e9e9;
  border-radius: 1em;
  transform: translateY(-45%);
`;

export default EditModeStatus;
