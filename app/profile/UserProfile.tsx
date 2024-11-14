'use client';

import React, { useState } from 'react';
import type { User } from '../../database/users';
import styles from './UserProfile.module.scss';

type UserProfileProps = {
  user: User;
  isOwnProfile: boolean;
};

export default function UserProfile({ user, isOwnProfile }: UserProfileProps) {
  if (!isOwnProfile) {
    return (
      <div className={styles.profileContainer}>
        <header className={styles.profileHeader}>
          <h1 className={styles.profileTitle}>{user.username}'s Profile</h1>
        </header>
        <div className={styles.profileContent}>
          <div className={styles.leftSection}>
            {user.profile_pic ? (
              <img
                src={user.profile_pic}
                alt="Profile Picture"
                className={styles.profileImage}
              />
            ) : (
              <div className={styles.profilePicture}>No Picture</div>
            )}
          </div>
          <div className={styles.rightSection}>
            <p>
              <strong>Location:</strong> {user.location}
            </p>
            <p>
              <strong>Bio:</strong> {user.bio}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [location, setLocation] = useState(user.location || '');
  const [bio, setBio] = useState(user.bio || '');
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const updatedData = {
      username,
      email,
      location,
      bio,
      profile_pic: profilePic,
      currentPassword,
      newPassword,
      confirmNewPassword,
    };

    const response = await fetch(`/api/users/${user.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });

    const data = await response.json();

    if (!response.ok) {
      setErrors(data.errors.map((error: any) => error.message));
    } else {
      alert('Profile updated successfully!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.profileContainer}>
      {errors.length > 0 && (
        <div className={styles.errors}>
          {errors.map((error) => (
            <div key={error}>{error}</div>
          ))}
        </div>
      )}

      <header className={styles.profileHeader}>
        <h1 className={styles.profileTitle}>{user.username}'s Profile</h1>
      </header>

      <div className={styles.profileContent}>
        <div className={styles.leftSection}>
          <div className={styles.profilePicture}>
            {user.profile_pic ? (
              <img
                src={user.profile_pic}
                alt="Profile Picture"
                className={styles.profileImage}
              />
            ) : (
              <div className={styles.profileImage}>No Picture</div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const files = e.target.files;
                if (files && files.length > 0) {
                  setProfilePic(files[0]);
                } else {
                  setProfilePic(null);
                }
              }}
              className={styles.profilePictureInput}
            />
          </div>
        </div>

        <div className={styles.rightSection}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={styles.formInput}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Location:</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className={styles.formInput}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Bio:</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className={styles.formTextarea}
            ></textarea>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.formInput}
            />
          </div>

          {/* Password Change */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Current Password:</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className={styles.formInput}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>New Password:</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={styles.formInput}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Confirm New Password:</label>
            <input
              type="password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              className={styles.formInput}
            />
          </div>

          <button type="submit" className={styles.submitButton}>
            Update Profile
          </button>
        </div>
      </div>
    </form>
  );
}
