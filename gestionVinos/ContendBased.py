import pandas as pd
import nltk
nltk.download('stopwords')
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.neighbors import NearestNeighbors
from nltk.corpus import stopwords

class ContentBased(object):
    """
    Modelo de recomendación de articulos basados en tags.
    El modelo vectoriza cada articulo para poder calcular la similitud. 
    """
    def __init__(self, stop_words=None, token_pattern=None, metric='cosine', n_neighbors=5):
        if stop_words is None:
            stop_words =  stopwords.words("spanish")
            
        if token_pattern is None:
            token_pattern = '(?u)\\b[a-zA-Z]\\w\\w+\\b'
            
        self.tfidf_vectorizer = TfidfVectorizer(stop_words=stop_words, token_pattern=token_pattern)
        self.nearest_neigbors = NearestNeighbors(metric=metric, n_neighbors=n_neighbors, algorithm='brute')
        
    def fit(self, datos, columna_descripcion):
        """
        Entrenamos el modelo:
        1/ Vectorizacion de cada articulo (Extracción y ponderación de atributos)
        2/ Calculamos los articulos mas cercanos
        """
        self.datos = datos
        datos_por_tags = self.tfidf_vectorizer.fit_transform(datos[columna_descripcion])        
        self.nearest_neigbors.fit(datos_por_tags)
        
    def predict(self, descripcion):
        """
        Devuelve los articulos mas parecidos a la descripcion propuesta
        """
        descripcion_tags = self.tfidf_vectorizer.transform(descripcion)        
        if descripcion_tags.sum() == 0:
            return pd.DataFrame(columns=self.datos.columns)
        else:
            _, indices = self.nearest_neigbors.kneighbors(descripcion_tags)
            return self.datos.iloc[indices[0], :]