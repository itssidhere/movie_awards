from django.db import models


class Movie(models.Model):
    title = models.CharField(max_length=255)
    year = models.CharField(max_length=4)
    imdb_id = models.CharField(max_length=10)
    type = models.CharField(max_length=50)
    poster = models.URLField()
    rated = models.CharField(max_length=10, blank=True, null=True)
    released = models.CharField(max_length=50, blank=True, null=True)
    runtime = models.CharField(max_length=50, blank=True, null=True)
    genre = models.CharField(max_length=50, blank=True, null=True)
    director = models.CharField(max_length=50, blank=True, null=True)
    writer = models.CharField(max_length=50, blank=True, null=True)
    actors = models.CharField(max_length=50, blank=True, null=True)
    plot = models.CharField(max_length=50, blank=True, null=True)
    language = models.CharField(max_length=50, blank=True, null=True)
    country = models.CharField(max_length=50, blank=True, null=True)
    awards = models.CharField(max_length=50, blank=True, null=True)
    metascore = models.CharField(max_length=50, blank=True, null=True)
    imdb_rating = models.CharField(max_length=50, blank=True, null=True)
    imdb_votes = models.CharField(max_length=50, blank=True, null=True)
    dvd = models.CharField(max_length=50, blank=True, null=True)
    box_office = models.CharField(max_length=50, blank=True, null=True)
    production = models.CharField(max_length=50, blank=True, null=True)
    website = models.CharField(max_length=50, blank=True, null=True)
    response = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return self.title
