# Generated by Django 3.0.3 on 2020-03-14 12:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('gestionVinos', '0002_remove_vinos_url'),
    ]

    operations = [
        migrations.RenameField(
            model_name='vinos',
            old_name='imagen',
            new_name='img',
        ),
        migrations.RenameField(
            model_name='vinos',
            old_name='puntuacion',
            new_name='puntos',
        ),
    ]
