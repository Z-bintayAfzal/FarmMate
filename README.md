# 🌾 FarmMate AI - Smart Multilingual Farming Assistant

![FarmMate AI Banner](https://images.unsplash.com/photo-1516912481808-3406841bd33c?auto=format&fit=crop&w=1600&q=80)
*(Note: Replace this with a custom banner/logo later if you design one)*

FarmMate AI is an innovative, AI-powered assistant designed to empower farmers with timely, accurate, and context-aware agricultural information. Recognizing the diverse linguistic landscape and the critical need for localized farming advice, FarmMate AI aims to bridge knowledge gaps by providing expert guidance in multiple languages through an intuitive chat and voice interface.

## ✨ Features

*   **Multilingual Support:** Automatically detects the user's input language (English, Urdu) and instructs the AI to respond in that language. Easily extensible to other languages like Punjabi.
*   **Voice Input (Speech-to-Text):** Speak your questions naturally, making the assistant accessible to users who prefer oral communication or have limited literacy.
*   **Voice Output (Text-to-Speech):** AI-generated responses are read aloud, providing an auditory experience and enhancing comprehension.
*   **AI-Powered Agricultural Expertise:** Leverages Google's Gemini API (`gemini-2.0-flash`) to provide accurate, practical, and specialized farming advice.
*   **User-Friendly Interface:** A clean, responsive web interface for easy interaction.
*   **Real-time Assistance:** Get quick answers to critical farming queries.

## 🚀 How it Works

FarmMate AI operates with a simple yet powerful two-part architecture:

1.  **Frontend (React/Next.js):**
    *   Captures user input via text or speech.
    *   Sends the question to the FastAPI backend.
    *   Receives the AI response and displays it.
    *   Converts the AI's text response into speech for auditory feedback.

2.  **Backend (FastAPI - Python):**
    *   Receives the user's question from the frontend.
    *   Detects the language of the question (English or Urdu).
    *   Constructs a detailed prompt for the Google Gemini API, instructing it to act as a farming expert and respond in the detected language.
    *   Sends the prompt to the Gemini API and processes the AI's reply.
    *   Returns the AI's response to the frontend.

## 🛠️ Technologies Used

### Backend
*   **Python 3.x**
*   **FastAPI:** Modern, fast (high-performance) web framework.
*   **`uvicorn`:** ASGI server for running FastAPI.
*   **`python-dotenv`:** For managing environment variables (e.g., Gemini API Key).
*   **`requests`:** To make HTTP requests to the Gemini API.
*   **`langdetect`:** For automatic language detection of user input.
*   **Google Gemini API (`gemini-2.0-flash`):** The core AI model providing agricultural knowledge.

### Frontend
*   **React / Next.js:** Modern JavaScript library/framework for building user interfaces.
*   **JavaScript (ES6+), HTML, CSS:** Web development fundamentals.
*   **`axios`:** For making HTTP requests to the backend.
*   **Web Speech API:**
    *   `SpeechRecognition` (for Voice-to-Text)
    *   `SpeechSynthesis` (for Text-to-Speech)

## ⚙️ Setup and Installation

Follow these steps to get FarmMate AI up and running on your local machine.

### Prerequisites

*   **Python 3.8+**
*   **Node.js & npm (or yarn)**
*   **Google Gemini API Key:** Obtain one from [Google AI Studio](https://aistudio.google.com/).

### 1. Backend Setup

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd farmmate-ai
    # Ensure you are in the root directory where main.py resides
    ```

2.  **Create a Virtual Environment (Recommended):**
    ```bash
    python -m venv venv
    # On Windows:
    .\venv\Scripts\activate
    # On macOS/Linux:
    source venv/bin/activate
    ```

3.  **Install Python Dependencies:**
    ```bash
    pip install fastapi uvicorn[standard] python-dotenv requests langdetect
    ```
    *(Alternatively, you can create a `requirements.txt` file with these dependencies and run `pip install -r requirements.txt`)*

4.  **Create `.env` File:**
    In the same directory as your `main.py` file, create a file named `.env` and add your Gemini API key:
    ```
    GEMINI_API_KEY="YOUR_GEMINI_API_KEY_HERE"
    ```
    **Replace `"YOUR_GEMINI_API_KEY_HERE"` with your actual Google Gemini API Key.**

5.  **Run the Backend Server:**
    ```bash
    uvicorn main:app --reload --port 8000
    ```
    You should see output indicating the server is running, typically at `http://127.0.0.1:8000`. Keep this terminal window open.

### 2. Frontend Setup

Assuming your `index.js` is part of a Next.js or Create React App project:

1.  **Navigate to your frontend directory:**
    ```bash
    # If your frontend is in a 'frontend' subfolder
    cd frontend 
    ```
    *(Adjust path as necessary)*

2.  **Install Node.js Dependencies:**
    ```bash
    npm install # or yarn install
    ```
    Ensure `axios` is installed:
    ```bash
    npm install axios # or yarn add axios
    ```

3.  **Configure API URL (if needed):**
    The `index.js` file already has logic to determine the `API_URL`. For local development, it will default to `http://127.0.0.1:8000/ask`. If you deploy your backend to a different URL, you would set `process.env.VERCEL_APP_API_URL` or `process.env.REACT_APP_API_URL` accordingly in your deployment environment variables.

4.  **Run the Frontend Development Server:**
    ```bash
    npm run dev   # For Next.js projects
    # or
    npm start     # For Create React App projects
    ```
    This will typically start the frontend server at `http://localhost:3000`.

### 3. Access the Application

Open your web browser and navigate to `http://localhost:3000` (or the port your frontend framework uses).

## 💡 Usage

1.  **Type your question** into the text area.
2.  Click **"Ask"** to get an AI response.
3.  Alternatively, click **"🎤 Speak Question"** and speak your query. The AI will process it and respond.
4.  Click **"🔊 Speak Response"** to hear the AI's answer aloud.
5.  Click **"🛑 Stop Speaking"** to interrupt the current speech.

## 🚧 Troubleshooting

*   **`404 Client Error: Not Found` from Gemini API:**
    *   **Verify `MODEL_NAME` in `main.py`:** Ensure it matches an *available* model for your API key (e.g., `gemini-2.0-flash`). Check your [Gemini API Usage dashboard](https://aistudio.google.com/app/apikey) to confirm which models are recognized for your project.
    *   **Restart Backend:** After changing `main.py`, **always restart** the `uvicorn` server (`Ctrl+C` then `uvicorn main:app --reload --port 8000`).
*   **`GEMINI_API_KEY missing in .env`:** Make sure your `.env` file is in the root backend directory and `GEMINI_API_KEY="YOUR_KEY"` is correctly set.
*   **CORS errors:** Ensure your backend is running, and the `allow_origins` in `main.py`'s `CORSMiddleware` allows requests from your frontend's origin (e.g., `http://localhost:3000`). Using `allow_origins=["*"]` during development is a quick fix, but consider more specific origins for production.
*   **Speech Recognition/Synthesis not working:** Ensure you are using a modern browser (like Chrome) that supports the Web Speech API.

## 🛣️ Future Enhancements (Roadmap)

*   **Expanded Language Support:** Add more regional languages (e.g., Sindhi, Pashto, Balochi, Hindi).
*   **Contextual Memory:** Implement conversation history for more natural, multi-turn dialogues.
*   **Image Input:** Allow users to upload images for AI-powered disease/pest identification.
*   **Location-Based Advice:** Integrate weather data and local agricultural information for hyper-personalized recommendations.
*   **User Profiles:** Save user preferences (crops, livestock) for tailored advice.
*   **Integration with IoT:** Connect with smart farming sensors.
*   **Mobile Application:** Develop native apps for Android and iOS.

## 🤝 Contributing

We welcome contributions! Feel free to open issues or submit pull requests.

## 📄 License

This project is licensed under the MIT License - see the `LICENSE` file for details.

---
