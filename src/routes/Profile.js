import React from 'react';
import Container from 'components/Container';
import ProfileHeader from 'components/ProfileHeader';
import ProfileStoryList from 'components/ProfileStoryList';
import NoMatch from 'routes/NoMatch';

const Profile = ({ profile: { loading, User }, location }) => {
  if (loading) return <Container>Loading...</Container>;
  // Since userName is a param on the root url
  // we catch the no match here.
  if (!User) return <NoMatch location={location} />;
  const { stories } = User;
  return (
    <div>
      <ProfileHeader user={User} />
      <Container>
        <h2>Stories</h2>
        {stories.map(story => (
          <ProfileStoryList key={story.id} story={story} referrer={location} />
        ))}
      </Container>
    </div>
  );
};

export default Profile;
