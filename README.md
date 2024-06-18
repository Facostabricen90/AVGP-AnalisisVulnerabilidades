# AVGP-AnalisisVulnerabilidades
<p align="center">
    <img src="https://github.com/Facostabricen90/AVGP-AnalisisVulnerabilidades/blob/main/Logotipo.jpg" alt="Logo" width="200"/>
</p>

<p align="center">
    <img src="https://github.com/Facostabricen90/AVGP-AnalisisVulnerabilidades/blob/main/Banner.jpg" alt="Logo" width="800"/>
</p>

## Descripción

Oppengeniers es un programa diseñado para analizar las vulnerabilidades de las páginas de compras en línea. Utiliza tecnologías avanzadas de seguridad y análisis para identificar y mitigar posibles amenazas en la infraestructura de tu e-commerce.

## Características

- Análisis exhaustivo de vulnerabilidades
- Detección de errores de configuración
- Reportes detallados
- Fácil integración con diversas plataformas

## Requisitos del Sistema

- Sistema Operativo: Windows, macOS, Linux.
- Python 3.7+
- Visual Studio y Visual Studio Code.

## Instalación

1. Clona este repositorio:
    ```bash
    git clone https://github.com/Facostabricen90/AVGP-AnalisisVulnerabilidades
    ```
2. Navega al directorio del proyecto:
    ```bash
    cd AVGP-AnalisisVulnerabilidades
    ```
3. Instala las dependencias necesarias:
    ```bash
    pip install beautifulsoup4
    ```

## Uso

Para ejecutar un análisis de vulnerabilidades, utiliza el siguiente comando:
```bash
python .\index.py
```

## Autores

- Jhon Edison Garcia.
- Sergio Velásquez.
- Frank Acosta.
- Andrés Castaño.
- Geiner Martinez.

## Roles
- **Frank Sebastián Acosta Briceño - Lider lean - Proyect Manager:** Integrante encargado de administrar y asignar las diferentes tareas del equipo, manejar todo el entorno trello, administrar las historias de usuario que se cumplan dentro del tiempo establecido, encargado de programar las reuniones diarias y llevar el reporte de las dailys.

- **Geiner Stiven Martinez Moscoso - Frontend:** Encargado de todo el apartado visual del proyecto, implementar el proyecto inicial de next.js con sus respectivas carpetas y apartado visual utilizando diferentes tecnologiaas html, css, javascript y presentar un maquetado en figma. Encargado de entregar el apartado visual web a el usuario final con una interfaz dinamica y de facil comprensión de las distintas vulnerabilidades obtenidasen el proicedimiento.

- **Hever Andres Castaño - Backend:** Encargado de generar el codigo completo para el funcionamiento del software implementado en phyton con el uso de diferentes librerias, entregar el backend rest API y endpoints clave el cual se encargara de otorgar a cualquier frontend que se conecte a esta rest api los distintos endpoints o metodos para obtener, modificar y pintar el registro de las distintas vulnerabilidades obtenidas en el procedimiento.

- **Sergio Velasquez Cortes - Lider de operaciones:** Encargado de administrar el repositorio en git, donde se dubira todos los avances de los diferentes miembros, realizar manual de usuario del proyecto donde mostrara todos y cada uno de los pasos a seguir para el funcionamiento del programa, presentacion de la introducción general del proyecto.

- **Jhon Edison Garcia Garcia - Experto en documentacion en general:** Encargado de toda la documentación del proyecto, introduccion, documentacion a detalle de cada uno de los procesos realizados en el codigo backend y frontend que se documentara en un sitio en Notion, se documentara todo el proceso, tiempos, reuniones y demas para tener un informa detallado sobre el proiceso y fincionamiento del software.


# AVGP-AnalisisVulnerabilidades

## Detalles y Características del Programa

**AVGP-AnalisisVulnerabilidades** es una herramienta desarrollada para analizar y detectar vulnerabilidades en sitios web. Este programa se compone de una API en Python y una interfaz web para presentar los resultados de los análisis de seguridad de manera visual y accesible.

### ¿Qué Hace?

El programa analiza sitios web en busca de diversas vulnerabilidades de seguridad, tales como:
- Inyección SQL
- Cross-Site Scripting (XSS)
- Cross-Site Request Forgery (CSRF)
- Listado de directorios
- Exposición de información de versiones
- Uso de bibliotecas vulnerables

Además, ofrece una sección dedicada a la validación de la seguridad de contraseñas.

### ¿Cómo lo Hace?

1. **API en Python**:
   - **Análisis de Vulnerabilidades**: La API escrita en Python utiliza diversas técnicas y bibliotecas para realizar el análisis de seguridad de las URLs proporcionadas.
   - **Base de Datos**: Utiliza SQLite para almacenar los resultados de los análisis y las solicitudes realizadas.

2. **Interfaz Web**:
   - **Desarrollada con Next.js**: La interfaz de usuario está construida con Next.js, permitiendo una experiencia interactiva y moderna.
   - **Visualización de Resultados**: Los resultados del análisis se muestran de manera clara y estructurada, permitiendo al usuario ver detalles específicos y recomendaciones.
   - **Generación de PDF**: Permite la generación de informes en PDF con los resultados del análisis.

### ¿Por Qué lo Hace?

El propósito de esta herramienta es proporcionar a los desarrolladores y administradores de sistemas una manera fácil y efectiva de identificar y mitigar vulnerabilidades en sus sitios web. La seguridad web es crucial para proteger los datos de los usuarios y la integridad del sistema, y AVGP-AnalisisVulnerabilidades facilita este proceso mediante la automatización del análisis y la presentación clara de los resultados y recomendaciones.

---

## Instalación y Ejecución

### Requisitos Previos

- **Python 3.x**
- **Node.js y npm**
- **Visual Studio Code**

### Instalación de Dependencias

1. Abre una terminal en la carpeta del proyecto.
2. Ejecuta el siguiente comando para instalar las dependencias listadas en `installs.txt`:

   ```sh
   pip install -r installs.txt
## Ejecución del Programa

### Iniciar la API:

1. Abre Visual Studio Code.
2. Navega al archivo `Api.py` y ejecuta el siguiente comando en la terminal de VS Code:

   ```sh
   python Api.py
### Iniciar la Interfaz Web:

1. Abre una terminal en la carpeta `cliente/frontend`.
2. Ejecuta el siguiente comando para iniciar el servidor de desarrollo de Next.js:

   ```sh
   npx next dev
### Acceder a la Aplicación:

1. Abre un navegador web y navega a [http://localhost:3000/login](http://localhost:3000/login).
2. Inicia sesión con el usuario `admin` y la contraseña `admin`.

## Uso de la Aplicación

### Realizar un Análisis:

1. Después de iniciar sesión, presiona el botón "Comienza Ahora".
2. Ingresa la URL que deseas analizar y presiona "Scanear".

### Ver Resultados:

1. Los resultados del análisis se mostrarán en la sección "Vulnerabilidades Generales". Presiona "Mostrar" para ver los detalles.
2. Los resultados incluyen la descripción de la URL, vulnerabilidades encontradas, recomendaciones y el puntaje de seguridad.

### Generar Informe en PDF:

1. Puedes generar un informe en PDF de los resultados del análisis haciendo clic en el botón correspondiente en la parte inferior de la página de resultados.

### Seguridad de Contraseñas:

1. En el apartado "Seguridad de Contraseñas", puedes validar la seguridad de tus contraseñas, recibiendo retroalimentación sobre los estándares mínimos de seguridad.
