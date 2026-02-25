# Social Media Repurposer

A full-stack platform that transforms YouTube video content into repurposed social media posts using AI. It extracts video metadata, generates platform-specific content with Google's Gemini API, and maintains a history of past generations.

## Features

- User authentication via JWT
- YouTube video metadata extraction
- AI-generated content for multiple platforms (Twitter/X, LinkedIn, Instagram, Blog)
- Generation history saved per user
- Responsive design for desktop and mobile

## Project Structure

```
social-media-repurposer/
├── backend/                 # Node.js + Express API
│   ├── middleware/          # JWT authentication & validation
│   ├── routes/              # API endpoints (auth, youtube, ai)
│   ├── db.js                # PostgreSQL database configuration
│   └── server.js            # Entry point
└── frontend/                # React + Vite + Tailwind CSS
    ├── src/                 # React components & pages
    ├── public/              # Static assets
    └── index.html           # Entry HTML
```

## Tech Stack

**Backend:** Node.js, Express.js, PostgreSQL, JWT, bcrypt, Google Gemini API, YouTube Data API, Axios

**Frontend:** React 18, Vite, Tailwind CSS, React Router DOM, Axios

## Getting Started

### Prerequisites

- Node.js v16 or higher
- PostgreSQL
- YouTube Data API key
- Google Gemini API key

### 1. Clone the Repository

```bash
git clone https://github.com/AbbasZain12/social-media-repurposer.git
cd social-media-repurposer
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

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

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend/` directory:

```env
VITE_API_URL=http://localhost:5000
```

Start the development server:

```bash
npm run dev
```

Frontend runs at `http://localhost:5173`.

## API Endpoints

| Method | Endpoint                 | Description                    |
|--------|--------------------------|--------------------------------|
| POST   | /api/auth/register       | User registration              |
| POST   | /api/auth/login          | User login                     |
| GET    | /api/youtube/:videoId    | Fetch YouTube video data       |
| POST   | /api/ai/generate         | Generate AI content            |
| GET    | /api/history             | Get user's generation history  |
| POST   | /api/history             | Save generation to history     |

## Usage

1. Register or log in to your account.
2. Paste a YouTube video URL.
3. Fetch the video data — the system extracts the title, description, and thumbnails.
4. Select a platform and generate AI-written content.
5. Save the result to your history for future reference.

## Database Schema

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE history (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    video_url VARCHAR(255),
    video_title VARCHAR(255),
    generated_content TEXT,
    platform VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Planned Improvements

- Support for additional platforms (TikTok, Facebook)
- Batch processing for multiple videos
- Content scheduling integration
- Template customization
- Analytics dashboard

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Author

Muhammad Zain Abbas — [GitHub: @AbbasZain12](https://github.com/AbbasZain12)
