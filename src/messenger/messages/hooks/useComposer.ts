import {
  useState,
  type ChangeEvent,
  type FormEvent,
  type KeyboardEvent,
} from 'react';

export type UseComposerParams = {
  onSend: (text: string) => void;
  disabled?: boolean;
};

export type UseComposerResult = {
  text: string;
  canSend: boolean;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  handleChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  handleKeyDown: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
};

export function useComposer({
  onSend,
  disabled = false,
}: UseComposerParams): UseComposerResult {
  const [text, setText] = useState<string>('');
  const trimmed = text.trim();
  const canSend = !disabled && trimmed.length > 0;

  function submit(): void {
    if (!canSend) {
      return;
    }
    onSend(trimmed);
    setText('');
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    submit();
  }

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>): void {
    setText(event.target.value);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      submit();
    }
  }

  return {
    text,
    canSend,
    handleSubmit,
    handleChange,
    handleKeyDown,
  };
}
