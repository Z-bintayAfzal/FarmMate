import { useState, useRef, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("Ask FarmMate AI anything about farming and agriculture!");
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const recognitionRef = useRef(null);

  const detectLang = (text) => (/[\u0600-\u06FF]/.test(text) ? "ur" : "en");

  const speakText = (text) => {
    if (!text) return;
    const synth = window.speechSynthesis;
    synth?.cancel(); // Clear previous utterances
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = detectLang(text) === "ur" ? "ur-PK" : "en-US";
    synth?.speak(utter);
  };

  const stopSpeaking = () => {
    window.speechSynthesis?.cancel();
  };

  const API_URL = process.env.VERCEL_APP_API_URL || process.env.REACT_APP_API_URL || "http://127.0.0.1:8000/ask";

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
      const errorMessage = err.response?.data?.detail || "⚠️ Backend not responding. Please check server logs.";
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
        if (response === "Listening...") {
          setResponse("Speech ended. Processing...");
        }
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
    <div style={{
      minHeight: "100vh",
      padding: 20,
      backgroundImage: "url('https://images.unsplash.com/photo-1516912481808-3406841bd33c?auto=format&fit=crop&w=1600&q=80')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}>
      <div style={{
        maxWidth: 700,
        width: "100%",
        zIndex: 10,
        background: "rgba(255,255,255,0.70)",
        padding: 28,
        borderRadius: 14,
        boxShadow: "0 0 20px rgba(0,0,0,0.4)",
      }}>
        <h1 style={{ fontSize: 38, textAlign: "center", fontWeight: "bold", color: "#1a1a1a" }}>
          🌾 FarmMate AI
        </h1>
        <p style={{ textAlign: "center", marginBottom: 20 }}>Smart multilingual farming assistant</p>
        <textarea
          style={{ width: "100%", padding: 12, borderRadius: 8, border: "1px solid gray", background: "rgba(255,255,255,0.85)" }}
          placeholder="Type or speak your question..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          rows={4}
        />
        <div style={{ display: "flex", gap: 10, marginTop: 15 }}>
          <button 
            onClick={() => askAI()} 
            disabled={isLoading}
            style={{ 
              flex: 1, 
              background: isLoading ? "#cccccc" : "#007bff", 
              color: "#fff", 
              padding: 12, 
              borderRadius: 8, 
              fontWeight: "bold",
              cursor: isLoading ? "not-allowed" : "pointer"
            }}
          >
            {isLoading ? "Asking..." : "Ask"}
          </button>
          <button 
            onClick={isListening ? stopListening : startListening} 
            disabled={isLoading}
            style={{ 
              flex: 1, 
              background: isListening ? "#555" : (isLoading ? "#cccccc" : "#28a745"), 
              color: "#fff", 
              padding: 12, 
              borderRadius: 8, 
              fontWeight: "bold",
              cursor: isLoading ? "not-allowed" : "pointer"
            }}
          >
            🎤 {isListening ? "Stop Listening" : "Speak Question"}
          </button>
        </div>

        <h3 style={{ marginTop: 30 }}>Response:</h3>
        <div style={{ 
          minHeight: 100, 
          background: "rgba(255,255,255,0.85)", 
          padding: 12, 
          borderRadius: 8,
          whiteSpace: "pre-wrap",
          wordBreak: "break-word"
        }}>
          {response}
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 15 }}>
          <button 
            onClick={() => speakText(response)} 
            disabled={isLoading || !response || response.startsWith("⚠️")}
            style={{ 
              flex: 1, 
              background: (isLoading || !response || response.startsWith("⚠️")) ? "#cccccc" : "#ff9800", 
              color: "white", 
              padding: 12, 
              borderRadius: 8, 
              fontWeight: "bold",
              cursor: (isLoading || !response || response.startsWith("⚠️")) ? "not-allowed" : "pointer"
            }}
          >🔊 Speak Response</button>
          <button 
            onClick={stopSpeaking} 
            disabled={isLoading}
            style={{ 
              flex: 1, 
              background: isLoading ? "#cccccc" : "#f44336", 
              color: "white", 
              padding: 12, 
              borderRadius: 8, 
              fontWeight: "bold",
              cursor: isLoading ? "not-allowed" : "pointer"
            }}
          >🛑 Stop Speaking</button>
        </div>
      </div>
    </div>
  );
}
