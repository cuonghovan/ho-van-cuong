import { FC } from "react";

interface SwitchButtonProps {
  onClick: () => void;
}

const SwitchButton: FC<SwitchButtonProps> = ({ onClick }) => {
  return (
    <button type="button" onClick={onClick} className="flex justify-center my-4" aria-label="Switch balance view">
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
      </svg>
    </button>
  );
};

export default SwitchButton;