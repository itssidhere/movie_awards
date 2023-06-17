import { useState, useEffect } from 'react'
import SearchMovies from './components/searchMovies'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './store/store'
import { addSavedMovie, removeSavedMovie, setMovies, setSavedMovies } from './store/reducers'
import MovieList from './components/movieList'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const dispatch = useDispatch()
  const [displaySaved, setDisplaySaved] = useState(false)
  const movies = useSelector((state: RootState) => state.movies)
  const savedMovies = useSelector((state: RootState) => state.savedMovies)
  const [searchMessage, setSearchMessage] = useState('')

  useEffect(() => {
    const fetchSavedMovies = async () => {
      const response = await fetch('http://localhost:8000/saved/')
      const data = await response.json()
      dispatch(setSavedMovies(JSON.parse(data['movies'])))
    }

    fetchSavedMovies()
  }, [])


  useEffect(() => {
    if (savedMovies.length == 5) {
      toast.success('You have nominated 5 movies!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true
      })
    }
  }, [savedMovies.length])

  const handleSearch = async (searchTerm: string) => {
    const response = await fetch(`http://localhost:8000/search/?search_term=${searchTerm}`);

    const data = await response.json();

    const movies = JSON.parse(data['movies']);

    if (movies.length === 0) {
      setSearchMessage('No movies found')
    } else {
      setSearchMessage('Showing results for ' + searchTerm)
    }

    dispatch(setMovies(movies));
  }

  const handleSaveMovie = async (movie: Movie) => {
    const imdb_id = movie.imdb_id
    await fetch('http://localhost:8000/save/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imdb_id }),
    })

    dispatch(addSavedMovie(movie))

    toast.success('Movie added to nominations', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true
    })
  };

  const handleDeleteMovie = async (movie: Movie) => {
    const imdb_id = movie.imdb_id
    const response = await fetch('http://localhost:8000/remove/', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imdb_id }),
    })


    dispatch(removeSavedMovie(imdb_id));
    toast.error('Movie removed from nominations', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true
    })
  }

  return (
    <div className="flex flex-col w-screen min-h-screen justify-center items-center overflow-y-auto">
      <ToastContainer />
      {
        (movies.length === 0 && !displaySaved) && <h1 className="text-center font-bold font text-7xl">Movie Awards</h1>

        ||

        (savedMovies.length === 0 && displaySaved) && <h1 className="text-center font-bold font text-7xl">Movie Awards</h1>
      }

      <SearchMovies handleSearch={handleSearch} searchMessage={displaySaved ? "" : searchMessage} />


      {
        //create a rounded button with a border and a hover effect to display the saved movies

        <button className="text-white px-4 py-2 rounded bg-zinc-700" onClick={
          () => setDisplaySaved(!displaySaved)
        }>
          {displaySaved ? 'Display Search Results' : `Display Saved Movies ${savedMovies.length}`}
        </button>

      }
      <MovieList movies={(displaySaved ? savedMovies : movies)} onSaveMovie={handleSaveMovie} onDeleteMovie={handleDeleteMovie} savedMovies={

        savedMovies.map((movie) => movie.imdb_id)
      } />

    </div>



  )
}

export default App
