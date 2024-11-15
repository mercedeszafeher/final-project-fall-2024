import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import {
  getUserById,
  getUserBySessionToken,
  getUserWithPasswordHashById,
  updateUserById,
  updateUserPasswordById,
} from '../../../../database/users';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    const userId = parseInt(id, 10);

    if (isNaN(userId)) {
      return NextResponse.json(
        { errors: [{ message: 'Invalid user ID' }] },
        { status: 400 },
      );
    }

    // Fetch the user by ID
    const user = await getUserById(userId);

    if (!user) {
      return NextResponse.json(
        { errors: [{ message: 'User not found' }] },
        { status: 404 },
      );
    }

    // Return the user data
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error('Error in GET /api/users/[id]:', error);
    return NextResponse.json(
      { errors: [{ message: 'Internal Server Error' }] },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    const userId = parseInt(id, 10);

    if (isNaN(userId)) {
      return NextResponse.json(
        { errors: [{ message: 'Invalid user ID' }] },
        { status: 400 },
      );
    }

    // Get the session token from cookies
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('sessionToken')?.value;

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
    let data;
    try {
      data = await request.json();
    } catch (error) {
      return NextResponse.json(
        { errors: [{ message: 'Invalid JSON in request body' }] },
        { status: 400 },
      );
    }

    // Destructure the necessary fields, excluding 'profile_pic'
    const {
      username,
      email,
      location,
      bio,
      currentPassword,
      newPassword,
      confirmNewPassword,
    } = data;

    // Get the current user data
    const existingUser = await getUserById(userId);

    if (!existingUser) {
      return NextResponse.json(
        { errors: [{ message: 'User not found' }] },
        { status: 404 },
      );
    }

    // Handle password change if requested
    if (newPassword) {
      if (!currentPassword) {
        return NextResponse.json(
          {
            errors: [
              { message: 'Current password is required to change password' },
            ],
          },
          { status: 400 },
        );
      }

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

    // Update the user's profile information, excluding 'profile_pic'
    const updatedUser = await updateUserById(
      userId,
      username ?? existingUser.username,
      email ?? existingUser.email,
      location ?? existingUser.location,
      bio ?? existingUser.bio,
    );

    if (!updatedUser) {
      return NextResponse.json(
        { errors: [{ message: 'Failed to update user' }] },
        { status: 500 },
      );
    }

    return NextResponse.json({ user: updatedUser }, { status: 200 });
  } catch (error) {
    console.error('Error in PUT /api/users/[id]:', error);
    return NextResponse.json(
      { errors: [{ message: 'Internal Server Error' }] },
      { status: 500 },
    );
  }
}
