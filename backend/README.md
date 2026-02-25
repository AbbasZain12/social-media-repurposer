# Social Media Repurposer (Backend)

Node.js + Express backend for generating repurposed social media content from YouTube videos using Google's Gemini AI.

## Features

- User registration and login
- JWT-based authentication
- YouTube video metadata fetching
- AI content generation via Google Gemini
- Generation history saved per user
- PostgreSQL database integration

## Tech Stack

Node.js, Express.js, PostgreSQL, JWT, bcrypt, Google Gemini API, YouTube Data API, Axios

## Getting Started

### Prerequisites

- Node.js v16 or higher
- PostgreSQL
- YouTube Data API key
- Google Gemini API key

### Installation

```bash
npm install
```

Create a `.env` file in the project root:

```env
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=social_media_db
DB_USER=your_db_user
DB_PASSWORD=your_db_password
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_gemini_api_key
YOUTUBE_API_KEY=your_youtube_api_key
```

Start the server:

```bash
node server.js
```

Server runs at `http://localhost:5000`.

## API Endpoints

| Method | Endpoint              | Description                   |
|--------|-----------------------|-------------------------------|
| POST   | /api/auth/register    | User registration             |
| POST   | /api/auth/login       | User login                    |
| GET    | /api/youtube/:videoId | Fetch YouTube video data      |
| POST   | /api/ai/generate      | Generate AI content           |
| GET    | /api/history          | Get user's generation history |
| POST   | /api/history          | Save generation to history    |

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Author

Muhammad Zain Abbas — [GitHub: @AbbasZain12](https://github.com/AbbasZain12)
