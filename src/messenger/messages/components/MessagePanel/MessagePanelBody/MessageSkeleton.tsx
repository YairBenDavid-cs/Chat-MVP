import type { ReactElement, ReactNode } from 'react';

type SkeletonAlignment = 'left' | 'right';

type SkeletonBubbleProps = {
  alignment: SkeletonAlignment;
  widthClass: string;
};

type SkeletonContainerProps = {
  children: ReactNode;
};

function SkeletonContainer({ children }: SkeletonContainerProps): ReactElement {
  return <div className="message-skeleton" aria-hidden="true">{children}</div>;
}

function SkeletonBubble({ alignment, widthClass }: SkeletonBubbleProps): ReactElement {
  return (
    <div className={`skeleton skeleton-bubble skeleton-bubble-${alignment} ${widthClass}`} />
  );
}

function MessageSkeletonBubbles(): ReactElement {
  return (
    <>
      <SkeletonBubble alignment="left" widthClass="skeleton-bubble-wide" />
      <SkeletonBubble alignment="right" widthClass="skeleton-bubble-narrow" />
      <SkeletonBubble alignment="left" widthClass="skeleton-bubble-medium" />
      <SkeletonBubble alignment="right" widthClass="skeleton-bubble-wide" />
      <SkeletonBubble alignment="left" widthClass="skeleton-bubble-narrow" />
    </>
  );
}

export function MessageSkeleton(): ReactElement {
  return (
    <SkeletonContainer>
      <MessageSkeletonBubbles />
    </SkeletonContainer>
  );
}
