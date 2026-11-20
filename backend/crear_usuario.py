from getpass import getpass
from werkzeug.security import generate_password_hash
from conexion import conectar

nombre = input("Nombre de usuario: ").strip()
rol = input("Rol (admin/gestor): ").strip().lower()

if rol not in ("admin", "gestor"):
    raise SystemExit("Rol no válido")

clave = getpass("Clave: ")
confirmar = getpass("Repite la clave: ")

if clave != confirmar or len(clave) < 10:
    raise SystemExit("Las claves no coinciden o tienen menos de 10 caracteres")

clave_hash = generate_password_hash(clave)

conexion = conectar()
cursor = conexion.cursor()
cursor.execute(
    "INSERT INTO usuario (nombre_usuario, clave_hash, rol) VALUES (%s, %s, %s)",
    (nombre, clave_hash, rol)
)
conexion.commit()
cursor.close()
conexion.close()

print("Usuario creado")