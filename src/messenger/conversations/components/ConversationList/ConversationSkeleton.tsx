import type { ReactElement, ReactNode } from 'react';

type SkeletonRowContainerProps = {
  children: ReactNode;
};

type SkeletonTextLineProps = {
  widthClass: string;
};

function SkeletonRowContainer({ children }: SkeletonRowContainerProps): ReactElement {
  return <div className="conversation-skeleton" aria-hidden="true">{children}</div>;
}

function SkeletonAvatar(): ReactElement {
  return <div className="skeleton skeleton-avatar" />;
}

function SkeletonTextLine({ widthClass }: SkeletonTextLineProps): ReactElement {
  return <div className={`skeleton skeleton-text ${widthClass}`} />;
}

function SkeletonTextLines(): ReactElement {
  return (
    <div className="skeleton-text-lines">
      <SkeletonTextLine widthClass="skeleton-text-name" />
      <SkeletonTextLine widthClass="skeleton-text-preview" />
    </div>
  );
}

export function ConversationSkeleton(): ReactElement {
  return (
    <SkeletonRowContainer>
      <SkeletonAvatar />
      <SkeletonTextLines />
    </SkeletonRowContainer>
  );
}
