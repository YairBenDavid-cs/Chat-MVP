import type { ReactElement } from 'react';

export type StatusPanelProps = {
  className: string;
  message: string;
  icon?: string;
};

export function StatusPanel({ className, message, icon }: StatusPanelProps): ReactElement {
  return (
    <div className={className} role="status">
      {icon !== undefined && (
        <span className="status-panel-icon" aria-hidden="true">
          {icon}
        </span>
      )}
      <p className="status-panel-message">{message}</p>
    </div>
  );
}
