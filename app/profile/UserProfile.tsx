'use client';

import React, { useEffect, useState } from 'react';
import type { User } from '../../database/users';
import styles from './UserProfile.module.scss';

type UserProfileProps = {
  user: User;
  isOwnProfile: boolean;
};

export default function UserProfile({ user, isOwnProfile }: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch(`/api/users/${user.id}`);
      const data = await response.json();

      if (response.ok) {
        setEmail(data.user.email);
        setLocation(data.user.location);
        setBio(data.user.bio);
      } else {
        console.error('Failed to load user data:', data.error);
      }
    };
    fetchUserData();
  }, [user.id]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const updatedData = {
      email: email || user.email,
      location,
      bio,
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

    if (response.ok) {
      const data = await response.json();
      setEmail(data.user.email);
      setLocation(data.user.location);
      setBio(data.user.bio);
      setIsEditing(false);
      setErrors([]);
    } else {
      const data = await response.json();
      setErrors(data.errors.map((error: any) => error.message));
    }
  };

  return (
    <div className={styles.profileContainer}>
      {user && (
        <div className={styles.profileCard}>
          <div className={styles.profileImageContainer}>
            {user.profile_pic ? (
              <img
                src={user.profile_pic}
                alt="Profile Picture"
                className={styles.profileImage}
              />
            ) : (
              <div className={styles.noProfileImage}>No Picture</div>
            )}
          </div>

          <div className={styles.profileInfo}>
            <h1 className={styles.profileHeader}>{user.username}</h1>

            {!isEditing ? (
              <>
                <p className={styles.profileBio}>{bio}</p>
                <p className={styles.profileLocation}>{location}</p>
                <p className={styles.profileEmail}>{email}</p>

                {isOwnProfile && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className={styles.actionButton}
                  >
                    Edit Profile
                  </button>
                )}
              </>
            ) : (
              <form onSubmit={handleSubmit} className={styles.editProfileForm}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Bio:</label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className={styles.formTextarea}
                  ></textarea>
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
                  <label className={styles.formLabel}>Email:</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.formInput}
                  />
                </div>

                {/* Password Change Fields */}
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
                  <label className={styles.formLabel}>
                    Confirm New Password:
                  </label>
                  <input
                    type="password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    className={styles.formInput}
                  />
                </div>

                <button type="submit" className={styles.actionButton}>
                  Save Changes
                </button>

                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className={styles.cancelButton}
                >
                  Cancel
                </button>
              </form>
            )}

            {errors.length > 0 && (
              <div className={styles.errors}>
                {errors.map((error) => (
                  <div key={error}>{error}</div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
