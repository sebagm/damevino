import pandas as pd
import nltk
nltk.download('stopwords')
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.neighbors import NearestNeighbors
from nltk.corpus import stopwords

class ContentBased(object):

    #Variables Maridaje
    Carne = "Carnes estofadas, Aves, Buey, Cerdo, Jabalí, Carne blanca, Cordero, Lomo, Pollo, Carnes a la parrilla, Ternera, Barbacoa, Carnes asadas, Cerdo, Carne roja, Pato, Magret, Caza, Lomo adobado"
    Ensalada = "Ensaladas, Ensalada de pollo, Ensalada de salmón, Ensalada César, Ensalada de atún"
    Pescado = "Atún, Pescado azul, Salmón, Caviar, Tortilla de bacalao, Bacalao, Pescado blanco"
    Postres = "Mousse de chocolate, Frutas escarchadas o desecadas, Chocolate, Avellanas, Helados, Frutos secos y oleaginosos, Cacahuetes, Tartas y pasteles, Postres salados, Galletas de chocolate, Repostería, Almendras, Tarta de chocolate, Castañas"
    Pasta = "Pasta fresca, Pasta a la boloñesa"
    Queso = "Quesos, Queso de cabra, Queso seco, Queso manchego, Queso tierno, Queso curado, Queso semicurado, Queso azul, Queso de oveja"
    Embutidos = "Salchichón, Chorizo, Jamón serrano, Jamón y embutidos, Jamón ibérico"
    Platos_cuchara = "Potajes y guisos, Guiso de carne, Platos de cuchara, Cremas"
    Verduras_legumbres_hortalizas = "Hierbas frescas, Moussaka de verduras, Platos de hortalizas, Platos de verdura legumbres y hortalizas"
    Patatas = "Patatas, Patatas asadas"
    Cocina_espanola = "Platos típicos, Cocina regional, Tapas, Cocina española"
    Cocina_china = "Cocina china, Agridulce"
    Cocina_italiana = "Carpaccio, Cocina italiana"
    Cocina_japonesa = "Cocina japonesa, Agridulce"
    Cocina_india = "Cocina india, Especias"
    Setas = "Setas, Arroz con setas"
    Arroz = "Risotto de gambas, Risotto de queso, Risotto de setas, Risotto de pollo, Risotto de verduras, Arroz con setas, Arroz, Risotto, Arroces, Paella, Risotto de champiñones"
    Aperitivos = "Ahumados, Huevos, Aperitivos y canapés"
    Marisco = "Marisco, Centollo, Tortilla de camarones, Langostinos, Gambas"
    Platos_Combinados = "Platos combinados"
    Pate_foie = "Patés o foie gras, Foie, Paté de anchoas"

    #Variables Edad y Tipo
    Joven = "transparente, acerado, amarillo pálido, amarillo pajizo, morado, violeta, rojo, rojo cereza, rojo sangre, rosa cereza, rosa frambuesa, bermellón"
    Viejo = "amarillo limón, dorado, topacio, rojizo, oro, ámbar, rojo anaranjado, teja, terroso, granate, púrpura, rojo picota, negro, anaranjado, salmón, asalmonado, pardo"
    JovenBlanco = "transparente, acerado, amarillo pálido, amarillo pajizo"
    JovenTinto = "morado, violeta, rojo, rojo cereza, rojo sangre"
    JovenRosado = "rosa cereza, rosa frambuesa, bermellón"
    ViejoBlanco = "amarillo limón, dorado, topacio, rojizo, oro, ámbar"
    ViejoTinto = "rojo anaranjado, teja, terroso, granate, púrpura, rojo picota, negro"
    ViejoRosado = "anaranjado, salmón, asalmonado, pardo"

    #Variables sabor
    afrutado = "cítricos, limón, naranja, lima, pomelo, tropicales, piña, plátano, frutas blancas, manzana, pera, frutos rojos, fresa, frambuesa, mora, arándano, albaricoque, melocotón, frutos secos, almendra, nueces, ciruela, uvas pasas"
    floral = "flor de espino, almendra amarga, anís, flor de acacia, miel, azahar, rosas, violetas"
    vegetal = "pimiento verde, hinojo, anisado, monte bajo, romero, tomillo, orégano, heno, canela"

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