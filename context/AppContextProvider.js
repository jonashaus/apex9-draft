import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext({
  toasts: [],
  handleAddToast: () => {},
  handleRemoveToast: () => {},
});

export default function AppContextProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const handleAddToast = (colorScheme, text) => {
    const updatedToasts = [...toasts, { colorScheme, text, id: Math.random() }];
    setToasts(updatedToasts);
  };

  const handleRemoveToast = (id) => {
    const updatedToasts = [...toasts];
    updatedToasts.splice(id, 1);
    setToasts(updatedToasts);
  };

  const handleAutoRemoveToast = () => {
    return setTimeout(() => {
      handleRemoveToast(toasts.length - 1);
    }, 2000);
  };

  useEffect(() => {
    if (toasts?.length) {
      const timer = handleAutoRemoveToast();
      return () => {
        clearTimeout(timer);
      };
    }
  }, [toasts]);

  return (
    <AppContext.Provider value={{ toasts, handleAddToast, handleRemoveToast }}>
      {children}
    </AppContext.Provider>
  );
}
