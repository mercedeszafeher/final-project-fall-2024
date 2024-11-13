import type { Metadata } from 'next';
import { getUserInsecure } from '../../../database/users';

export async function generateMetadata({
  params,
}: {
  params: { username: string };
}): Promise<Metadata> {
  const singleUser = await getUserInsecure(params.username);

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

type Props = {
  params: Promise<{
    username: string;
  }>;
};

export default async function UserProfilePage(props: Props) {
  const { username } = await props.params;
  return (
    <div>
      <h2>{username}'s Profile</h2>
    </div>
  );
}
