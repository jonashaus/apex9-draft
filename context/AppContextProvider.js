import React, { createContext, useState } from "react";

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

  return (
    <AppContext.Provider value={{ toasts, handleAddToast, handleRemoveToast }}>
      {children}
    </AppContext.Provider>
  );
}
