#MÓDULO DE CONEXIÓN  A LA BASE DE DATOS MySQL DE OPTIJIMENEZ
import os
import mysql.connector
from dotenv import load_dotenv

load_dotenv()  # lee el archivo .env

def conectar():
    conexion = mysql.connector.connect(
        host=os.getenv("DB_HOST"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        database=os.getenv("DB_NAME")
    )

    return conexion


