#MÓDULO DE CONEXIÓN  A LA BASE DE DATOS MySQL DE OPTIJIMENEZ
import mysql.connector

def conectar():
    conexion = mysql.connector.connect(
        host="localhost",
        user="root",
        password="12345678",
        database="optijimenez"
    )

    return conexion


# CONEXIÓN SITIO WEB PYTHON CON MYSQL
#import mysql.connector

#conexion = mysql.connector.connect(
 #  host="localhost",
  # user="root",
   #password="12345678",
   #database="optijimenez"
#)

#print("Conexión exitosa con MySQL")

#conexion.close()

# CONSULTAR TABLA CLIENTE Y TRAER NOMBRE, APELLIDO Y EMAIL

#import mysql.connector

#conexion = mysql.connector.connect(
 #   host="localhost",
  #  user="root",
   # password="12345678",
   # database="optijimenez"
#)

#cursor = conexion.cursor()

#cursor.execute("SELECT * FROM cliente")

#clientes = cursor.fetchall()

#for cliente in clientes:
 #   print("Nomnbre: " + cliente[2],
  #        "\n Apellido: " + cliente[3],
   #       "\n Email: " + cliente[6]
    #      )

#cursor.close()
#conexion.close()

# CONSULTAR LA CEDULA DEL CLIENTE

#import mysql.connector

#conexion = mysql.connector.connect(
 #   host="localhost",
  #  user="root",
   # password="12345678",
   # database="optijimenez"
#)

#cursor = conexion.cursor()

#cursor.execute("SELECT * FROM cliente WHERE cc_cliente = '1000000000'")

#clientes = cursor.fetchall()

#for cliente in clientes:
 #   print(f"Cedula encontrada: {cliente[1]}")
    
#cursor.close()
#conexion.close()

#PARA UNA CONSULTA SIN RESULTADO

#import mysql.connector

#conexion = mysql.connector.connect(
 #   host="localhost",
  #  user="root",
   # password="12345678",
    #database="optijimenez"
#)

#cursor = conexion.cursor()

#cursor.execute("SELECT * FROM cliente WHERE cc_cliente = '1000000000'")

#clientes = cursor.fetchall()

#if not clientes:
 #   print("No se encontró ningún cliente.") 
#else:
 #   for cliente in clientes:
  #      print(f"Cedula encontrada: {cliente[1]}")
            
    
#cursor.close()
#conexion.close()

# CONSULTA POR NOMBRE, APELLIDO Y CELULAR

#import mysql.connector

#conexion = mysql.connector.connect(
 #   host="localhost",
  #  user="root",
   # password="12345678",
    #database="optijimenez"
#)

#cursor = conexion.cursor()

#cursor.execute("SELECT * FROM cliente")

#clientes = cursor.fetchall()

#for cliente in clientes:
 #   print("Nombre: " + cliente[2],
  #       "\nApellido: " + cliente[3],
   #      "\nCelular: " + cliente[4]
    #      )

#cursor.close()
#conexion.close()

#ESCRIBIR EL NUMERO DE WHATSAPP PARA BUSCAR

#import mysql.connector

#conexion = mysql.connector.connect(
 #   host="localhost",
  #  user="root",
   # password="12345678",
    #database="optijimenez"
#)


#cursor = conexion.cursor()

#whatsapp = input("Ingrese el número de Whatsapp: ")

#cursor.execute(
 #   "SELECT * FROM cliente WHERE whatsapp = %s",
  #  (whatsapp,)
#)

#clientes = cursor.fetchall()

#for cliente in clientes:
 #   print("Nombre: " + cliente[2],
  #       "\nApellido: " + cliente[3],
   #      "\nCelular: " + cliente[4],
    #     "\nWhatsapp: " + cliente[5]
     #     )

#cursor.close()
#conexion.close()


