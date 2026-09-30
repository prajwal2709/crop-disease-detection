import { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

import { ChatContext } from "../context/ChatContext";
import { API_BASE_URL } from "../config";
import { useTranslation } from "../context/LanguageContext";

function AIChatbot() {

  const {
    isOpen,
    openChat,
    closeChat,
    predictionData,
  } = useContext(ChatContext);

  const { t, language } = useTranslation();

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedbackGiven, setFeedbackGiven] = useState(false);
const [rating, setRating] = useState(0);
const [feedback, setFeedback] = useState("");
  const messagesEndRef = useRef(null);
  const hasSentInitial = useRef(false);

  // -----------------------------
  // Auto Scroll
  // -----------------------------

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }, 100);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // -----------------------------
  // Reset Chat
  // -----------------------------

  useEffect(() => {

    if (!isOpen) {

      setMessages([]);

      hasSentInitial.current = false;

      setInput("");

    }

  }, [isOpen]);

  // -----------------------------
  // Auto Explain Disease
  // -----------------------------

  useEffect(() => {

    if (
      isOpen &&
      predictionData?.disease &&
      !hasSentInitial.current
    ) {

      handleSend(
        `Explain ${predictionData.disease}`
      );

      hasSentInitial.current = true;

    }

  }, [isOpen, predictionData]);

  // -----------------------------
  // Send Message
  // -----------------------------

  const handleSend = async (
    messageText = input
  ) => {

    if (!messageText.trim()) return;

    const userMessage = {
      text: messageText,
      sender: "user",
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);

    setInput("");

    setLoading(true);

    try {

      const res = await axios.post(
        `${API_BASE_URL}/chat`,
        {
          message: messageText,
          disease: predictionData?.disease,
          confidence: predictionData?.confidence,
          severity: predictionData?.severity,
          language: language,
        }
      );

      setMessages((prev) => [
        ...prev,
        {
          text:
            res.data.reply ||
            t("chatNoReply"),
          sender: "bot",
        },
      ]);

    } catch (error) {

      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          text: t("chatUnavailable"),
          sender: "bot",
        },
      ]);

    } finally {

      setLoading(false);

    }

  };
    // -----------------------------
  // Floating Chat Button
  // -----------------------------

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => openChat(predictionData)}
        className="
          fixed
          bottom-20
          md:bottom-6
          right-4
          z-50
          w-16
          h-16
          rounded-full
          bg-gradient-to-r
          from-green-600
          to-emerald-600
          text-white
          text-3xl
          shadow-2xl
          hover:scale-110
          transition-all
          duration-300
        "
      >
        🤖
      </button>
    );
  }

  return (

    <div
      className="
        fixed
        bottom-20
        md:bottom-6
        right-4
        w-[calc(100%-2rem)]
        sm:w-[500px]
        lg:w-[550px]
        h-[650px]
        bg-white
        rounded-3xl
        shadow-2xl
        overflow-hidden
        border
        border-green-100
        flex
        flex-col
        z-50
      "
    >

      {/* Header */}

      <div
        className="
          bg-gradient-to-r
          from-green-700
          to-emerald-600
          p-5
          flex
          justify-between
          items-center
          text-white
        "
      >

        <div className="flex items-center gap-3">

          <div
            className="
              w-12
              h-12
              rounded-full
              bg-white
              flex
              items-center
              justify-center
              text-2xl
            "
          >
            🌿
          </div>

          <div>

            <h2 className="font-bold text-lg">

              {t("chatTitle")}

            </h2>

            <p className="text-xs text-green-100">

              AI Farming Expert

            </p>

          </div>

        </div>

        <button

          onClick={closeChat}

          className="
            text-xl
            hover:bg-white/20
            rounded-lg
            px-3
            py-2
            transition
          "

        >

          ✕

        </button>

      </div>

      {/* Messages */}

      <div
        className="
          flex-1
          overflow-y-auto
          bg-green-50/30
          p-5
          space-y-4
        "
      >

        {messages.length === 0 && (

          <div className="text-center text-gray-500 mt-10">

            <div className="text-6xl mb-4">

              🌾

            </div>

            <p>

              {t("chatPlaceholder")}

            </p>

          </div>

        )}

        {messages.map((msg, index) => (

          <div

            key={index}

            className={`flex ${
              msg.sender === "user"
                ? "justify-end"
                : "justify-start"
            }`}

          >

            <div

              className={`
                max-w-[95%]
                px-5
                py-4
                rounded-3xl
                shadow
                ${
                  msg.sender === "user"
                    ? "bg-green-600 text-white rounded-br-lg"
                    : "bg-white text-gray-800 rounded-bl-lg"
                }
              `}

            >

              {msg.sender === "bot" ? (

                <div className="prose prose-base max-w-none leading-8 text-[16px]">

                  <ReactMarkdown>

                    {msg.text}

                  </ReactMarkdown>

                </div>

              ) : (

                msg.text

              )}

            </div>

          </div>

        ))}

        {loading && (

          <div className="flex items-center gap-2">

            <div className="bg-white px-5 py-4 rounded-3xl shadow">

              <div className="flex gap-2">

                <span className="w-2 h-2 rounded-full bg-green-500 animate-bounce"></span>

                <span className="w-2 h-2 rounded-full bg-green-500 animate-bounce [animation-delay:150ms]"></span>

                <span className="w-2 h-2 rounded-full bg-green-500 animate-bounce [animation-delay:300ms]"></span>

              </div>

            </div>

          </div>

        )}

        <div ref={messagesEndRef} />

      </div>
            {/* Suggested Questions */}

      <div className="px-4 pt-3 flex flex-wrap gap-2 border-t border-green-100 bg-white">

        {[
          "How can I treat this disease?",
          "Which fungicide should I use?",
          "How can I prevent this disease?"
        ].map((question, index) => (

          <button
            key={index}
            onClick={() => handleSend(question)}
            className="
              text-xs
              px-3
              py-2
              rounded-full
              bg-green-100
              text-green-700
              hover:bg-green-200
              transition
            "
          >
            {question}
          </button>

        ))}

      </div>
{/* ================= Input Area ================= */}

<div className="border-t border-green-100 p-4 bg-white">

  <div className="flex items-center gap-3">

    <input
      type="text"
      placeholder={t("chatPlaceholder")}
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={(e) =>
        e.key === "Enter" && handleSend()
      }
      className="
        flex-1
        px-5
        py-3
        rounded-2xl
        border-2
        border-green-200
        focus:outline-none
        focus:border-green-600
      "
    />

    <button
      onClick={() => handleSend()}
      disabled={loading}
      className="
        w-14
        h-14
        rounded-2xl
        bg-gradient-to-r
        from-green-600
        to-emerald-600
        text-white
        text-xl
        shadow-lg
        hover:scale-105
        transition-all
        disabled:opacity-50
      "
    >
      ➤
    </button>

  </div>

</div>

{/* ================= AI Feedback ================= */}





<div className="border-t border-green-100 bg-white p-4 flex gap-3">

  <button
    onClick={() => {

      setMessages([]);

      hasSentInitial.current = false;

      if (predictionData?.disease) {

        handleSend(`Explain ${predictionData.disease}`);

      }

    }}
    className="
      flex-1
      py-3
      rounded-xl
      bg-green-600
      hover:bg-green-700
      text-white
      font-semibold
    "
  >
    🔄 Restart Chat
  </button>

  <button
    onClick={() => {

      setMessages([]);

      hasSentInitial.current = false;

      closeChat();

    }}
    className="
      flex-1
      py-3
      rounded-xl
      bg-red-500
      hover:bg-red-600
      text-white
      font-semibold
    "
  >
    ❌ Close AI
  </button>

</div>

</div>

);
}

export default AIChatbot;