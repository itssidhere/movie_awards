# Generated by Django 4.2.2 on 2023-06-17 05:08

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("my_movie_awards", "0002_remove_movie_actors_remove_movie_awards_and_more"),
    ]

    operations = [
        migrations.RenameField(
            model_name="movie", old_name="movie_type", new_name="type",
        ),
    ]
