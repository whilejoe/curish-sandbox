import React from 'react';
import styled from 'styled-components';
import StoryContainer from 'components/StoryContainer';
import Container from 'components/Container';

const Vista = styled.div`
  padding-top: 10vh;
  padding-bottom: 9vh;
  margin-bottom: 1.5rem;
  background-image: linear-gradient(to right, #3c2242 0%, #42283e 100%);
  color: #f9f9f9;
  text-align: center;
`;

const Headline = styled.h1`
  margin-top: 0;
  margin-bottom: 0.15em;
  color: currentColor;
  font-size: 1.65em;
`;

const About = () => {
  return (
    <div>
      <Vista>
        <Container>
          <Headline>How She Made Me Feel</Headline>
          <span>Author: @aristippus</span>
        </Container>
      </Vista>
      <StoryContainer>
        <p>
          Kay always thought this day would end up being the worst day of her life. Her mother
          finally kicked her out of their trailer, this time for good, after getting into a heated
          fight with one of her drunk boyfriends. She was in such a hurry to get out of there that
          she hardly had time to grab any of her things. All she had in the world were the clothes
          on her back and a backpack full of underwear, t-shirts, and make-up. She had almost no
          money either, just a few crumpled one dollar bills in the back pocket of her jean shorts.
        </p>
        <p>
          That is why she was hitchhiking along the interstate that afternoon, praying to God that
          someone would stop before it got dark. She had no idea where she wanted to go, just that
          she needed to get far away from the life she was leaving behind. Just when she was
          beginning to think no one would stop for her, an old Jeep slowed to a stop just a few
          yards ahead of her. Thinking it could take off at any moment, Kay ran toward it with her
          tired legs.
        </p>
        <h2>The Moment We Kissed</h2>
        <p>
          "Sweetie, what is a girl like you doing hitchhiking out in the middle of nowhere?" said a
          middle aged woman seated in the passenger seat of the Jeep. She was in such a hurry to get
          out of there that she hardly had time to grab any of her things. All she had in the world
          were the clothes on her back and a backpack full of underwear, t-shirts, and make-up.
        </p>
        <p>
          "Sweetie, what is a girl like you doing hitchhiking out in the middle of nowhere?" said a
          middle aged woman seated in the passenger seat of the Jeep.
        </p>
        <h3>Our Last Night</h3>
        <p>
          That is why she was hitchhiking along the interstate that afternoon, praying to God that
          someone would stop before it got dark. She had no idea where she wanted to go, just that
          she needed to get far away from the life she was leaving behind. Just when she was
          beginning to think no one would stop for her, an old Jeep slowed to a stop just a few
          yards ahead of her. Thinking it could take off at any moment, Kay ran toward it with her
          tired legs.
        </p>
      </StoryContainer>
    </div>
  );
};

export default About;
