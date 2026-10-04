
from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import os
from datetime import datetime


app = Flask(__name__)

CORS(app)


# =========================================
# ORDERS FILE
# =========================================

ORDERS_FILE = "orders.json"


# =========================================
# CREATE ORDERS FILE IF NOT EXISTS
# =========================================

def create_orders_file():

    if not os.path.exists(ORDERS_FILE):

        with open(
            ORDERS_FILE,
            "w",
            encoding="utf-8"
        ) as file:

            json.dump(
                [],
                file,
                indent=4
            )


# =========================================
# READ ORDERS
# =========================================

def read_orders():

    create_orders_file()

    try:

        with open(
            ORDERS_FILE,
            "r",
            encoding="utf-8"
        ) as file:

            return json.load(file)

    except:

        return []


# =========================================
# SAVE ORDERS
# =========================================

def save_orders(orders):

    with open(
        ORDERS_FILE,
        "w",
        encoding="utf-8"
    ) as file:

        json.dump(
            orders,
            file,
            indent=4,
            ensure_ascii=False
        )


# =========================================
# HOME
# =========================================

@app.route("/")
def home():

    return """
    <h1>Thulir Fresh Food Products</h1>
    <p>Backend is Running Successfully!</p>
    """


# =========================================
# TEST API
# =========================================

@app.route("/api/test")
def test():

    return jsonify({

        "status": "success",

        "message":
        "Thulir Backend is Working!"

    })


# =========================================
# PRODUCTS API
# =========================================

@app.route("/api/products")
def products():

    products = [

        {
            "id": 1,
            "name": "Wrapped Full Corn",
            "price": 30
        },

        {
            "id": 2,
            "name": "Fresh Full Corn",
            "price": 25
        },

        {
            "id": 3,
            "name": "Packet Corn 200 gms",
            "price": 36
        },

        {
            "id": 4,
            "name": "Packet Corn 500 gms",
            "price": 100
        },

        {
            "id": 5,
            "name": "Packet Corn 1 kg",
            "price": 200
        },

        {
            "id": 6,
            "name": "Packet Corn 1 kg Pouch",
            "price": 200
        },

        {
            "id": 7,
            "name": "Baby Corn 200 gms",
            "price": 65
        },

        {
            "id": 8,
            "name": "Baby Corn 1 kg",
            "price": 250
        }

    ]

    return jsonify(products)


# =========================================
# PLACE ORDER
# =========================================

@app.route(
    "/api/orders",
    methods=["POST"]
)
def place_order():

    try:

        data = request.get_json()


        if not data:

            return jsonify({

                "status": "error",

                "message":
                "No order data received."

            }), 400


        customer = data.get(
            "customer",
            {}
        )


        products = data.get(
            "products",
            []
        )


        payment_method = data.get(
            "payment_method",
            ""
        )


        total = data.get(
            "total",
            0
        )


        # =====================================
        # VALIDATION
        # =====================================

        if not customer:

            return jsonify({

                "status": "error",

                "message":
                "Customer details are required."

            }), 400


        if not products:

            return jsonify({

                "status": "error",

                "message":
                "No products found in order."

            }), 400


        if not payment_method:

            return jsonify({

                "status": "error",

                "message":
                "Payment method is required."

            }), 400


        # =====================================
        # READ OLD ORDERS
        # =====================================

        orders = read_orders()


        # =====================================
        # CREATE ORDER ID
        # =====================================

        order_number = (
            len(orders) + 1
        )


        order_id = (
            "THULIR-" +
            str(
                1000 +
                order_number
            )
        )


        # =====================================
        # CREATE ORDER
        # =====================================

        order = {

            "order_id":
            order_id,

            "customer":
            customer,

            "products":
            products,

            "payment_method":
            payment_method,

            "total":
            total,

            "status":
            "Pending",

            "order_date":
            datetime.now().isoformat()

        }


        # =====================================
        # ADD ORDER
        # =====================================

        orders.append(order)


        # =====================================
        # SAVE ORDER
        # =====================================

        save_orders(orders)


        print(
            "New Order Received:",
            order_id
        )


        # =====================================
        # RESPONSE
        # =====================================

        return jsonify({

            "status":
            "success",

            "message":
            "Order placed successfully!",

            "order_id":
            order_id,

            "total":
            total

        })


    except Exception as error:

        print(
            "Order Error:",
            error
        )


        return jsonify({

            "status":
            "error",

            "message":
            str(error)

        }), 500


# =========================================
# GET ALL ORDERS
# =========================================

@app.route(
    "/api/orders",
    methods=["GET"]
)
def get_orders():

    try:

        orders = read_orders()


        return jsonify({

            "status":
            "success",

            "orders":
            orders

        })


    except Exception as error:

        return jsonify({

            "status":
            "error",

            "message":
            str(error)

        }), 500


# =========================================
# UPDATE ORDER STATUS
# =========================================

@app.route(
    "/api/orders/<order_id>/status",
    methods=["PUT"]
)
def update_order_status(
    order_id
):

    try:

        data = request.get_json()


        new_status = data.get(
            "status"
        )


        if not new_status:

            return jsonify({

                "status":
                "error",

                "message":
                "Status is required."

            }), 400


        orders = read_orders()


        order_found = False


        for order in orders:

            if (
                order.get("order_id")
                == order_id
            ):

                order["status"] = (
                    new_status
                )

                order_found = True

                break


        if not order_found:

            return jsonify({

                "status":
                "error",

                "message":
                "Order not found."

            }), 404


        save_orders(orders)


        print(
            "Order Status Updated:",
            order_id,
            new_status
        )


        return jsonify({

            "status":
            "success",

            "message":
            "Order status updated!",

            "order_id":
            order_id,

            "new_status":
            new_status

        })


    except Exception as error:

        print(
            "Status Error:",
            error
        )


        return jsonify({

            "status":
            "error",

            "message":
            str(error)

        }), 500


# =========================================
# START SERVER
# =========================================

if __name__ == "__main__":

    create_orders_file()


    print(
        "===================================="
    )

    print(
        "THULIR FRESH FOOD PRODUCTS"
    )

    print(
        "Backend Server Started"
    )

    print(
        "===================================="
    )

    print(
        "Website API:"
    )

    print(
        "http://127.0.0.1:5000"
    )

    print(
        "Admin Orders API:"
    )

    print(
        "http://127.0.0.1:5000/api/orders"
    )

    print(
        "===================================="
    )


    app.run(
        debug=True
    )