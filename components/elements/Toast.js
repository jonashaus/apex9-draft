const Toast = ({ colorScheme, text, onDismiss }) => {
  return (
    <div className="toast-container position-fixed bottom-0 end-0 p-3">
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
          ></button>
        </div>
      </div>
    </div>
  );
};

export default Toast;
