window.onload = function () {
  const socket = io();

  function addToChat(msg) {
    const chat = document.querySelector(".chat");
    const span = document.createElement("span");
    span.id = msg.id;
    span.innerHTML = `<p><strong>${msg.username}</strong>: ${msg.message}</p>`;
    chat.appendChild(span);
    document.querySelector(".chat").scrollTop = span.offsetTop;
  }

  // Ao pressionar botão
  document.querySelector("form").addEventListener("submit", (event) => {
    // Não recarregar a página
    event.preventDefault();
    
    // Algoritmo de identificação (ID)
    // chance de colisão nesse algoritmo 
    // é de 1 em 1000000 ou 0.0001%
    let objectID = Math.random() * 1000000;
    objectID = Math.floor(objectID);
    objectID = objectID.toString(16);
    alert(objectID)
    // Enviar mensagem para o back-end
    // Identificar cada mensagem com um ID especifico
    // para não repetir a mensagem ao colocar no chat
    // correção: 
    socket.emit("sendMessage", {
      id: objectID,
      username: event.target[0].value,
      message: event.target[1].value,
    });

    // Limpar a entrada de mensagem
    event.target[1].value = "";
  });

  socket.on("getMessage", (message) => {
    // Atualização dinâmica pelo back-end
    addToChat(message);
  });

  socket.on("return_messages", (msgs) => {
    // Somente uma vez...
    // Carrega as mensagens guardadas no servidor
    // msgs -> array de mensagens guardadas
    // Para cada mensagem, adicionar ao chat...
    msgs.forEach((x)=>{
      // Se nao houver
      if (!document.getElementById(x.id)){
        addToChat(x);
      }
    });  
  });
};
