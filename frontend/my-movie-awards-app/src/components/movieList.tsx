// src/components/MovieList.tsx

import { useEffect } from 'react';
import { useTransition, animated } from 'react-spring';


type MovieListProps = {
    movies: Movie[];
    onSaveMovie: (movie: Movie) => void;
    onDeleteMovie: (movie: Movie) => void;
    savedMovies: string[];
};

const MovieList: React.FC<MovieListProps> = ({
    movies,
    onSaveMovie,
    onDeleteMovie,
    savedMovies = [],
}) => {

    const transitions = useTransition(movies, {
        from: { opacity: 0, transform: 'translateY(50px)' },
        enter: { opacity: 1, transform: 'translateY(0px)' },
        leave: { opacity: 0, transform: 'translateY(-50px)' },
    });

    return (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-8">
            {transitions((style, movie) => (
                <animated.div style={style} key={movie.imdb_id} className="border p-4">
                    <h3>{movie.title}</h3>
                    <p>Year: {movie.year}</p>
                    <img src={movie.poster} alt="Movie Poster" className="w-full h-64 object-cover" />
                    <div className="flex justify-between mt-4">
                        {savedMovies.includes(movie.imdb_id) ? (
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded"
                                onClick={() => onDeleteMovie(movie)}
                            >
                                Remove
                            </button>
                        ) : (
                            <button
                                className="bg-green-500 text-white px-4 py-2 rounded"
                                onClick={() => onSaveMovie(movie)}
                            >
                                Save
                            </button>
                        )}
                    </div>
                </animated.div>
            ))}
        </div>



    );
};

export default MovieList;
