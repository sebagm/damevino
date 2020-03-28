from django.db import models

# Create your models here.
class Vinos(models.Model):
    nombre = models.CharField(max_length=100)
    tipo = models.CharField(max_length=10)
    anada = models.CharField(max_length=4)
    denominacion = models.CharField(max_length=50)
    bodega = models.CharField(max_length=50)
    puntos = models.IntegerField()
    maridaje = models.TextField()
    vista = models.TextField()
    nariz = models.TextField()
    boca = models.TextField()
    img = models.TextField()