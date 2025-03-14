//const socket = io('https://cinexunidos-production.up.railway.app');
const $onlineStatus = document.querySelector('#status-online');
const $offlineStatus = document.querySelector('#status-offline');
const $username = document.querySelector('#username');
const $lastSeen = document.querySelector('#last-seen');
const $chatForm = document.querySelector('form');
const $messageInput = document.getElementById('msg');
const $chatElement = document.querySelector('#chat');
const $usersList = document.querySelector('#users-list');
const $disconnectBtn = document.querySelector('#disconnect-btn');
const $EnviarUser = document.querySelector('#enviarName-btn');
let $Usuario = document.getElementById('name');

let $tipoUser = "";
let $isconnect = null;
let socket = io('https://cinexunidos-production.up.railway.app',{
  auth: {
      token: 'ABC-456', // Se debería sustituir por un token real...
      name: "x",
  },
});

$EnviarUser.addEventListener('click', (evt) => {
  evt.preventDefault();
  const UsuarioTxt = $Usuario.value;

    socket = io('https://cinexunidos-production.up.railway.app',{
    auth: {
        token: 'ABC-456', // Se debería sustituir por un token real...
        name: UsuarioTxt+"**0",
    },
  });

  socket.on('connect', () => {
    $onlineStatus.classList.remove('hidden');
    $offlineStatus.classList.add('hidden');
  
    $username.textContent = UsuarioTxt;
    $lastSeen.innerHTML = getLastSeen();
    $isconnect = "";
   // socket.on('online-users', renderUsers);
socket.on('new-message', renderMessage);
    console.log('Connected');
  });

}); 



const renderUsers = (users) => {
  $usersList.innerHTML = '';
  users.forEach((user) => {
      const $li = document.createElement('li');
      let ModUser = user.name.split('**');
      
      if(ModUser.length() = 2 ){
      $li.textContent = ModUser[0];
      $usersList.appendChild($li);
    }
  });
};
const renderMessage = (payload) => {

  let ModUser = payload.name.split('**');  
      if(ModUser[1] ==  "0" || ModUser[1] ==  "1" ){
  const { id, message, name } = payload;
console.log(payload);
$tipoUser = message[1];
console.log($tipoUser);

  const $divElement = document.createElement('div');
  $divElement.classList.add('message');

  if (id !== socket.id) {
      $divElement.classList.add('incoming');
  }
  
  $divElement.innerHTML = `<small>${ModUser[0]}</small><p>${message[0]}</p>`;
  $chatElement.appendChild($divElement);
}
  // Scroll al final de los mensajes...
  $chatElement.scrollTop = $chatElement.scrollHeight;
};

$chatForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const message = $messageInput.value;
  $messageInput.value = '';

  socket.emit('send-message', message,"1");
});

/*socket.on('disconnect', () => {
  $onlineStatus.classList.add('hidden');
  $offlineStatus.classList.remove('hidden');
  console.log('Disconnected');
});*/


if ( $isconnect != null) {

}


$disconnectBtn.addEventListener('click', (evt) => {
  evt.preventDefault();
  localStorage.removeItem('name');
  socket.close();
  window.location.replace('websockets.html');
}); 
function getLastSeen() {
  // Obtener la fecha actual
  const now = new Date();

  // Convertir a huso horario de Venezuela (GMT-4)
  const venezuelaTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/Caracas' }));

  // Formatear la fecha
  const options = { hour: 'numeric', minute: 'numeric', hour12: true };
  const formattedTime = venezuelaTime.toLocaleTimeString('es-VE', options);

  return `<small>Hoy a las ${formattedTime}</small>`;
}