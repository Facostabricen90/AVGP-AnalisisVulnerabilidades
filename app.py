import sqlite3
import requests
from bs4 import BeautifulSoup, Comment
from tabulate import tabulate

class SecurityScanner:
    def __init__(self):
        self.nombre_bd = "bd_data.sqlite"
        self.connection = None

    def fetch_code(self, url):
        try:
            response = requests.get(url)
            response.raise_for_status()
            return response.text
        except requests.RequestException as e:
            print(f"Error al obtener la URL: {e}")
            return None

    def scan_for_sql_injection(self, html):
        patrones_sospechosos = ["' OR '1'='1", "UNION SELECT", "--"]
        for patron in patrones_sospechosos:
            if patron in html:
                return True
        return False

    def scan_for_xss(self, html):
        soup = BeautifulSoup(html, 'html.parser')
        scripts = soup.find_all('script')
        return len(scripts) > 0

    def scan_for_csrf(self, html):
        soup = BeautifulSoup(html, 'html.parser')
        forms = soup.find_all('form')
        for form in forms:
            if 'csrf' not in form.get_text().lower():
                return True
        return False

    def check_directory_listing(self, html):
        if "Index of /" in html or "Directory listing for" in html:
            return True
        return False

    def check_exposed_version_info(self, html):
        soup = BeautifulSoup(html, 'html.parser')
        comentarios = soup.find_all(string=lambda text: isinstance(text, Comment))
        for comentario in comentarios:
            if "version" in comentario.lower():
                return True
        return False

    def check_vulnerable_libraries(self, html):
        bibliotecas_vulnerables = ["<script src=\"https://vulnerable-lib.com/vuln.js\">"]
        for lib in bibliotecas_vulnerables:
            if lib in html:
                return True
        return False

    def create_table_if_not_exists(self):
        cursor = self.connection.cursor()
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
        self.connection.commit()

    def insert_request(self, descripcion_https, cod_acceso, descripcion_SSL, descripcion_url, sql_i, xss, csrf, listing, exposed, libraries):
        cursor = self.connection.cursor()
        sql = "INSERT INTO requests (descripcion_https, cod_acceso, descripcion_SSL, descripcion_url, sql_i, xss, csrf, listing, exposed, libraries) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
        valores = (descripcion_https, cod_acceso, descripcion_SSL, descripcion_url, sql_i, xss, csrf, listing, exposed, libraries)
        cursor.execute(sql, valores)
        self.connection.commit()
        print("Inserción de datos exitosa.")
        datos = self.get_data_from_db()
        print(tabulate(datos, headers="firstrow", tablefmt="grid"))

    def get_data_from_db(self):
        cursor = self.connection.cursor()
        sql = "SELECT descripcion_https, cod_acceso, descripcion_SSL, descripcion_url, sql_i, xss, csrf, listing, exposed, libraries FROM requests"
        cursor.execute(sql)
        datos = cursor.fetchall()
        encabezados = ["descripcion_https", "cod_acceso", "descripcion_SSL", "descripcion_url", "sql_i", "xss", "csrf", "listing", "exposed", "libraries"]
        datos.insert(0, encabezados)
        return datos

    def run(self, url_to_check):
        resultados = {}
        try:
            self.connection = sqlite3.connect(self.nombre_bd)
            self.create_table_if_not_exists()
            url = url_to_check
            print("Conexión establecida correctamente.")
            html = self.fetch_code(url)
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
            score = 100
            recomendaciones = []

            if html:
                if not url.startswith("https://"):
                    descripcion_https = "URL no utiliza HTTPS, lo cual puede ser inseguro."
                    score -= 10
                    recomendaciones.append("Utilice HTTPS para mejorar la seguridad de la comunicación.")
                else:
                    descripcion_https = "URL utiliza HTTPS, lo cual es seguro."

                response = requests.get(url)
                if response.status_code == 200:
                    cod_acceso = "URL está accesible y devuelve un código 200 OK."
                else:
                    cod_acceso = f"URL está accesible pero devuelve un código de estado: {response.status_code}"
                    score -= 5
                    recomendaciones.append(f"Revise por qué la URL devuelve un código de estado: {response.status_code}")

                if response.url.startswith("https://"):
                    if response.history and not response.history[0].is_permanent_redirect:
                        descripcion_SSL = "El sitio tiene un certificado SSL válido."
                    else:
                        descripcion_SSL = "El sitio tiene un certificado SSL, pero puede ser inválido o caducado."
                        score -= 10
                        recomendaciones.append("Revise el certificado SSL y asegúrese de que sea válido y no esté caducado.")

                if self.scan_for_sql_injection(html):
                    sql_i = "Se detectó una posible vulnerabilidad de inyección SQL."
                    score -= 20
                    recomendaciones.append("Implemente procedimientos para evitar inyección SQL, como usar consultas preparadas.")
                else:
                    sql_i = "No se detectaron vulnerabilidades de inyección SQL."

                if self.scan_for_xss(html):
                    xss = "Se detectaron posibles vulnerabilidades XSS."
                    score -= 20
                    recomendaciones.append("Utilice técnicas de sanitización para prevenir ataques XSS.")
                else:
                    xss = "No se detectaron vulnerabilidades XSS."

                if self.scan_for_csrf(html):
                    csrf = "Se detectaron posibles vulnerabilidades CSRF."
                    score -= 15
                    recomendaciones.append("Implemente tokens CSRF para protegerse contra este tipo de ataques.")
                else:
                    csrf = "No se detectaron vulnerabilidades CSRF."

                if self.check_directory_listing(html):
                    listing = "El listado de directorios está habilitado - posible vulnerabilidad."
                    score -= 10
                    recomendaciones.append("Desactive el listado de directorios en el servidor web.")
                else:
                    listing = "El listado de directorios no está habilitado."

                if self.check_exposed_version_info(html):
                    exposed = "Se expone información de versión - posible vulnerabilidad."
                    score -= 10
                    recomendaciones.append("Oculte la información de versión del servidor para evitar que sea utilizada por atacantes.")
                else:
                    exposed = "No se expone información de versión."

                if self.check_vulnerable_libraries(html):
                    libraries = "Se utilizan bibliotecas vulnerables - posible vulnerabilidad."
                    score -= 20
                    recomendaciones.append("Actualice las bibliotecas a sus versiones más recientes para mitigar vulnerabilidades conocidas.")
                else:
                    libraries = "No se detectaron bibliotecas vulnerables."

                descripcion_url = url
                self.insert_request(descripcion_https, cod_acceso, descripcion_SSL, descripcion_url, sql_i, xss, csrf, listing, exposed, libraries)
                resultados = {
                    "descripcion_https": descripcion_https,
                    "cod_acceso": cod_acceso,
                    "descripcion_SSL": descripcion_SSL,
                    "descripcion_url": descripcion_url,
                    "sql_injection": sql_i,
                    "xss": xss,
                    "csrf": csrf,
                    "directory_listing": listing,
                    "exposed_version_info": exposed,
                    "vulnerable_libraries": libraries,
                    "score": score,
                    "recomendaciones": recomendaciones
                }
        except sqlite3.Error as e:
            print("Error al conectar a la base de datos:", e)
        finally:
            if self.connection:
                self.connection.close()
                print("Conexión cerrada.")
        return resultados

# Para pruebas manuales
if __name__ == "__main__":
    url_to_check = input("Introduce la URL a verificar: ")
    scanner = SecurityScanner()
    resultados = scanner.run(url_to_check)
    print(resultados)
