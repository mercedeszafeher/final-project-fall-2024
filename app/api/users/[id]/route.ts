import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import {
  getUserBySessionToken,
  getUserWithPasswordHashById,
  updateUserById,
  updateUserPasswordById,
} from '../../../../database/users';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const userId = parseInt(params.id, 10);

  if (isNaN(userId)) {
    return NextResponse.json(
      { errors: [{ message: 'Invalid user ID' }] },
      { status: 400 },
    );
  }

  // Get the session token from cookies
  const cookieStore = cookies();
  const sessionToken = (await cookieStore).get('sessionToken')?.value;

  if (!sessionToken) {
    return NextResponse.json(
      { errors: [{ message: 'Unauthorized' }] },
      { status: 401 },
    );
  }

  // Get the logged-in user
  const loggedInUser = await getUserBySessionToken(sessionToken);

  if (!loggedInUser || loggedInUser.id !== userId) {
    return NextResponse.json(
      { errors: [{ message: 'Forbidden' }] },
      { status: 403 },
    );
  }

  // Parse JSON data from the request body
  const data = await request.json();

  // Destructure the necessary fields
  const {
    username,
    email,
    location,
    bio,
    profile_pic,
    currentPassword,
    newPassword,
    confirmNewPassword,
  } = data;

  // Handle password change if requested
  if (newPassword) {
    // Verify current password
    const userWithPassword = await getUserWithPasswordHashById(userId);

    if (!userWithPassword) {
      return NextResponse.json(
        { errors: [{ message: 'User not found' }] },
        { status: 404 },
      );
    }

    const isCurrentPasswordValid = await bcrypt.compare(
      currentPassword || '',
      userWithPassword.passwordHash,
    );

    if (!isCurrentPasswordValid) {
      return NextResponse.json(
        { errors: [{ message: 'Current password is incorrect' }] },
        { status: 400 },
      );
    }

    if (newPassword !== confirmNewPassword) {
      return NextResponse.json(
        { errors: [{ message: 'New passwords do not match' }] },
        { status: 400 },
      );
    }

    // Hash the new password
    const newPasswordHash = await bcrypt.hash(newPassword, 10);

    // Update the password in the database
    await updateUserPasswordById(userId, newPasswordHash);
  }

  // Update the user's profile information
  const updatedUser = await updateUserById(
    userId,
    username,
    email,
    profile_pic || null,
    location || null,
    bio || null,
  );

  if (!updatedUser) {
    return NextResponse.json(
      { errors: [{ message: 'User not found' }] },
      { status: 404 },
    );
  }

  return NextResponse.json({ user: updatedUser }, { status: 200 });
}
