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

# Documento 2

## 2.1 Disponibilidad

### 2.1.1 Marco de Referencia

##### 2.1.1.1 Definición
A alta disponibilidad se define como la abilidad que tiene un sistema de estar continuamente disponible para los usuarios sin mucha perdida de tiemo de servicio. El problema de la disponibilidad se centra en el tiempo de caida no controlado que puede tener el sistema. Hay que hacer un enfasis en que es caida no controlada, que es muy distinto a momentos donde se suspende el servicio de la aplicación de una manera planeada en momentos como pasos a producción o mantenimientos del servicio.
Asi que el dominio de la disponibilidad es asegurar que en momentos en los que algún suceso afecte los servicios de la aplicación, el usuario no se vea afectado con tiempo en el que no puede hacer uso de estos servicios. La medida que se va a utilizar para cuantificar esto será el porcentaje de uptime o tiempo donde la aplicación esta disponible para el usuario. Los estandares internacionales como el iso 9126 definen distintos niveles y atributos de un software de calidad. Para tiempos se habla de el numero de 9s de disponibilidad que presta el sistema. Esto comienza desde un 9 lo cual se refiere a un sistema con 90%, este sistema en perfectiva tiene un maximo de 36.5 dias de downtime o tiempo donde el servicio no está disponible. Esto puede incrementar hasta nueve 9s, lo que es igual a 99.9999999% de uptime lo que traduce a un sistema que solo puede tener 31.55 milisegundos de caída al año.  
La disponivilidad es un atributo de calidad que necesita un cambio en el diseño de la aplicación para que pueda ser escalada. Esto incluye tanto los servidores donde la aplicación esta corriendo que son los que manejarian a los usuarios de esta y las fuentes de los datos tanto assets como bases de datos que tambien deben mantener una manera de distribuir estos servicios para prevenir momentos sin servicio por falla de acceso.

##### 2.1.1.2 Patrones
Todos los patrones de disponibilidad se basan en crear redundancia de servicios para asegurar que si en algun momento algun servicio singular que tenga problemas puede ser reemplazado por otro en el mismo nivel de jerarquía. 
  * **Failover:** En momentos donde la carga sea muy alta o algun siniestro suceda puede que la operabilidad de un sistema se pierda, en este caso hay otro servidor identico que presta los mismos servicios y esta listo para entrar a funcionamiento apenas. Este patron es el mas usado y mas popular para mejorar la disponibilidad de la mayoria de servicios por la simpliciad con la que puede ser implementado para incrementar la escala.
  * **Failback:** Después de un Failover, el nodo que fue afectado debe tener algun modo de reanudar funcionamiento y volver a acoplarse con el resto de los servicios. Aqui es donde actúa el Failback, creando un punto de fallo para que el servicio pueda devolverse a ete punto y acoplar los nuevos datos que se hayan creado mientras tanto. 
  * **Replicación:** Involucra copiar datos del nodo primario a todos los otros nodos de reserva. Esto se hace para que sea mas sencillo seguir el servicio en cualquiera de los otros nodos en caso de una caída del nodo principal sin mayores problemas de datos.
  * **Virtualización:** Al crear componentes virtualizados ya que esto da mayor modularidad al sistema. Permite crear mas componentes a medida que sea necesario dando mayor libertad y desempeño al servicio.
  * **Mantenimiento Continuo:** En este caso igual que en todos, la mejor manera de prevenir problemas es activamente escanear buscando fallas que posiblemente puedan volverse problemas en el futuro. Estos mantenimientos puede que causen tiempos donde la aplicación no esta disponible pero a cambio de incrementar mucho la confiabilidad que se le puede tener al servicio.       

##### 2.1.1.3 Escenarios
La disponibilidad se puede dividir en dos escenarios mayores. Por un lado se tienen los componentes de software y por otro lado se debe considerar las bases de datos y fuentes de archivos que usaran los servicios de software.
  * **Software**: La redundancia el software en su mayor parte se puede ver con incrementar el numero de servidores que están prestando los servicios de la aplicación e incrementar su numero para poder confiar que si uno o mas de uno se cae hay toda una arquitectura que soporta para el resto de los usuarios. En casos mas modernos se esta tendiendo a crear microservicios que sean lo mas ligeros posibles, estos microservicios de cierta manera se vuelven desechables ya que en cualquier momento que uno de estos se caiga es mucho mas costoso hacer el proceso de failback que simplemente crear una nueva instancia del servicio y volverlo a agregar al sistema. Dependiendo de la aplicación se puede considerar muchos esquemas distintos de soportar el software. 
  * **DBs:** Cuando de bases de datos se habla, para asegurar disponibilidad no es posible utilizar la base de redundancia porque esto crea que no haya una consistencia en los datos. Para cubrir este problema hay que montar algun tipo de replicación de los datos para que se pueda asegurar que si alguna de estas bases de datos cae las otras contienen la información para poder seguir accediendo a ella. En aplicaciones mas grandes esto se logra principalmente por configuraciónes de cluster donde todos los nodos de bases de datos estan interconectados y compartiendo la informacion de cada uno en el otro.

##### 2.1.1.4 Tacticas
Mejorar la disponibilidad de basa en implementar las 5 Rs, **Reliability**, **Replicability**, **Recoverability**, **Reporting** y **Redundancy**. 
  * **Reliability:** Modelamiento de las posibles fallas para hacer mantenimiento preventivo, tambien se puede dejar cierta tolerancia para algunas fallas si el sistema no tiene que ser tan confiable. Cuando se habla de hardware se agregan componentes tecnologicos que ayuden a mejorar el tiempo como sistemas como plantas de energía u UPS.
  * **Replicability:** Para sitios, lo importante es incorporar la replicabilidad en el codigo, haciendo que sea posible y sencillo agregar mas servicios replicados. Compienza por tener distinos lugares separados donde exista la misma información y los servicios deben ser suficientemente inteligentes para acceder al que sea necesario.   
  * **Recoverability:** Mediante una combinación de hardware y software se disminuye el tiempo necesario para recuperar estos sistemas. Mediante la implementación de puntos de recuperación junto con configuración de los balanceadores se logra que la respuesta a una aplicación a que algun servicio se caiga se mejora
  * **Reporting:** Para poder manejar los distintos estados de la aplicación hay que primero poder reconocer los diferentes estados de los serviciós. Es necesario implementar algun tipo de control de monitoreo por parte de cada servicio para interactuar con el que le sea necesario. No es viable dejar que un servidor intente conectarse a una base de datos caída debe haber una pregunta o un latido relacionado a esta conexión para asegurar funcionamiento. 
  * **Redundancy:** Como ya se habló previamente, la redundancia se basa en incrementar el numero de nodos que prestan el mismo servicio para que en cualquier momento siempre haya al menos un nodo que este activo prestando este servicio. El diseño n+1 es el que demuestra este concepto donde siempre se agrega un nodo mas para mejorar la disponibilidad de la aplicación.

##### 2.1.1.5 Herramientas
  * Cliente principal que se conecta a un nodo primario y n nodos secundarios en el mismo nivel.
  * Cliente principal que se conecta a un nodo primario y este se conecta a nodos secundarios.
  * Componentes stateless.
  * RAID de datos.
  * Cluster de servidores con un balanceador de carga.
  * Cluster de bases de datos.
  * Virtualización de Datos.
  * Cluster activo de aplicación y cluster secundario de recuperación de desastres.
  * Bases de datos maestro/esclavo o maestro/maestro
  * Content Delivery Networks.
  * Sistemas de Usuario Final.
  * Interfaces Externas e Internas

### 2.1.2 Analisis

### 2.1.3 Diseño

##### 2.1.3.1 Vistas de Arquitectura

##### 2.1.3.2 Patrones de Arquitectura

##### 2.1.3.3 Best Practices

##### 2.1.1.4 Tácticas

##### 2.1.1.5 Herramientas

### 2.2 Rendimiento

### 2.2.1 Marco de Referencia

##### 2.2.1.1 Definición
Cuando hablamos sobre el rendimiento estamos hablando sobre el tiempo y la abilidad del sistema de software para cumplir con los requerimientos del software. Cuando analizamos un producto de software no solo buscamos que se vea moderna si no que tambien se sienta moderna. La capacidad de responder de la forma mas rapida posible tiene un papel muy importante en esta situacion.

De hecho la valocidad de respuesta es de las caracteristicas mas buscadas entre la calidad de un servicio web.Tanto el hardware como la optimizacion para que el producto corra de la mejor manera posible en cualquier dispositivo son vitales para el rendimiento de estos servicios.

##### 2.2.1.2 Patrones

##### 2.2.1.3 Escenarios

##### 2.2.1.4 Tacticas

##### 2.2.1.5 Herramientas

### 2.2.2 Analisis

### 2.2.3 Diseño

##### 2.2.3.1 Vistas de Arquitectura

##### 2.2.3.2 Patrones de Arquitectura

##### 2.2.3.3 Best Practices

##### 2.2.1.4 Tácticas

##### 2.2.1.5 Herramientas
 

 
