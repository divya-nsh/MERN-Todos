import { WarningCircle } from "@phosphor-icons/react";

interface AlertProps {
  type: "error";
  message?: string | null;
  onClose?: () => void;
  className?: string;
}

export default function Alert({ message, className, onClose }: AlertProps) {
  return (
    message && (
      <div
        className={
          "flex animate-fadeIn-0.4 items-center gap-3 rounded-md bg-red-500 px-3 py-2 text-[0.9rem] text-white dark:bg-red-600" +
          className
        }
        role="alert"
      >
        <WarningCircle size={25} color="white" />
        <span>{message}</span>
        {/* Close button */}
        <button
          hidden={!onClose}
          type="button"
          onClick={() => {
            onClose?.();
          }}
          className="ml-auto text-white hover:font-bold hover:text-gray-200"
        >
          ✕
        </button>
      </div>
    )
  );
}
