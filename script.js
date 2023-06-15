const socket = io('http://localhost:4000')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById("send-container")
const messageInput = document.getElementById("message-input");

const userName = prompt('what is your name')
appendMessage('You join')
socket.emit('new-user',userName)


socket.on('chat-message', data=>{
    appendMessage(`${data.userName}:${data.message}`)

})
socket.on('user-connected', userName=>{
    appendMessage(`${userName} connected`)

})

socket.on('user-disconnected', userName => {
    appendMessage(`${userName} disconnected`)
  })
  

messageForm.addEventListener('submit', e=>{
    e.preventDefault()
    const message = messageInput.value
    appendMessage(`You: ${message}`)
    socket.emit('send-chat-message', message)
    messageInput.value = ''
})


function appendMessage(message) {
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
  }

//<script defer src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/3.1.3/socket.io.js"></script>
