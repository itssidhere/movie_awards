
[![Demo](https://yt-embed.herokuapp.com/embed?v=vi/4ItOTQWym08)](https://www.youtube.com/watch?v=vi/4ItOTQWym08 "Demo")

[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/4ItOTQWym08/0.jpg)](https://www.youtube.com/watch?v=4ItOTQWym08)


# Movie Awards

Movie Awards is a web application built with React.js and Django that allows users to search for movies using the OMDB API and save their favorite films to a database. The app provides a user-friendly interface to perform movie searches, view search results, add movies to the database, and manage the saved movies list.

## Features

- Search movies using the OMDB API and display search results
- Add movies from the search results to the database
- View the list of saved movies in the database
- Remove movies from the saved movies list
- Display a notification when the limit is reached

## Technology Stack

- Frontend: React.js with TypeScript
- Backend: Django with Django Rest Framework
- Styling: Tailwind CSS
- State Management: Redux with TypeScript

## Installation

### Backend (Django)

1. Clone the repository.
2. Navigate to the `backend/my_movie_awards` directory.
3. Create and activate a virtual environment (recommended).
4. Install the required Python dependencies using the command: `pip install -r requirements.txt`.
5. Apply database migrations using the command: `python manage.py migrate`.
6. Start the Django development server with the command: `python manage.py runserver`.

### Frontend (React)

1. Navigate to the `frontend/my-movie-awards-app` directory.
2. Install the required npm dependencies using the command: `npm install`.
3. Start the development server with the command: `npm run dev`.

## Configuration

### Environment Variables

Create a `.env` file in the root directory of the Django project (`backend/my_movie_awards`) and set the following environment variables:

- `OMDB_API_KEY`: Your OMDB API key


