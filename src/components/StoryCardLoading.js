import React from 'react';
import Card from 'components/Card';
import 'styles/StoryCardLoading.css';

// TODO: Revisit
// Copied and modified from codepen
// Not happy with it
const StoryCardLoading = () => {
  return (
    <Card className="timeline-item">
      <div className="animated-background">
        <div className="background-masker header-right" />
        <div className="background-masker header-bottom" />
        <div className="background-masker subheader-right" />
        <div className="background-masker content-top" />
        <div className="background-masker content-first-end" />
        <div className="background-masker content-second-line" />
        <div className="background-masker content-second-end" />
      </div>
    </Card>
  );
};

export default StoryCardLoading;
