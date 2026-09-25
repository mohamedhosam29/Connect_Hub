import React, { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUserProfile, toggleFollow } from "../slices/userslice";
import { getPosts } from "../slices/postslice";
import { addNotification } from "../slices/notificationslice";
import PostCard from "../components/postcard";
import ProfileHeader from "../components/profileheader";
import LoadingSpinner from "../components/loadingspinner";
import ErrorMessage from "../components/errormessage";

const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { profileUser: fetchedUser, isOwnProfile: fetchedIsOwn, followMap, loading, error } = useSelector((state) => state.users);
  const { user: currentUser } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getUserProfile({ userId: id, currentUserId: currentUser?.id }));
    if (posts.length === 0) {
      dispatch(getPosts());
    }
  }, [dispatch, id, posts.length, currentUser]);

  const profileUser = fetchedIsOwn ? currentUser : fetchedUser;

  const userPosts = posts.filter((p) => p.userId === Number(id));
  const isFollowing = !!followMap[id];

  const baseFollowers = useMemo(() => Math.floor(Math.random() * 50), [id]);
  const followerCount = baseFollowers + (isFollowing ? 1 : 0);
  const followingCount = useMemo(() => Math.floor(Math.random() * 50), [id]);

  const handleFollow = () => {
    dispatch(toggleFollow(id));
    if (!isFollowing) {
      dispatch(addNotification(`You started following ${profileUser.name}.`));
    }
  };

  if (!fetchedIsOwn && loading) return <LoadingSpinner text="Loading profile..." />;
  if (!fetchedIsOwn && error) return <ErrorMessage message={error} />;
  if (!profileUser) return null;

  return (
    <div className="page-container">
      <ProfileHeader
        user={profileUser}
        followerCount={followerCount}
        followingCount={followingCount}
        isOwnProfile={fetchedIsOwn}
        isFollowing={isFollowing}
        onFollowToggle={handleFollow}
      />

      <hr style={{ margin: "20px 0" }} />

      <h4>Posts</h4>
      {userPosts.length === 0 && <p className="empty-text">No posts yet.</p>}
      {userPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Profile;