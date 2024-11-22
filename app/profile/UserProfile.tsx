'use client';

import React, { useEffect, useState } from 'react';
import type { User } from '../../database/users';
import styles from './UserProfile.module.scss';

type UserProfileProps = {
  user: User;
  isOwnProfile: boolean;
};

export default function UserProfile({
  user,
  isOwnProfile,
}: UserProfileProps): JSX.Element {
  const [isEditing, setIsEditing] = useState(false);
  const [email, setEmail] = useState(user.email);
  const [location, setLocation] = useState(user.location || '');
  const [bio, setBio] = useState(user.bio || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/users/${user.id}`, {
          method: 'GET',
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Failed to load user data:', errorData.errors);
          setErrors(errorData.errors.map((error: any) => error.message));
          return;
        }

        const data = await response.json();
        setEmail(data.user.email);
        setLocation(data.user.location);
        setBio(data.user.bio);
      } catch (error) {
        console.error('An error occurred while fetching user data:', error);
        setErrors(['Failed to load user data. Please try again later.']);
      }
    };
    fetchUserData();
  }, [user.id]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!isEditing) return;

    const updatedData: any = {
      email,
      location,
      bio,
    };

    if (newPassword) {
      updatedData.currentPassword = currentPassword;
      updatedData.newPassword = newPassword;
      updatedData.confirmNewPassword = confirmNewPassword;
    }

    setLoading(true);

    try {
      const response = await fetch(`/api/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors && Array.isArray(data.errors)) {
          setErrors(data.errors.map((error: any) => error.message));
        } else {
          setErrors(['An unknown error occurred.']);
        }
        setLoading(false);
        return;
      }

      // Update state with the updated user data
      setEmail(data.user.email);
      setLocation(data.user.location);
      setBio(data.user.bio);
      setIsEditing(false);
      setErrors([]);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('An error occurred while updating the profile:', error);
      setErrors(['Failed to update profile. Please try again later.']);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.profileContainer}>
      {user && (
        <div className={styles.profileCard}>
          <div className={styles.profileImageContainer}>
            <img
              src="/images/default-profile.png"
              alt="Default Profile"
              className={styles.profileImage}
            />
          </div>

          <div className={styles.profileInfo}>
            <h1 className={styles.profileHeader}>{user.username}'s Profile</h1>

            {!isEditing ? (
              <>
                <p className={styles.profileBio}>{bio}</p>
                <p className={styles.profileLocation}>
                  <strong>Location:</strong> {location}
                </p>
                <p className={styles.profileEmail}>
                  <strong>Email:</strong> {email}
                </p>

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
                  <label className={styles.formLabel}>Email:</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.formInput}
                    required
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

                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setErrors([]);
                  }}
                  className={styles.cancelButton}
                >
                  Cancel
                </button>
              </form>
            )}

            {errors.length > 0 && (
              <div className={styles.errors}>
                {errors.map((error, index) => (
                  <div key={index}>{error}</div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
