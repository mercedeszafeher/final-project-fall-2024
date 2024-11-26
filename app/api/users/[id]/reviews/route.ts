import { type NextRequest, NextResponse } from 'next/server';
import { getReviewsByUserId } from '../../../../../database/reviews';

export async function GET(
  request: NextRequest,
  context: { params: { id: string } },
) {
  const { id } = context.params;
  const userId = parseInt(id, 10);

  if (isNaN(userId)) {
    return NextResponse.json(
      { errors: [{ message: 'Invalid user ID' }] },
      { status: 400 },
    );
  }

  const reviews = await getReviewsByUserId(userId);
  if (!reviews) {
    return NextResponse.json(
      { errors: [{ message: 'No reviews found for this user' }] },
      { status: 404 },
    );
  }

  return NextResponse.json({ reviews }, { status: 200 });
}
