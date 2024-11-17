import React from 'react';
import styles from './ContentContainer.module.scss';

interface ContentContainerProps {
  children: React.ReactNode;
  className?: string;
}

const ContentContainer: React.FC<ContentContainerProps> = ({
  children,
  className,
}) => {
  return (
    <div className={`${styles.contentContainer} ${className}`}>{children}</div>
  );
};

export default ContentContainer;
