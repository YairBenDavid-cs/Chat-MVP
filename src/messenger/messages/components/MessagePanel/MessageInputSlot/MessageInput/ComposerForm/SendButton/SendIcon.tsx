import type { ReactElement } from 'react';

const SEND_ICON_PATH =
  'M12 3.5a1 1 0 0 1 .78.37l6 7a1 1 0 0 1-1.56 1.26L13 7.36V19a1 1 0 1 1-2 0'
  + 'V7.36l-4.22 4.77a1 1 0 1 1-1.56-1.26l6-7A1 1 0 0 1 12 3.5z';

export function SendIcon(): ReactElement {
  return (
    <svg
      className="send-button-icon"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      aria-hidden="true"
    >
      <path d={SEND_ICON_PATH} fill="currentColor" />
    </svg>
  );
}
