import styled from 'styled-components';
import FadeIn from 'components/FadeIn';
import { CROSS_FADE_DURATION } from 'constants/animation';

const CrossFade = styled(FadeIn).attrs({
  // Change default transition duration in FadeIn component
  duration: CROSS_FADE_DURATION
})`
	position: absolute;
  width: 100%;
`;

export default CrossFade;
