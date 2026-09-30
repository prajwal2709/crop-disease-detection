import React, { createContext, useState } from "react";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Stores crop prediction data
  const [predictionData, setPredictionData] = useState(null);

  const openChat = (prediction = null) => {
    setPredictionData(prediction);
    setIsOpen(true);
  };

  const closeChat = () => {
    setIsOpen(false);
  };

  return (
    <ChatContext.Provider
      value={{
        isOpen,
        openChat,
        closeChat,
        predictionData,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};