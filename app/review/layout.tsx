import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Review',
  description: 'Write a Review about the desired Neighborhood.',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
