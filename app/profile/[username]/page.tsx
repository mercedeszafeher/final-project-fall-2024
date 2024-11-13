// page.tsx
// page.tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getUserInsecure } from '../../../database/users';
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

export default async function UserProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  const singleUser = await getUserInsecure(username);

  if (!singleUser) {
    return <div>User not found</div>;
  }

  return <UserProfile user={singleUser} />;
}
