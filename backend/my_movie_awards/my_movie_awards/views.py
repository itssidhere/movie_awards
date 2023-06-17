from rest_framework import generics
from .models import Movie
from .serializers import MovieSerializer
import requests
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
import json


@api_view(["GET"])
def search_movie(request):
    search_term = request.GET.get("search_term", "")
    response = requests.get(f"http://www.omdbapi.com/?apikey=9c25ce60&s={search_term}")

    if response.status_code == 200:
        data = response.json()  # convert to python dictionary

        movies = data.get("Search", [])  # get the list of movies from the dictionary

        # serealize the data
        serialized_data = json.dumps(
            [
                {
                    "title": movie.get("Title"),
                    "year": movie.get("Year"),
                    "imdb_id": movie.get("imdbID"),
                    "type": movie.get("Type"),
                    "poster": movie.get("Poster"),
                    "rated": movie.get("Rated"),
                    "released": movie.get("Released"),
                    "runtime": movie.get("Runtime"),
                    "genre": movie.get("Genre"),
                    "director": movie.get("Director"),
                    "writer": movie.get("Writer"),
                    "actors": movie.get("Actors"),
                    "plot": movie.get("Plot"),
                    "language": movie.get("Language"),
                    "country": movie.get("Country"),
                    "awards": movie.get("Awards"),
                    "metascore": movie.get("Metascore"),
                    "imdb_rating": movie.get("imdbRating"),
                    "imdb_votes": movie.get("imdbVotes"),
                    "dvd": movie.get("DVD"),
                    "box_office": movie.get("BoxOffice"),
                    "production": movie.get("Production"),
                    "website": movie.get("Website"),
                    "response": movie.get("Response"),
                }
                for movie in movies
            ]
        )

        return JsonResponse({"movies": serialized_data})

    else:
        return JsonResponse({"error": "Something went wrong."})


@api_view(["POST"])
def save_movie(request):
    imdb_id = request.data.get("imdb_id", "")

    # check if movie already exists
    movie = Movie.objects.filter(imdb_id=imdb_id).first()

    if movie:
        return JsonResponse({"error": "Movie already saved."})

    response = requests.get(f"http://www.omdbapi.com/?apikey=9c25ce60&i={imdb_id}")

    if response.status_code == 200:
        data = response.json()

        movie = Movie.objects.create(
            title=data.get("Title"),
            year=data.get("Year"),
            imdb_id=data.get("imdbID"),
            type=data.get("Type"),
            poster=data.get("Poster"),
            rated=data.get("Rated"),
            released=data.get("Released"),
            runtime=data.get("Runtime"),
            genre=data.get("Genre"),
            director=data.get("Director"),
            writer=data.get("Writer"),
            actors=data.get("Actors"),
            plot=data.get("Plot"),
            language=data.get("Language"),
            country=data.get("Country"),
            awards=data.get("Awards"),
            metascore=data.get("Metascore"),
            imdb_rating=data.get("imdbRating"),
            imdb_votes=data.get("imdbVotes"),
            dvd=data.get("DVD"),
            box_office=data.get("BoxOffice"),
            production=data.get("Production"),
            website=data.get("Website"),
            response=data.get("Response"),
        )

        return JsonResponse({"success": "Movie saved."})


@api_view(["DELETE"])
def remove_movie(request):
    imdb_id = request.data.get("imdb_id", "")

    # check if movie already exists
    movie = Movie.objects.filter(imdb_id=imdb_id).first()

    if movie:
        movie.delete()
        return JsonResponse({"success": "Movie removed."})

    return JsonResponse({"success": "Movie does not exist."})


@api_view(["GET"])
def saved_movies(request):
    movies = Movie.objects.all()
    return JsonResponse(
        {
            "movies": json.dumps(MovieSerializer(movies, many=True).data),
            "count": movies.count(),
        }
    )
