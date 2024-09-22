from flask import Flask, render_template, request, redirect, url_for, flash,session,jsonify,send_file,send_from_directory
import os
from flask_session import Session
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func,desc,or_,extract
from datetime import time, timedelta
from flask_bcrypt import Bcrypt
import uuid
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from uuid import uuid4
import datetime
import pytz

# Zona horaria de Colombia
timezone = pytz.timezone('America/Bogota')

app = Flask(__name__, static_folder='static')

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL') #Base adopta

#CAMBIAR A VARIABLE DE ENTORNO OJO

# Configuración de engine options para habilitar pool_pre_ping 
app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {
   'pool_pre_ping': True,       # Verificar la conexión antes de usarla
    'pool_size': 10,             # Ajusta el tamaño del pool de conexiones (cambia según tus necesidades)
    'max_overflow': 20,          # Número de conexiones adicionales que pueden abrirse si el pool está lleno
    'pool_timeout': 30,          # Tiempo máximo para esperar por una conexión en el pool antes de fallar
    'pool_recycle': 1800,        # Recicla las conexiones cada 30 minutos (1800 segundos)
    'connect_args': {
        'connect_timeout': 10,   # Tiempo de espera máximo para establecer la conexión (10 segundos)
        'sslmode': 'disable',    # Asegura que se use SSL en las conexiones, si está configurado
    }
}
db = SQLAlchemy(app)
# Configuración de la base de datos SQLAlchemy

# Configuración de Flask-Session para almacenar sesiones en cookies
app.config['SESSION_TYPE'] = 'filesystem'  # Almacena las sesiones en archivos locales
app.config['JWT_SECRET_KEY'] = 'yLxqdG0BGUft0Ep'  # Cambia por una clave secreta segura

# Configuraciones relacionadas con las cookies de JWT
app.config['JWT_TOKEN_LOCATION'] = ['cookies']  # Especifica que los tokens JWT estarán en cookies
app.config['JWT_ACCESS_COOKIE_NAME'] = 'access_token_cookie'  # Nombre de la cookie de acceso
app.config['JWT_REFRESH_COOKIE_NAME'] = 'refresh_token_cookie'  # Nombre de la cookie de refresh token
app.config['JWT_COOKIE_CSRF_PROTECT'] = True  # Habilita protección CSRF en las cookies

# Opcional: Configura la expiración del token de acceso y refresh
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = 3600  # Token de acceso expira en 1 hora
app.config['JWT_REFRESH_TOKEN_EXPIRES'] = 86400  # Token de refresh expira en 1 día
app.config['JWT_COOKIE_CSRF_PROTECT'] = False

# Inicializar JWTManager
jwt = JWTManager(app)



# Inicializa la extensión Flask-Session
Session(app)


# Configuración de Bcrypt para el manejo de contraseñas
bcrypt = Bcrypt(app)



# Definición del modelo de Usuarios con SQLAlchemy
class Usuario(db.Model):
    __tablename__ = 'usuarios'

    __table_args__ = {'schema': 'general'}  # Nombre del esquema
    # Campos de la tabla Usuarios
    correo = db.Column(db.String(100), primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    contrasena = db.Column(db.String(60), nullable=False)
    isAdmin = db.Column(db.Boolean, default=False)
    

# Definición del modelo de Michi con SQLAlchemy
class Michi(db.Model):
    __tablename__ = 'michis'
    __table_args__ = {'schema': 'general'}  # Nombre del esquema
    

    # Campos de la tabla Empleados
    id = db.Column(db.String(100), primary_key=True, default=lambda: str(uuid.uuid4()))
    nombre = db.Column(db.String(100), nullable=False)
    sexo = db.Column(db.String(100), nullable=False)
    edad = db.Column(db.String(60), nullable=False)
    esterilizado = db.Column(db.Boolean, default=False)
    condicion=db.Column(db.String(100))
    personalidad=db.Column(db.String(100), nullable=False)
    edadUnidad=db.Column(db.String(100), nullable=False)
    imgSrc=db.Column(db.String(100), nullable=False)


# Definición del modelo de Solicitud con SQLAlchemy
class Solicitud(db.Model):
    __tablename__ = 'solicitudes'
    __table_args__ = {'schema': 'general'}  # Nombre del esquema
        

    # Campos de la tabla solicitudes
    id = db.Column(db.String(100), primary_key=True, default=lambda: str(uuid.uuid4()))
    estado = db.Column(db.String(100), nullable=False)
    comentarios = db.Column(db.String(300), nullable=False)
    michi = db.Column(db.String(60), nullable=False)
    fecha_solicitud = db.Column(db.Date, nullable=False)

    # Nuevos campos basados en la imagen proporcionada
    nombre_solicitante = db.Column(db.String(100), nullable=False)
    correo_solicitante = db.Column(db.String(100), nullable=False)
    edad_solicitante = db.Column(db.Integer, nullable=False)
    telefono_solicitante = db.Column(db.String(100), nullable=False)
    domicilio_solicitante = db.Column(db.String(100), nullable=False)
    tipo_vivienda = db.Column(db.String(100), nullable=False)
    propia_rentada = db.Column(db.String(100), nullable=False)
    permiten_mascotas = db.Column(db.String(100), nullable=False)
    numero_personas = db.Column(db.String(100), nullable=False)
    otras_mascotas = db.Column(db.String(100), nullable=False)
    espacio = db.Column(db.String(100), nullable=False)
    id_solicitante = db.Column(db.String(100), nullable=False)
    solicitud_nombre= db.Column(db.String(100), nullable=False)


# Definición del modelo de Donacion con SQLAlchemy
class Donacion(db.Model):
    __tablename__ = 'donaciones'

    __table_args__ = {'schema': 'general'}  # Nombre del esquema
    # Campos de la tabla Usuarios
    id = db.Column(db.String(100), primary_key=True, default=lambda: str(uuid.uuid4()))
    nombre_donador = db.Column(db.String(100), nullable=False)
    monto = db.Column(db.Float, nullable=False)
    fecha = db.Column(db.Date, nullable=False)


# Rutas para servir los archivos estáticos de Angular
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')


# Ruta para el inicio de sesión
@app.route('/api/login', methods=['GET', 'POST'])
def login():
    correo = request.json.get('correo')
    password = request.json.get('password')

    user = Usuario.query.filter_by(correo=correo).first()

    if user and bcrypt.check_password_hash(user.contrasena, password):
        # Si las credenciales son correctas, crear el token de acceso
        access_token = create_access_token(identity={'correo': user.correo, 'isAdmin': user.isAdmin})

        # Crear respuesta con el token en una cookie HTTPOnly
        response = jsonify({'success': True, 'message': 'Inicio de sesión exitoso'})
        response.set_cookie('access_token_cookie', access_token, httponly=True, secure=True, samesite='Lax')

        return response, 200
    else:
        return jsonify({'success': False, 'message': 'Credenciales incorrectas'}), 401



@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    nombre = data.get('nombre')
    correo = data.get('correo')
    contrasena = data.get('contrasena')

    # Validate data
    if not nombre or not correo or not contrasena:
        return jsonify({'success': False, 'message': 'Datos incompletos'}), 400

    # Check if the user already exists
    existing_user = Usuario.query.filter_by(correo=correo).first()
    if existing_user:
        return jsonify({'success': False, 'message': 'El usuario ya existe'}), 409

    # Hash the password
    hashed_password = bcrypt.generate_password_hash(contrasena).decode('utf-8')

    # Create new user
    new_user = Usuario(
        nombre=nombre,
        correo=correo,
        contrasena=hashed_password,
        isAdmin=False 
    )

    # Add to the database
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'success': True, 'message': 'Usuario registrado exitosamente'}), 201
           
# Ruta para cerrar sesión
@app.route('/api/logout', methods=['POST'])
def logout():
    response = jsonify({'message': 'Cierre de sesión exitoso'})
    response.set_cookie('access_token_cookie', '', expires=0)  # Eliminar la cookie
    return response, 200


# Ruta protegida
@app.route('/api/protected', methods=['GET','POST'])
@jwt_required(optional=True)
def protected():
    current_user = get_jwt_identity()
    
    if current_user:
        # Asume que  es una propiedad en el token JWT
        isAdmin = current_user.get('isAdmin', False)
        return jsonify(logged_in_as=current_user, isAuthenticated=True, isAdmin=isAdmin), 200
    else:
        return jsonify(logged_in_as=None, isAuthenticated=False, isAdmin=False), 200
    



@app.route('/api/michis', methods=['GET','POST','PUT','DELETE'])
def handle_michis():
    if request.method == 'GET':
        # Obtener parámetros de consulta
        michi_id = request.args.get('id')  # Buscar por ID
        nombre = request.args.get('nombre')  # Buscar por nombre

        if michi_id:
            # Buscar un michi por su ID
            michi = Michi.query.filter_by(id=michi_id).first()
            if not michi:
                return jsonify({'message': 'Michi no encontrado'}), 404
            michi_data = {
                'id': michi.id,
                'nombre': michi.nombre,
                'edadNumero': michi.edad,
                'edadUnidad': michi.edadUnidad,
                'sexo': michi.sexo,
                'esterilizado': 'Si' if michi.esterilizado else 'No',
                'salud': michi.condicion,
                'personalidad': michi.personalidad,
                'imgSrc': michi.imgSrc
            }
            return jsonify(michi_data), 200

        elif nombre:
            # Buscar michis por nombre (con LIKE para búsquedas parciales)
            michis = Michi.query.filter(Michi.nombre.ilike(f'%{nombre}%')).all()
            michis_json = [{
                'id': michi.id,
                'nombre': michi.nombre,
                'edadNumero': michi.edad,
                'edadUnidad': michi.edadUnidad,
                'sexo': michi.sexo,
                'esterilizado': 'Si' if michi.esterilizado else 'No',
                'salud': michi.condicion,
                'personalidad': michi.personalidad,
                'imgSrc': michi.imgSrc
            } for michi in michis]

            return jsonify(michis_json), 200

        else:
            # Obtener todos los michis si no se pasa ni ID ni nombre
            michis = Michi.query.all()
            michis_json = [{
                'id': michi.id,
                'nombre': michi.nombre,
                'edadNumero': michi.edad,
                'edadUnidad': michi.edadUnidad,
                'sexo': michi.sexo,
                'esterilizado': 'Si' if michi.esterilizado else 'No',
                'salud': michi.condicion,
                'personalidad': michi.personalidad,
                'imgSrc': michi.imgSrc
            } for michi in michis]

            return jsonify(michis_json), 200

    elif request.method == 'POST':
        # Agregar un nuevo michi
        data = request.get_json()

        # Validar los datos
        if not data:
            return jsonify({'message': 'Datos incompletos'}), 400

        # Crear un nuevo objeto Michi
        nuevo_michi = Michi(
            id=str(uuid4()),  # Generar un ID único
            nombre=data['nombre'],
            edad=data['edadNumero'],
            edadUnidad=data['edadUnidad'],
            sexo=data['sexo'],
            esterilizado=data['esterilizado'].lower() == 'si',  # Convertir 'Si'/'No' en booleano
            condicion=data['salud'],
            personalidad=data['personalidad'],
            imgSrc=data['imgSrc']
        )

        # Agregar el michi a la base de datos
        db.session.add(nuevo_michi)
        db.session.commit()

        return jsonify({
            'message': 'Michi agregado exitosamente',
            'michi': {
                'id': nuevo_michi.id,
                'nombre': nuevo_michi.nombre,
                'edadNumero': nuevo_michi.edad,
                'edadUnidad': nuevo_michi.edadUnidad,
                'sexo': nuevo_michi.sexo,
                'esterilizado': 'Si' if nuevo_michi.esterilizado else 'No',
                'salud': nuevo_michi.condicion,
                'personalidad': nuevo_michi.personalidad,
                'imgSrc': nuevo_michi.imgSrc
            }
        }), 201
    
    if request.method == 'PUT':
        data = request.get_json()
        michi_id = request.args.get('id')
        # Buscar el michi por su ID
        michi = Michi.query.filter_by(id=michi_id).first()
        if not michi:
            return jsonify({'message': 'Michi no encontrado'}), 404

        # Actualizar los campos del michi
        michi.nombre = data.get('nombre', michi.nombre)
        michi.edad = data.get('edadNumero', michi.edad)
        michi.edadUnidad = data.get('edadUnidad', michi.edadUnidad)
        michi.sexo = data.get('sexo', michi.sexo)
        michi.esterilizado = data.get('esterilizado', 'No').lower() == 'si'
        michi.condicion = data.get('salud', michi.condicion)
        michi.personalidad = data.get('personalidad', michi.personalidad)
        michi.imgSrc = data.get('imgSrc', michi.imgSrc)

        # Guardar los cambios
        db.session.commit()

        return jsonify({'message': 'Michi actualizado exitosamente'}), 200

    # Manejar DELETE (eliminar un michi)
    elif request.method == 'DELETE':
        # Buscar el michi por su ID
        michi_id = request.args.get('id')  # Buscar por ID

        michi = Michi.query.filter_by(id=michi_id).first()
        if not michi:
            return jsonify({'message': 'Michi no encontrado'}), 404

        # Eliminar el michi de la base de datos
        db.session.delete(michi)
        db.session.commit()

        return jsonify({'message': 'Michi eliminado exitosamente'}), 200


@app.route('/api/solicitudes', methods=['GET','POST','PUT','DELETE'])
@jwt_required()
def handle_solicitudes():
    current_user = get_jwt_identity()
    if request.method == 'GET':
        # Obtener parámetros de consulta
        solicitud_id = request.args.get('id')  # Buscar por ID
        nombre = request.args.get('nombre')  # Buscar por nombre

        if solicitud_id:
            # Buscar un michi por su ID
            solicitud = Solicitud.query.filter_by(id=solicitud_id).first()
            if not solicitud:
                return jsonify({'message': 'Solicitud no encontrada'}), 404
            solicitud_data = {
                'id': solicitud.id,
                'michi': solicitud.michi,
                'estado': solicitud.estado,
                'fecha': solicitud.fecha_solicitud,
                'comentarios': solicitud.comentarios,
                
                # Campos adicionales del solicitante
                'nombre_solicitante': solicitud.nombre_solicitante,
                'correo_solicitante': solicitud.correo_solicitante,
                'edad_solicitante': solicitud.edad_solicitante,
                'telefono_solicitante': solicitud.telefono_solicitante,
                'domicilio_solicitante': solicitud.domicilio_solicitante,
                'tipo_vivienda': solicitud.tipo_vivienda,
                'propia_rentada': solicitud.propia_rentada,
                'permiten_mascotas': solicitud.permiten_mascotas,
                'numero_personas': solicitud.numero_personas,
                'otras_mascotas': solicitud.otras_mascotas,
                'espacio': solicitud.espacio,
                'id_solicitante': solicitud.id_solicitante,
                'solicitud_nombre':solicitud.solicitud_nombre
            }

            return jsonify(solicitud_data), 200

        elif nombre:
            # Buscar michis por nombre (con LIKE para búsquedas parciales)
            solicitudes = Solicitud.query.filter(Solicitud.solicitud_nombre.ilike(f'%{nombre}%')).order_by(desc(Solicitud.fecha_solicitud)).all()
            solicitud_json =  [{
                'id': solicitud.id,
                'michi': solicitud.michi,
                'estado': solicitud.estado,
                'fecha': solicitud.fecha_solicitud,
                'comentarios': solicitud.comentarios,
                
                # Campos adicionales del solicitante
                'nombre_solicitante': solicitud.nombre_solicitante,
                'correo_solicitante': solicitud.correo_solicitante,
                'edad_solicitante': solicitud.edad_solicitante,
                'telefono_solicitante': solicitud.telefono_solicitante,
                'domicilio_solicitante': solicitud.domicilio_solicitante,
                'tipo_vivienda': solicitud.tipo_vivienda,
                'propia_rentada': solicitud.propia_rentada,
                'permiten_mascotas': solicitud.permiten_mascotas,
                'numero_personas': solicitud.numero_personas,
                'otras_mascotas': solicitud.otras_mascotas,
                'espacio': solicitud.espacio,
                'id_solicitante': solicitud.id_solicitante,
                'solicitud_nombre':solicitud.solicitud_nombre

            } for solicitud in solicitudes]

            return jsonify(solicitud_json), 200

        else:
            # Obtener todos las solicitudes si no se pasa ni ID ni nombre
            if current_user.get('isAdmin'):
                solicitudes = Solicitud.query.order_by(desc(Solicitud.fecha_solicitud)).all()

                solicitud_json =  [{
                    'id': solicitud.id,
                    'michi': solicitud.michi,
                    'estado': solicitud.estado,
                    'fecha': solicitud.fecha_solicitud,
                    'comentarios': solicitud.comentarios,
                    
                    # Campos adicionales del solicitante
                    'nombre_solicitante': solicitud.nombre_solicitante,
                    'correo_solicitante': solicitud.correo_solicitante,
                    'edad_solicitante': solicitud.edad_solicitante,
                    'telefono_solicitante': solicitud.telefono_solicitante,
                    'domicilio_solicitante': solicitud.domicilio_solicitante,
                    'tipo_vivienda': solicitud.tipo_vivienda,
                    'propia_rentada': solicitud.propia_rentada,
                    'permiten_mascotas': solicitud.permiten_mascotas,
                    'numero_personas': solicitud.numero_personas,
                    'otras_mascotas': solicitud.otras_mascotas,
                    'espacio': solicitud.espacio,
                    'id_solicitante': solicitud.id_solicitante,
                    'solicitud_nombre':solicitud.solicitud_nombre

                } for solicitud in solicitudes]


                return jsonify(solicitud_json), 200
            else:
                correo=current_user.get('correo')
                solicitudes = Solicitud.query.filter(Solicitud.id_solicitante==correo).order_by(desc(Solicitud.fecha_solicitud)).all()

                solicitud_json =  [{
                    'id': solicitud.id,
                    'michi': solicitud.michi,
                    'estado': solicitud.estado,
                    'fecha': solicitud.fecha_solicitud,
                    'comentarios': solicitud.comentarios,
                    
                    # Campos adicionales del solicitante
                    'nombre_solicitante': solicitud.nombre_solicitante,
                    'correo_solicitante': solicitud.correo_solicitante,
                    'edad_solicitante': solicitud.edad_solicitante,
                    'telefono_solicitante': solicitud.telefono_solicitante,
                    'domicilio_solicitante': solicitud.domicilio_solicitante,
                    'tipo_vivienda': solicitud.tipo_vivienda,
                    'propia_rentada': solicitud.propia_rentada,
                    'permiten_mascotas': solicitud.permiten_mascotas,
                    'numero_personas': solicitud.numero_personas,
                    'otras_mascotas': solicitud.otras_mascotas,
                    'espacio': solicitud.espacio,
                    'id_solicitante': solicitud.id_solicitante,
                    'solicitud_nombre':solicitud.solicitud_nombre

                } for solicitud in solicitudes]


                return jsonify(solicitud_json), 200
                

    elif request.method == 'POST':
        # Agregar un nuevo michi
        data = request.get_json()
        current_user = get_jwt_identity()

        # Validar los datos
        if not data:
            return jsonify({'message': 'Datos incompletos'}), 400
        nombre_michi=Michi.query.filter_by(id=data['michiId']).first()
        # Crear un nuevo objeto Solicitud
        nueva_solicitud = Solicitud(
            id=str(uuid4()),  # Generar un ID único
            estado='Pendiente',
            comentarios='',
            michi=  data['michiId'] , 
            fecha_solicitud=datetime.datetime.now(timezone).strftime('%Y-%m-%d'),  # Asegúrate de que esté en formato Date correcto

            # Información del solicitante
            nombre_solicitante=data['nombre'],
            correo_solicitante=data['correo'],
            edad_solicitante=data['edad'],
            telefono_solicitante=data['telefono'],
            domicilio_solicitante=data['domicilio'],
            tipo_vivienda=data['vivienda'],
            propia_rentada=data['propiedad'],
            permiten_mascotas=data['permiteMascotas'],
            numero_personas=data['personasHogar'],
            otras_mascotas=data['otrasMascotas'],
            espacio=data['espacioDisponible'],
            id_solicitante= current_user.get('correo'),
            solicitud_nombre= 'Solicitud para ' + nombre_michi.nombre +' por ' + data['nombre']

        )

        # Agregar la solicitud a la base de datos
        db.session.add(nueva_solicitud)
        db.session.commit()

        return jsonify({
            'message': 'Solicitud creada exitosamente',
            'solicitud': {
                'id': nueva_solicitud.id,
                'estado': nueva_solicitud.estado,
                'comentarios': nueva_solicitud.comentarios,
                'michi': nueva_solicitud.michi,
                'fecha_solicitud': nueva_solicitud.fecha_solicitud,

                # Información del solicitante
                'nombre_solicitante': nueva_solicitud.nombre_solicitante,
                'correo_solicitante': nueva_solicitud.correo_solicitante,
                'edad_solicitante': nueva_solicitud.edad_solicitante,
                'telefono_solicitante': nueva_solicitud.telefono_solicitante,
                'domicilio_solicitante': nueva_solicitud.domicilio_solicitante,
                'tipo_vivienda': nueva_solicitud.tipo_vivienda,
                'propia_rentada': nueva_solicitud.propia_rentada,
                'permiten_mascotas': nueva_solicitud.permiten_mascotas,
                'numero_personas': nueva_solicitud.numero_personas,
                'otras_mascotas': nueva_solicitud.otras_mascotas,
                'espacio': nueva_solicitud.espacio,
                'id_solicitante': nueva_solicitud.id_solicitante,
                'solicitud_nombre':nueva_solicitud.solicitud_nombre
            }
        }), 201
    
    if request.method == 'PUT':
        data = request.get_json()
        solicitud_id = request.args.get('id')
        # Buscar el michi por su ID
        solicitud = Solicitud.query.filter_by(id=solicitud_id).first()
        if not solicitud:
            return jsonify({'message': 'Solicitud no encontrada'}), 404

        # Actualizar los campos del michi
        solicitud.estado = data.get('estado', solicitud.estado)
        solicitud.comentarios = data.get('comentarios', solicitud.comentarios)
        

        # Guardar los cambios
        db.session.commit()

        return jsonify({'message': 'Michi actualizado exitosamente'}), 200

    # Manejar DELETE (eliminar un michi)
    elif request.method == 'DELETE':
        # Buscar el michi por su ID
        solicitud_id = request.args.get('id')  # Buscar por ID

        solicitud = Solicitud.query.filter_by(id=solicitud_id).first()
        if not solicitud:
            return jsonify({'message': 'Michi no encontrado'}), 404

        # Eliminar el michi de la base de datos
        db.session.delete(solicitud)
        db.session.commit()

        return jsonify({'message': 'Michi eliminado exitosamente'}), 200
@app.route('/api/donaciones', methods=['POST'])
def recibir_donacion():
    data = request.get_json()
    titular = data.get('titular')
    monto = float(data.get('monto'))
    fecha=datetime.datetime.now(timezone).strftime('%Y-%m-%d')

    nueva_donacion = Donacion(
        nombre_donador=titular,
        monto=monto,
        fecha=fecha
    )
    # Procesar la donación (ejemplo: guardar en base de datos)

    # Agregar la donacion a la base de datos
    db.session.add(nueva_donacion)
    db.session.commit()
    # Responder al frontend
    return jsonify({'message': 'Donación recibida exitosamente'}), 200

if __name__ == '__main__':
    app.run(debug=True, port=os.getenv("PORT", default=5000))
