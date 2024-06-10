from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
from app import SecurityScanner

app = Flask(__name__)
DATABASE = 'bd_data.sqlite'
CORS(app)

def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

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
    
@app.route('/requests/<int:request_id>', methods=['GET'])
def get_request_by_id(request_id):
    conn = get_db_connection()
    request_data = conn.execute('SELECT * FROM requests WHERE id = ?', (request_id,)).fetchone()
    conn.close()

    if request_data:
        return jsonify(dict(request_data))
    else:
        return jsonify({'Error': f'El registro en BD con id {request_id} no existe'}), 404

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


# @app.route('/request', methods=['POST'])
# def create_request():
    # data = request.get_json()

    # required_fields = [
    #     'url'
    # ]
    # for field in required_fields:
    #     if field not in data:
    #         return jsonify({'error': 'Bad Request', 'message': f'{field} is required'}), 400

    # url_to_check = data['url']

    # try:
    #     subprocess.run(['python', 'app.py', url_to_check], check=True)
    #     return jsonify({'message': 'app.py executed successfully with the provided URL'}), 200
    # except subprocess.CalledProcessError as e:
    #     return jsonify({'error': 'Failed to execute app.py', 'message': str(e)}), 500
    
@app.route('/requests', methods=['POST'])
def handle_post_request():
    data = request.get_json()

    required_fields = [
        'url'
    ]
    # Verificamos si se proporcionó la URL en los datos recibidos
    if not all(field in data for field in required_fields):
        return jsonify({'error': 'Missing required field(s)'}), 400

    # Obtenemos la URL del cuerpo de la solicitud
    url_to_check = data['url']

    # Instanciamos la clase SecurityScanner y llamamos al método run()
    scanner = SecurityScanner()
    scanner.run(url_to_check)

    return jsonify({'message': 'Security scan executed successfully with the provided URL'}), 200


if __name__ == '__main__':
    app.run(debug=True)