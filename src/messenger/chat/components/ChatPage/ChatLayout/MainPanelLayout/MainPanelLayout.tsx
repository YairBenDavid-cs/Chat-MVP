import type { ReactElement, ReactNode } from 'react';

export type MainPanelLayoutProps = {
  children: ReactNode;
};

export function MainPanelLayout({ children }: MainPanelLayoutProps): ReactElement {
  return <main className="chat-main-panel">{children}</main>;
}
