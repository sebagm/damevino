# Generated by Django 3.0.3 on 2020-03-28 13:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gestionVinos', '0004_auto_20200328_1446'),
    ]

    operations = [
        migrations.AlterField(
            model_name='vinos',
            name='puntos',
            field=models.IntegerField(),
        ),
    ]
