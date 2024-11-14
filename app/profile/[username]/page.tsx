import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import {
  getUserBySessionToken,
  getUserInsecure,
} from '../../../database/users';
import UserProfile from '../UserProfile';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>;
}): Promise<Metadata> {
  const { username } = await params;

  const singleUser = await getUserInsecure(username);

  if (!singleUser) {
    return {
      title: 'User Not Found',
      description: 'The user you are looking for does not exist.',
    };
  }

  return {
    title: `${singleUser.username}'s profile`,
    description: `This is ${singleUser.username}'s profile page.`,
  };
}

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  const cookieStore = cookies();
  const sessionToken = (await cookieStore).get('sessionToken')?.value;

  if (!sessionToken) {
    // Handle unauthenticated access
    return <div>Please log in to view this profile.</div>;
  }

  // Fetch the logged-in user based on the session token
  const loggedInUser = await getUserBySessionToken(sessionToken);

  if (!loggedInUser) {
    // Handle invalid session
    return <div>Session expired. Please log in again.</div>;
  }

  // Fetch the user profile data
  const singleUser = await getUserInsecure(username);

  if (!singleUser) {
    return <div>User not found</div>;
  }

  const isOwnProfile = loggedInUser.username === username;

  return <UserProfile user={singleUser} isOwnProfile={isOwnProfile} />;
}
