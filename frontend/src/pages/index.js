import { useState, useRef, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("Ask FarmMate AI anything about farming!");
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const recognitionRef = useRef(null);

  const detectLang = (text) => (/[\u0600-\u06FF]/.test(text) ? "ur" : "en");

  const speakText = (text) => {
    if (!text) return;
    const synth = window.speechSynthesis;
    synth?.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = detectLang(text) === "ur" ? "ur-PK" : "en-US";
    synth?.speak(utter);
  };

  const stopSpeaking = () => {
    window.speechSynthesis?.cancel();
  };

  const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000/ask";

  const askAI = async (text) => {
    const finalText = text || query;
    if (!finalText.trim()) {
      setResponse("⚠️ Please type or speak a question.");
      return;
    }

    setIsLoading(true);
    setResponse("Thinking...");
    stopSpeaking();

    try {
      const res = await axios.post(API_URL, { question: finalText });
      const aiReply = res?.data?.reply || "⚠️ No response from AI.";
      setResponse(aiReply);
      speakText(aiReply);
    } catch (err) {
      console.error("Frontend Error:", err);
      const errorMessage = err.response?.data?.detail || "⚠️ Backend not responding.";
      setResponse(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("SpeechRecognition not supported in this browser!");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!recognitionRef.current) {
      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.interimResults = false;
      recognition.continuous = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
        setResponse("Listening...");
        stopSpeaking();
      };

      recognition.onresult = (e) => {
        const text = e.results[0][0].transcript;
        setQuery(text);
        askAI(text);
      };

      recognition.onerror = (e) => {
        console.error("Speech Recognition Error:", e);
        setIsListening(false);
        setResponse(`Speech recognition error: ${e.error}`);
      };

      recognition.onend = () => {
        setIsListening(false);
        if (response === "Listening...") setResponse("Speech ended. Processing...");
      };

      recognitionRef.current = recognition;
    }

    recognitionRef.current.stop();
    recognitionRef.current.start();
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setIsListening(false);
    if (response === "Listening...") setResponse("Listening stopped.");
  };

  useEffect(() => {
    return () => {
      recognitionRef.current?.stop();
      stopSpeaking();
    };
  }, []);

  return (
    <div style={{ minHeight: "100vh", padding: 20, display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ maxWidth: 700, width: "100%", padding: 28, borderRadius: 14, background: "rgba(255,255,255,0.8)" }}>
        <h1 style={{ textAlign: "center" }}>🌾 FarmMate AI</h1>
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          rows={4}
          style={{ width: "100%", padding: 12, borderRadius: 8 }}
          placeholder="Type or speak your question..."
        />
        <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
          <button onClick={() => askAI()} disabled={isLoading}>Ask</button>
          <button onClick={isListening ? stopListening : startListening}>{isListening ? "Stop Listening" : "Speak Question"}</button>
        </div>
        <div style={{ marginTop: 20, minHeight: 100 }}>{response}</div>
        <div style={{ marginTop: 10 }}>
          <button onClick={() => speakText(response)}>🔊 Speak Response</button>
          <button onClick={stopSpeaking}>🛑 Stop Speaking</button>
        </div>
      </div>
    </div>
  );
}
