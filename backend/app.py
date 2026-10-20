# APLICACIÓN FLASK PARA GESTIONAR EL BACKEND DE OPTI-JIMÉNEZ.

from flask import Flask, jsonify, request, session
from flask_cors import CORS
from conexion import conectar
from werkzeug.security import check_password_hash

app = Flask(__name__)

app.config["SECRET_KEY"] = "cambia-esta-clave-por-una-clave-segura"

CORS(app)


@app.route("/")
def inicio():
    return "Backend de Opti-Jimenez funcionando correctamente"


@app.route("/clientes")
def consultar_clientes():
    conexion = conectar()
    cursor = conexion.cursor()

    cursor.execute("SELECT * FROM cliente")
    clientes = cursor.fetchall()

    cursor.close()
    conexion.close()

    return jsonify(clientes)


@app.route("/clientes/<cedula>")
def buscar_cliente(cedula):
    conexion = conectar()
    cursor = conexion.cursor()

    cursor.execute(
        "SELECT * FROM cliente WHERE cc_cliente = %s",
        (cedula,)
    )

    cliente = cursor.fetchone()

    cursor.close()
    conexion.close()

    if cliente is None:
        return jsonify({"mensaje": "Cliente no encontrado"}), 404

    return jsonify(cliente)


@app.route("/clientes/<cedula>/pedidos")
def consultar_pedidos_cliente(cedula):
    conexion = conectar()
    cursor = conexion.cursor(dictionary=True)

    cursor.execute(
        """
        SELECT
            p.id_pedido,
            p.fecha_pedido,
            p.valor_total,
            tl.tipo_lente,
            ml.material_lente,
            m.montura,
            t.tratamiento
        FROM cliente c
        INNER JOIN pedido p
            ON c.id_cliente = p.id_cliente
        INNER JOIN tipo_lente tl
            ON p.id_tipo_lente = tl.id_tipo_lente
        INNER JOIN material_lente ml
            ON p.id_material_lente = ml.id_material_lente
        INNER JOIN montura m
            ON p.id_montura = m.id_montura
        INNER JOIN tratamiento t
            ON p.id_tratamiento = t.id_tratamiento
        WHERE c.cc_cliente = %s
        ORDER BY p.fecha_pedido DESC
        """,
        (cedula,)
    )

    pedidos = cursor.fetchall()

    cursor.close()
    conexion.close()

    if not pedidos:
        return jsonify({
            "mensaje": "El cliente no tiene pedidos registrados"
        }), 404

    return jsonify(pedidos)


@app.route("/clientes/<cedula>/pedidos/<int:id_pedido>/formula")
def consultar_formula(cedula, id_pedido):
    conexion = conectar()
    cursor = conexion.cursor(dictionary=True)

    cursor.execute(
        """
        SELECT f.*
        FROM formula f
        INNER JOIN pedido p
            ON f.id_pedido = p.id_pedido
        INNER JOIN cliente c
            ON p.id_cliente = c.id_cliente
        WHERE c.cc_cliente = %s
          AND p.id_pedido = %s
        """,
        (cedula, id_pedido)
    )

    formula = cursor.fetchone()

    cursor.close()
    conexion.close()

    if formula is None:
        return jsonify({
            "mensaje": "No se encontró una fórmula para ese cliente y pedido"
        }), 404

    return jsonify(formula)

@app.route("/pedidos/<numero_pedido>")
def consultar_pedido(numero_pedido):
    conexion = conectar()
    cursor = conexion.cursor(dictionary=True)

    try:
        cursor.execute(
            """
            SELECT
                p.numero_pedido,
                p.fecha_pedido,
                p.estado_pedido,
                p.fecha_estimada_entrega,
                tl.tipo_lente
            FROM pedido p
            INNER JOIN tipo_lente tl
                ON p.id_tipo_lente = tl.id_tipo_lente
            WHERE p.numero_pedido = %s
            """,
            (numero_pedido,)
        )

        pedido = cursor.fetchone()

    finally:
        cursor.close()
        conexion.close()

    if pedido is None:
        return jsonify({
            "mensaje": "No encontramos un pedido con ese número"
        }), 404

    return jsonify(pedido)


if __name__ == "__main__":
    app.run(debug=True)

