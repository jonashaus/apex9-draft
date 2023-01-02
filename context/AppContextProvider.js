import React, { createContext, useState } from "react";

export const AppContext = createContext({
  toasts: [],
  handleAddToast: () => {},
  handleRemoveToast: () => {},
});

export const toastTypes = {
  success: (text) => ({ color: "success", text }),
  error: (text) => ({ color: "danger", text }),
};

export default function AppContextProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const handleAddToast = (newToast) => {
    const updatedToasts = [...toasts, newToast];
    setToasts(updatedToasts);
  };

  const handleRemoveToast = (toastIndex) => {
    const updatedToasts = [...toasts];
    updatedToasts.splice(toastIndex, 1);
    setToasts(updatedToasts);
  };

  return (
    <AppContext.Provider value={{ toasts, handleAddToast, handleRemoveToast }}>
      {children}
    </AppContext.Provider>
  );
}
