from flask import Flask, request, jsonify
import sqlite3

app = Flask(__name__)
DATABASE = 'bd_data.sqlite'

def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn


#http://127.0.0.1:5000/requests
#http://127.0.0.1:5000/requests?id=6
@app.route('/requests', methods=['GET'])
def get_requests():
    id = request.args.get('id')
    conn = get_db_connection()

    if id:
        request_data = conn.execute('SELECT * FROM requests WHERE id = ?', (id,)).fetchone()
        conn.close()
        if request_data is None:
            return jsonify({'Error': 'El registro en BD con id ' + id + ' no existe'}), 404
        return jsonify(dict(request_data))
    else:
        requests_list = conn.execute('SELECT * FROM requests').fetchall()
        conn.close()
        return jsonify([dict(ix) for ix in requests_list])
    
    """_summary_
    http://127.0.0.1:5000/request
    {
    "descripcion_https": "HTTPS description",
    "cod_acceso": "Access code",
    "descripcion_SSL": "SSL description",
    "descripcion_url": "URL description",
    "sql_i": "SQL injection details",
    "xss": "XSS details",
    "csrf": "CSRF details",
    "listing": "Listing details",
    "exposed": "Exposed details",
    "libraries": "Libraries details"
}
    Returns:
        _type_: _description_
    """
@app.route('/request', methods=['POST'])
def create_request():
    new_request = request.get_json()

    # Verificar que los campos requeridos estén presentes
    required_fields = [
        'descripcion_https', 'cod_acceso', 'descripcion_SSL', 'descripcion_url',
        'sql_i', 'xss', 'csrf', 'listing', 'exposed', 'libraries'
    ]
    for field in required_fields:
        if field not in new_request:
            return jsonify({'error': 'Bad Request', 'message': f'{field} is required'}), 400

    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute('INSERT INTO requests (descripcion_https, cod_acceso, descripcion_SSL, descripcion_url, sql_i, xss, csrf, listing, exposed, libraries) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                       (new_request['descripcion_https'], new_request['cod_acceso'], new_request['descripcion_SSL'], new_request['descripcion_url'], new_request['sql_i'], new_request['xss'], new_request['csrf'], new_request['listing'], new_request['exposed'], new_request['libraries']))
        conn.commit()
        request_id = cursor.lastrowid
    except sqlite3.IntegrityError:
        return jsonify({'error': 'Request with this ID already exists'}), 409
    finally:
        conn.close()

    return jsonify({'id': request_id}), 201

    """_summary_
    Ingresa la URL: http://127.0.0.1:5000/request/{request_id} (reemplaza {request_id} con el ID del registro que deseas actualizar).
    Ve a la pestaña Body.
    Selecciona raw y luego elige JSON en el menú desplegable al lado de raw.
    Returns:
        _type_: _description_
    """
@app.route('/request/<int:request_id>', methods=['PUT'])
def update_request(request_id):
    updated_request = request.get_json()
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute('''
        UPDATE requests 
        SET descripcion_https = ?, cod_acceso = ?, descripcion_SSL = ?, descripcion_url = ?, sql_i = ?, xss = ?, csrf = ?, listing = ?, exposed = ?, libraries = ? 
        WHERE id = ?
    ''', (
        updated_request['descripcion_https'], updated_request['cod_acceso'], updated_request['descripcion_SSL'], 
        updated_request['descripcion_url'], updated_request['sql_i'], updated_request['xss'], 
        updated_request['csrf'], updated_request['listing'], updated_request['exposed'], 
        updated_request['libraries'], request_id
    ))
    conn.commit()
    conn.close()

    if cursor.rowcount == 0:
        return jsonify({'error': 'Request not found'}), 404

    return jsonify({'id': request_id}), 200

# http://127.0.0.1:5000/request/{request_id} (reemplaza {request_id} por el id del registro que quieren eliminar
@app.route('/request/<int:request_id>', methods=['DELETE'])
def delete_request(request_id):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute('DELETE FROM requests WHERE id = ?', (request_id,))
    conn.commit()
    conn.close()

    if cursor.rowcount == 0:
        return jsonify({'error': 'Request not found'}), 404

    return 'Registro eliminado correctamente', 204


if __name__ == '__main__':
    app.run(debug=True)