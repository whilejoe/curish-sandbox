import React from 'react';
import Container from 'components/Container';
import ProfileHeader from 'components/ProfileHeader';
import ProfileStoryList from 'components/ProfileStoryList';
import NoMatch from 'routes/NoMatch';

const Profile = ({ profile: { loading, User }, location }) => {
  if (loading) return <Container>Loading...</Container>;
  console.log('User', User);
  if (!User) {
    // Since userName is a param on the root url
    // we catch the no match here.
    return <NoMatch location={location} />;
  }
  const { createdAt, stories } = User;
  const joinedDate = new Date(createdAt).getFullYear();
  return (
    <div>
      <ProfileHeader user={User} />
      <Container>
        <p>Joined: {joinedDate}</p>
        <h2>Stories</h2>
        {stories.map(story => (
          <ProfileStoryList key={story.id} story={story} referrer={location} />
        ))}
      </Container>
    </div>
  );
};

export default Profile;
