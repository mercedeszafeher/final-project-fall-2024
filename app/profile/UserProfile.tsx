'use client';

import React from 'react';

type UserProfileProps = {
  user: {
    username: string;
  };
};

export default function UserProfile({ user }: UserProfileProps) {
  return (
    <div>
      <h2>{user.username}'s Profile</h2>
      {/* Add interactive elements here */}
    </div>
  );
}
