# 🌾 FarmMate AI - Smart Multilingual Farming Assistant
<img width="925" height="443" alt="image" src="https://github.com/user-attachments/assets/ade45520-33fc-43e9-be4d-7ce63126c2fd" />

*FarmMate Generate English Response:*
<img width="926" height="439" alt="image" src="https://github.com/user-attachments/assets/11fc6dcd-660d-484e-9ad6-a6d7fbc1542a" />
<img width="926" height="437" alt="image" src="https://github.com/user-attachments/assets/6c03f57f-c8ab-498f-9b9d-faf221be3948" />
*FarmMate Generate Urdu Response:*
<img width="926" height="442" alt="image" src="https://github.com/user-attachments/assets/f5763e7a-9fc0-47e7-81cd-b0ccb92f59ab" />
*FarmMate Generate German Response:*
<img width="929" height="440" alt="image" src="https://github.com/user-attachments/assets/601bda60-105c-4fb9-bb4e-6a210485f9d5" />
*FarmMate Generate Italian Response:*
<img width="924" height="433" alt="image" src="https://github.com/user-attachments/assets/6681b87c-812c-4343-b8d0-83d3c60eb0dd" />
*FarmMate Generate French Response:*
<img width="926" height="440" alt="image" src="https://github.com/user-attachments/assets/3b9bf061-61e0-4eeb-ad0b-07cbf6807967" />



FarmMate AI is an innovative, AI-powered assistant designed to empower farmers with timely, accurate, and context-aware agricultural information. Recognizing the diverse linguistic landscape and the critical need for localized farming advice, FarmMate AI aims to bridge knowledge gaps by providing expert guidance in multiple languages through an intuitive chat and voice interface.

## ✨ Features

*   **Multilingual Support:** Automatically detects the user's input language using `langdetect` (e.g., English, Urdu, with broad support for many others) and instructs the AI to respond in that language.
*   **Voice Input (Speech-to-Text):** Speak your questions naturally, making the assistant accessible to users who prefer oral communication or have limited literacy.
*   **Voice Output (Text-to-Speech):** AI-generated responses are read aloud, providing an auditory experience and enhancing comprehension.
*   **AI-Powered Agricultural Expertise:** Leverages Google's Gemini API (`gemini-2.0-flash`) to provide accurate, practical, and specialized farming advice.
*   **User-Friendly Interface:** A clean, responsive web interface for easy interaction.
*   **Real-time Assistance:** Get quick answers to critical farming queries.

## 🚀 How it Works

FarmMate AI operates with a simple yet powerful two-part architecture:

1.  **Frontend (React/Next.js):**
    *   Captures user input via text or speech using the browser's Web Speech API.
    *   Sends the question to the FastAPI backend.
    *   Receives the AI response and displays it in real-time.
    *   Converts the AI's text response into spoken audio using the browser's Web Speech API, with appropriate language selection.

2.  **Backend (FastAPI - Python):**
    *   Receives the user's question from the frontend.
    *   Detects the language of the question using `langdetect`.
    *   Constructs a detailed system prompt for the Google Gemini API, instructing it to act as a "farming expert" and to respond precisely in the detected language.
    *   Communicates with the Gemini API to get the AI's response.
    *   Returns the AI's processed response to the frontend.

## 🤖 AI Model & API Choice: Google Gemini API (`gemini-2.0-flash`)

The core intelligence of FarmMate AI is powered by the **Google Gemini API**, specifically using the `gemini-2.0-flash` model (or the latest `flash` iteration available).

### Why Gemini Flash? A Comparative Look

Choosing an appropriate Large Language Model (LLM) API is critical. Here's why the Google Gemini API, particularly its `flash` models, was selected for FarmMate AI over other prominent alternatives like OpenAI's GPT models or self-hosted open-source LLMs:

| Feature/Criterion      | Google Gemini API (`flash` models)                                | OpenAI (e.g., GPT-3.5-turbo, GPT-4)                                     | Open-Source LLMs (e.g., Llama 2, Mistral)                                    |
| :--------------------- | :---------------------------------------------------------------- | :---------------------------------------------------------------------- | :--------------------------------------------------------------------------- |
| **Performance/Speed**  | **Excellent for real-time interaction.** `flash` models are specifically optimized for low latency and high throughput. | Good for `GPT-3.5-turbo` but generally slower than `Gemini Flash`. `GPT-4` is significantly slower. | Varies greatly. Smaller models can be fast, but require careful optimization for production. |
| **Cost-Effectiveness** | **Highly competitive pricing** for `flash` models, often more economical for high-volume, quick interactions, crucial for widespread adoption in agriculture. | Generally affordable for `GPT-3.5-turbo`, but `GPT-4` is considerably more expensive. | Free model weights, but incurs substantial infrastructure and operational costs (GPU, expertise). |
| **Multilingual Support**| **Strong, native support** for a wide array of languages, including nuanced understanding essential for agricultural terminology in languages like Urdu. | Very strong for major languages, good for many others.                         | Varies by model; many are English-centric, requiring fine-tuning for other languages. |
| **Ease of Integration**| **Developer-friendly API** with clear documentation, extensive client libraries, and robust Google Cloud ecosystem integration. | Widely adopted, well-documented API with strong community support.           | Complex setup, requiring advanced ML Ops knowledge for deployment and management. |
| **Scalability**        | Backed by Google's robust infrastructure, capable of handling high request volumes reliably.                                | Proven scalability for large-scale applications with established service limits. | Depends entirely on self-hosted infrastructure and can be challenging to scale cost-effectively. |

**Key Benefits for FarmMate AI:**

1.  **Optimal Speed and Cost:** The `flash` models are ideal for an interactive assistant where farmers need quick, affordable answers. This ensures a responsive user experience without incurring prohibitive operational costs, making the solution more accessible and sustainable.
2.  **Robust Multilingual Capabilities:** Google's deep-rooted expertise in language processing means Gemini can effectively understand queries and generate accurate, contextually relevant responses in diverse languages like Urdu, which is vital for reaching a broad farming community.
3.  **Future-Proofing and Integration:** As part of the Google ecosystem, Gemini offers a path for future enhancements, including advanced multimodal interactions (e.g., image input for disease diagnosis, leveraging other Google Cloud services).

## 🛠️ Technologies Used

### Backend
*   **Python 3.x**
*   **FastAPI:** High-performance web framework.
*   **`uvicorn`:** ASGI server.
*   **`python-dotenv`:** Environment variable management.
*   **`requests`:** HTTP client.
*   **`langdetect`:** Language detection library (for broader language support).
*   **Google Gemini API (`gemini-2.0-flash`):** AI model.

### Frontend
*   **React / Next.js:** UI library/framework.
*   **JavaScript (ES6+), HTML, CSS:** Web standards.
*   **`axios`:** HTTP client.
*   **Web Speech API:** Browser-native Speech-to-Text and Text-to-Speech.

## ⚙️ Setup and Installation

Follow these steps to get FarmMate AI up and running on your local machine.

### Prerequisites

*   **Python 3.8+**
*   **Node.js & npm (or yarn)**
*   **Google Gemini API Key:** Obtain one from [Google AI Studio](https://aistudio.google.com/).
    *   **IMPORTANT:** Verify the exact model name available to your key (e.g., `gemini-2.0-flash`) in your [Gemini API Usage dashboard](https://aistudio.google.com/app/apikey) and ensure this matches the `MODEL_NAME` in your `main.py`.

### 1. Backend Setup

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd farmmate-ai # Ensure you are in the root directory where main.py resides
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
    *(If you prefer, create a `requirements.txt` file with these dependencies and run `pip install -r requirements.txt`)*

4.  **Create `.env` File:**
    In the **same directory as your `main.py` file**, create a file named `.env` and add your Gemini API key:
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

Assuming your `index.js` is part of a Next.js or Create React App project (adjust paths if your frontend is in a subfolder):

1.  **Navigate to your frontend directory:**
    ```bash
    # e.g., if your frontend is in a 'frontend' subfolder
    # cd frontend
    ```

2.  **Install Node.js Dependencies:**
    ```bash
    npm install # or yarn install
    ```
    Ensure `axios` is installed:
    ```bash
    npm install axios # or yarn add axios
    ```

3.  **Configure API URL (if needed):**
    The `index.js` file intelligently determines the `API_URL`. For local development, it defaults to `http://127.0.0.1:8000/ask`. If you deploy your backend to a different URL, you would set `process.env.VERCEL_APP_API_URL` or `process.env.REACT_APP_API_URL` to your deployed backend's URL.

4.  **Run the Frontend Development Server:**
    ```bash
    npm run dev   # For Next.js projects
    # or
    npm start     # For Create React App projects
    ```
    This will typically start the frontend server at `http://localhost:3000`.

### 3. Access the Application

Open your web browser and navigate to `http://localhost:3000` (or the port your frontend framework uses).

##  Usage

1.  **Type your question** into the text area.
2.  Click **"Ask"** to get an AI response.
3.  Alternatively, click **" Speak Question"** and speak your query. The AI will process it and respond.
4.  Click **"Speak Response"** to hear the AI's answer aloud.
5.  Click **" Stop Speaking"** to interrupt the current speech.

## 🚧 Troubleshooting

*   **`404 Client Error: Not Found` from Gemini API:**
    *   **Verify `MODEL_NAME` in `main.py`:** **Crucially**, ensure `MODEL_NAME = "gemini-2.0-flash"` (or the exact name confirmed in your API dashboard) is present and saved.
    *   **Restart Backend:** After *any* change to `main.py`, **always restart** the `uvicorn` server (`Ctrl+C` then `uvicorn main:app --reload --port 8000`).
*   **`GEMINI_API_KEY missing in .env`:** Make sure your `.env` file is in the root backend directory and contains `GEMINI_API_KEY="YOUR_KEY"`.
*   **CORS errors:** Ensure your backend is running, and the `allow_origins` in `main.py`'s `CORSMiddleware` allows requests from your frontend's origin (e.g., `http://localhost:3000`). For production, specify exact origins instead of `["*"]`.
*   **Speech Recognition/Synthesis not working:** Ensure you are using a modern browser (like Google Chrome) that fully supports the Web Speech API.

## 🛣️ Future Enhancements (Roadmap)

FarmMate AI is continuously evolving to provide even more comprehensive support to farmers. Here are some key areas for future development:

*   **🌧️ Weather & Irrigation Assistance:**
    *   **Upgrade:** Integrate with real-time weather APIs (e.g., OpenWeatherMap, WeatherAPI) to fetch current and forecast weather data.
    *   **Functionality:** Suggest optimal irrigation schedules based on soil moisture levels (if sensor data is integrated), real-time weather forecasts, and specific crop requirements.
    *   **Impact:** Helps farmers optimize water usage, reduce irrigation costs, conserve water resources, and improve crop yields by preventing over or under-watering.



## 🤝 Contributing

We welcome contributions to FarmMate AI! If you have ideas for improvements, new features, or bug fixes, please feel free to:

1.  **Fork the repository.**
2.  **Create a new branch** (`git checkout -b feature/YourFeatureName`).
3.  **Make your changes** and commit them (`git commit -m 'Add Your Feature'`).
4.  **Push to your branch** (`git push origin feature/YourFeatureName`).
5.  **Open a Pull Request** with a clear description of your changes.


