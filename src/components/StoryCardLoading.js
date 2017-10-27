import React from 'react';
import 'styles/StoryCardLoading.css';

const StoryCardLoading = () => {
  return (
    <div className="timeline-item">
      <div className="animated-background">
        <div className="background-masker header-right" />
        <div className="background-masker header-bottom" />
        <div className="background-masker subheader-right" />
        <div className="background-masker content-top" />
        <div className="background-masker content-first-end" />
        <div className="background-masker content-second-line" />
        <div className="background-masker content-second-end" />
      </div>
    </div>
  );
};

export default StoryCardLoading;
