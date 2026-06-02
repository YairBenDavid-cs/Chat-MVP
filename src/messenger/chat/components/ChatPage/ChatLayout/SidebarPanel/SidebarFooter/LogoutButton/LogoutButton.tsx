import type { ReactElement } from 'react';

export type LogoutButtonProps = {
  onClick: () => void;
};

export function LogoutButton({ onClick }: LogoutButtonProps): ReactElement {
  return (
    <button className="logout-button" type="button" onClick={onClick}>
      Logout
    </button>
  );
}
