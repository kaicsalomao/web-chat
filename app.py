import json

# Importa as bibliotecas necessárias
from flask import Flask, render_template
from flask_socketio import SocketIO

# Cria a aplicação Flask
app = Flask(__name__)
app.config["SECRET_KEY"] = "secret!"
# Cria o objeto SocketIO
io = SocketIO(app)
messages = []

# Define a rota principal
@app.route("/")
def home():
    # Renderiza o template index.html
    return render_template("index.html")


# Define o evento de conexão
@io.on("connect")
def connect():
    # Envia as mensagens para o cliente
    io.emit("return_messages", messages)


# Define o evento de enviar mensagem
@io.on("sendMessage")
def send_message_handle(msg):
    messages.append(msg)
    # Envia a mensagem para todos os clientes conectados
    io.emit("getMessage", msg)


# Executa a aplicação
if __name__ == "__main__":
    # Inicia o servidor em modo de depuração
    io.run(app, debug=True)
