from flask import Flask, render_template
from flask_socketio import SocketIO


app = Flask(__name__)
app.config["SECRET_KEY"] = "secret!"

io = SocketIO(app)
messages = []

# Define a rota principal
@app.route("/")
def home():
    # Renderiza o template index.html
    return render_template("index.html")


# Evento de entrada -> connect
@io.on("connect")
def connect():
    # Envia o array de mensagens para o cliente (simulando um banco de dados)
    io.emit("return_messages", messages)


# Evento de enviar as mensagens para todos os clientes 
@io.on("sendMessage")
def send_message_handle(msg):
    messages.append(msg)
    # Envia a mensagem para todos os clientes conectados
    io.emit("getMessage", msg)

 
if __name__ == "__main__":
    io.run(app, debug=True)
