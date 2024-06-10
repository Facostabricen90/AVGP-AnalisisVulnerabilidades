import sys
import sqlite3
import requests
from bs4 import BeautifulSoup, Comment

url_to_check = sys.argv[1] if len(sys.argv) > 1 else 'https://en.wikipedia.org/'
url = url_to_check
html = url_to_check   

def getDataBD(connection):
    cursor = connection.cursor()
    sql = "SELECT descripcion_https, cod_acceso, descripcion_SSL,descripcion_url, sql_i, xss, csrf FROM requests"
    cursor.execute(sql)
    datos = cursor.fetchall()
    encabezados = ["descripcion_https", "cod_acceso", "descripcion_SSL", "descripcion_url", "sql_i", "xss", "csrf", "listing", "exposed", "libraries"]
    datos.insert(0, encabezados)
    return datos

def insert_requests(connection, descripcion_https, cod_acceso, descripcion_SSL, descripcion_url, sql_i, xss, csrf, listing, exposed, libraries):
    cursor = connection.cursor()
    sql = "INSERT INTO requests (descripcion_https, cod_acceso, descripcion_SSL, descripcion_url, sql_i, xss, csrf, listing, exposed, libraries) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    valores = (descripcion_https, cod_acceso, descripcion_SSL, descripcion_url, sql_i, xss, csrf, listing, exposed, libraries)
    cursor.execute(sql, valores)
    connection.commit()
    print("Inserción de datos exitosa.")
    datos = getDataBD(connection)
    print(tabulate(datos, headers="firstrow", tablefmt="grid"))

# Nombre del archivo de la base de datos SQLite
nombre_bd = "bd_data.sqlite"
url = url_to_check
def fetch_code(url):
    try:
        response = requests.get(url)
        response.raise_for_status()
        return response.text
    except requests.RequestException as e:
        print(f"Error al obtener la URL: {e}")
        return None

html = fetch_code(url)

def scan_for_sql_injection(html):
    patrones_sospechosos = ["' OR '1'='1", "UNION SELECT", "--"]
    for patron in patrones_sospechosos:
        if patron in html:
            return True
    return False

def scan_for_xss(html):
    soup = BeautifulSoup(html, 'html.parser')
    scripts = soup.find_all('script')
    return len(scripts) > 0

def scan_for_csrf(html):
    soup = BeautifulSoup(html, 'html.parser')
    forms = soup.find_all('form')
    for form in forms:
        if 'csrf' not in form.get_text().lower():
            return True
    return False

def check_security_headers(headers):
    cabeceras_requeridas = [
        'Content-Security-Policy',
        'Strict-Transport-Security',
        'X-Content-Type-Options',
        'X-Frame-Options',
        'X-XSS-Protection'
    ]
    estado_cabeceras = {cabecera: (cabecera in headers) for cabecera in cabeceras_requeridas}
    return estado_cabeceras

def check_directory_listing(html):
    if "Index of /" in html or "Directory listing for" in html:
        return True
    return False

def check_exposed_version_info(html):
    soup = BeautifulSoup(html, 'html.parser')
    comentarios = soup.find_all(string=lambda text: isinstance(text, Comment))
    for comentario in comentarios:
        if "version" in comentario.lower():
            return True
    return False

def check_vulnerable_libraries(html):
    bibliotecas_vulnerables = ["<script src=\"https://vulnerable-lib.com/vuln.js\">"]
    for lib in bibliotecas_vulnerables:
        if lib in html:
            return True
    return False

# URL a verificar


try:
    connection = sqlite3.connect(nombre_bd)
    cursor = connection.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS requests (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        descripcion_https TEXT,
                        cod_acceso TEXT,
                        descripcion_SSL TEXT,
                        descripcion_url TEXT,
                        sql_i TEXT,
                        xss TEXT,
                        csrf TEXT,
                        listing TEXT,
                        exposed TEXT,
                        libraries TEXT
                      )''')
    connection.commit()

    url = url_to_check
    print("Conexión establecida correctamente.")
    
    descripcion_https = ""
    cod_acceso = ""
    descripcion_SSL = ""
    descripcion_url = ""
    sql_i = ""
    xss = ""
    csrf = ""
    listing = ""
    exposed = ""
    libraries = ""


# URL a verificar
    url_to_check = 'https://en.wikipedia.org/'  
    html = fetch_code(url)   
    try:
        # Verificar si la URL utiliza HTTPS
        if not url.startswith("https://"):
            descripcion_https = "URL no utiliza HTTPS, lo cual puede ser inseguro."
        else:
            descripcion_https = "URL utiliza HTTPS, lo cual es seguro."

        # Realizar una solicitud GET a la URL
        response = requests.get(url)

        # Verificar el estado de la respuesta
        if response.status_code == 200:
            cod_acceso = "URL está accesible y devuelve un código 200 OK."
        else:
            cod_acceso = f"URL está accesible pero devuelve un código de estado: {response.status_code}"

        # Verificar si el sitio tiene un certificado SSL válido
        if response.url.startswith("https://"):
            if response.history and not response.history[0].is_permanent_redirect:
                descripcion_SSL = "El sitio tiene un certificado SSL válido."
            else:
                descripcion_SSL = "El sitio tiene un certificado SSL, pero puede ser inválido o caducado."

    # Escaneo de inyección SQL
        if scan_for_sql_injection(html):
            sql_i = "Se detectó una posible vulnerabilidad de inyección SQL."
        else:
            sql_i = "No se detectaron vulnerabilidades de inyección SQL."

    # Escaneo de XSS
        if scan_for_xss(html):
            xss = "Se detectaron posibles vulnerabilidades XSS."
        else:
            xss = "No se detectaron vulnerabilidades XSS."

    # Escaneo de CSRF
        if scan_for_csrf(html):
            csrf = "Se detectaron posibles vulnerabilidades CSRF."
        else:
            csrf = "No se detectaron vulnerabilidades CSRF."
    # Verificación de listado de directorios
        if check_directory_listing(html):
            listing = "El listado de directorios está habilitado - posible vulnerabilidad."
        else:
            listing = "El listado de directorios no está habilitado."

    # Verificación de información de versión expuesta
        if check_exposed_version_info(html):
            exposed = "Se expone información de versión - posible vulnerabilidad."
        else:
            exposed = "No se expone información de versión."

    # Verificación de bibliotecas vulnerables
        if check_vulnerable_libraries(html):
            libraries = "Se utilizan bibliotecas vulnerables - posible vulnerabilidad."
        else:
            libraries = "No se detectaron bibliotecas vulnerables."

        descripcion_url = url
        insert_requests(connection, descripcion_https, cod_acceso, descripcion_SSL, descripcion_url, sql_i, xss, csrf, listing, exposed, libraries)

    except Exception as e:
        print("Error al verificar la URL:", e)

    

except sqlite3.Error as e:
    print("Error al conectar a la base de datos:", e)

finally:
    if connection:
        connection.close()
        print("Conexión cerrada.")