
import mysql.connector

conexion = mysql.connector.connect(
    host="localhost",
    user="root",
    password="12345678",
    database="optijimenez"
)

print("Conexión exitosa con MySQL")

conexion.close()
