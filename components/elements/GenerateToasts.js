import { useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContextProvider";

const Toast = ({ colorScheme, text, onDismiss, toastIndex }) => {
  const { handleRemoveToast } = useContext(AppContext);

  const handleAutoClose = () => {
    const timer = setTimeout(() => {
      handleRemoveToast(toastIndex);
    }, 3000);

    return timer;
  };

  useEffect(() => {
    const timer = handleAutoClose();

    () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      className={`toast show align-items-center text-bg-${colorScheme} border-0`}
      data-bs-autohide="true"
      data-bs-delay="1000"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div className="d-flex">
        <div className="toast-body">{text}</div>
        <button
          type="button"
          className="btn-close btn-close-white me-2 m-auto"
          aria-label="Close"
          onClick={onDismiss}
        />
      </div>
    </div>
  );
};

const GenerateToasts = () => {
  const { toasts, handleRemoveToast } = useContext(AppContext);

  return (
    <div className="toast-container position-fixed bottom-0 end-0 p-3">
      {toasts.map((toast, i) => (
        <Toast
          key={`toast_${i}`}
          toastIndex={i}
          colorScheme={toast.color}
          text={toast.text}
          onDismiss={() => handleRemoveToast(i)}
        />
      ))}
    </div>
  );
};

export default GenerateToasts;
