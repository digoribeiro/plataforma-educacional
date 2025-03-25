import { MouseEventHandler } from 'react';

interface GoogleButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

function GoogleButton({ onClick }: GoogleButtonProps) {
  return (
    <button onClick={onClick}
    className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.798-1.677-4.187-2.715-6.735-2.715-5.523 0-10 4.477-10 10s4.477 10 10 10c8.396 0 10-7.496 10-10 0-0.67-0.069-1.325-0.201-1.955h-9.799z" />
      </svg>
      Continuar com Google
    </button>
  );
}

export default GoogleButton;
