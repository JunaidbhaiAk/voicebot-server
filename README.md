# VoiceBot Server

## Introduction

Welcome to **VoiceBot Server**! This is a backend server designed to power a voice-enabled chatbot application. Built with modern web technologies, it handles voice processing, natural language understanding, and integration with voice synthesis services. Whether you're building a virtual assistant, customer support bot, or interactive voice response system, this server provides a scalable foundation to get you started quickly.

This project is inspired by best practices in backend development and is ready for production deployment. It emphasizes clean architecture, security, and ease of testing.

## Features

- **Voice Processing**: Handles audio input, speech-to-text (STT) transcription, and text-to-speech (TTS) synthesis.
- **API Endpoints**: RESTful APIs for user interactions, session management, and bot responses.
- **Real-time Capabilities**: WebSocket support for live voice streaming.
- **Integration Ready**: Pluggable modules for popular services like OpenAI for NLP, Google Cloud Speech for STT, or Amazon Polly for TTS.
- **Security**: Rate limiting, CORS, and input validation to protect against common threats.
- **Testing**: Comprehensive unit and integration tests.
- **Documentation**: Auto-generated API docs with Swagger/OpenAPI.
- **Docker Support**: Easy containerization for deployment.

## Tech Stack

- **Language**: TypeScript (for type safety and maintainability)
- **Framework**: Express.js (lightweight and flexible web server)
- **Package Manager**: npm (efficient dependency management)
- **Other Tools**:
  - Langgraph for Handling ai agents
  - Pino for logging
  - Docker for containerization

## Prerequisites

- Node.js (v20+)
- pnpm (v8+)
- Docker (optional, for containerized setup)
- PostgreSQL (for production; SQLite for development)

## Getting Started

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/JunaidbhaiAk/voicebot-server.git
   cd voicebot-server
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   - Copy the example env file: `cp .env.template .env`
   - Edit `.env` with your configuration (e.g., database URL, API keys for STT/TTS services, port):
     ```
     NODE_ENV=development
     PORT="8080"            # The port your server will listen on
     HOST="localhost"       # Hostname for the server
     CLIENT_ORIGIN="http://localhost:3000" # Allowed CORS origin, adjust as necessary
     GOOGLE_API_KEY = 'API_KEY'
     MODEL=gemini-2.5-flash
     ```


### Running the Server

- **Development Mode** (with hot reload):
  ```
  npm start:dev
  ```

- **Build and Production Mode**:
  ```
  npm build
  npm start:prod
  ```

The server will start on `http://localhost:3000`

### Docker Setup

1. Build the image:
   ```
   docker build -t voicebot-server .
   ```

2. Run the container:
   ```
   docker run -p 3000:3000 --env-file .env voicebot-server
   ```



## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/stream` | GET | Get Response for askedquestions ||

Example request for transcription:
```
curl -X POST http://localhost:3000/api/stream?question='What is your name' \
```

