# TTp2
Topicos de Telematica Proyecto 2

By: Pablo Cano, Lope Carvajal

# Documento 1
### 1.1 Definición	del	Equipo,	Proyecto	y	Aplicación
##### 1.1.1 Asignación de QAs
  * Lope Carvajal -- Availability
  * Pablo Cano --  Performance
 
##### 1.1.2 Aplicación Seleccionada
Las dos aplicaciónes que estan corriendo en el servidor son muy similares, ambas utilizando node, express y mongoDB manejando imagenes por URL, asi que no existia mucha diferencia en la eleccicón y decidimos seguir la que mas trabajo adelantado tenía que era Campgrounds.  

##### 1.1.3 Descripción de la aplicación
Campgrounds es una aplicación sencilla de sitios de campamentos donde los usuarios pueden crear e ingresar a la plataforma con una cuenta personal. Cuando se ha ingresado, los usuarios pueden crear un campamento para mostrar y asociarle una image. Los usuarios tambien pueden comentar en todos los campamentos solo si han ingresado con una cuenta. La plataforma muestra una galeria de todos los campamentos y una pagina de cada campamento con todos los comentarios y la información que tenga.

##### 1.1.4 Requisitos funcionales
  * **RF1:** El usuario puede ingresar a la página web y entrar a todas las secciones sin errores.
  * **RF2:** El usuario puede crear una cuenta personal en la página.
  * **RF3:** El usuario puede ingresar con su información a su cuenta.
  * **RF4:** El usuario que haya ingresado puede crear un nuevo campamento.
  * **RF5:** El usuario que haya ingresado puede comentar en cualquier campamento.
  * **RF6:** El usuario puede editar o eliminar cualquier publicación que haya hecho con su cuenta.
  * **RF7:** El usuario puede buscar entre todos los campamentos por títulos.
  * **RF8:** El usuario debe poder subir una imagen cuando cree un campamento nuevo.
 
### 1.2 Detalles Tecnicos del Proyecto
El manejo de datos se hizo por medio de multer que es una biblioteca para subir imagenes de node. Con esta librería aceptamos los datos desde un formulario con un input de tipo archivo, se guarda localmente el archivo en la carpeta de los assets publicos y se crea una referencia al mismo archivo en la base de datos y se relaciona con el campamento que fue subida. Las imagenes también pueden ser editads subiendo una imagen nueva para el campamento. Cuando se muestra la imagen se busca por el nombre referenciado en la base de datos en la carpeta de imagenes.

### 1.3 DCA 
[10.131.137.204](http://10.131.137.204)
