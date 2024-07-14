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
let numforo = "";
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
  const selectedButton = document.querySelector('.selectable-btn:not([disabled])');  
  document.getElementById('disconnect-btn').style.visibility = "visible";
  if (selectedButton) {
    switch (selectedButton.id) {
      case 'btn-1':
        numforo = "4";
        break;
      case 'btn-2':
        numforo = "5";
        break;
      case 'btn-3':
        numforo = "6";
        break;
      case 'btn-4':
        numforo = "7";
        break;
    }
  }

  const UsuarioTxt = $Usuario.value;
  socket = io('https://cinexunidos-production.up.railway.app',{
    auth: {
        token: 'ABC-456', // Se debería sustituir por un token real...
        name: UsuarioTxt+"**"+`${numforo}`,
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
      if(ModUser[1] == numforo ){
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

$messageInput.addEventListener('keydown', (evt) => {
  if (evt.key === 'Enter') { // Check if Enter is pressed
      evt.preventDefault(); // Prevent newline in the input

      const message = $messageInput.value.trim();
      if (message !== '') {
          $messageInput.value = '';
          socket.emit('send-message', message, "1");
      }
  }
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
  window.location.replace('index.html');
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

const buttons = document.querySelectorAll('.selectable-btn');

buttons.forEach((button) => {
  button.addEventListener('click', (e) => {
    // Desactiva los demás botones
    buttons.forEach((otherButton) => {
      if (otherButton !== button) {
        otherButton.disabled = true;
      }
    });
  });
});

const selectableButtons = document.querySelectorAll('.selectable-btn');

// Agrega un evento de clic a cada botón
selectableButtons.forEach((button) => {
  button.addEventListener('click', () => {
    // Elimina el atributo disabled de los elementos bloqueados
    document.getElementById('name').disabled = false;
    document.getElementById('enviarName-btn').disabled = false;
  });
});

// Selecciona el botón "Enviar"
const enviarButton = document.getElementById('enviarName-btn');

// Agrega un evento de clic al botón "Enviar"
enviarButton.addEventListener('click', () => {
  // Elimina el atributo disabled del input #msg
  document.getElementById('msg').disabled = false;
  document.getElementById('name').disabled = true;
  document.getElementById('enviarName-btn').disabled = true;
  const selectedButton = document.querySelector('.selectable-btn:not([disabled])');
  if (selectedButton) {
    switch (selectedButton.id) {
      case 'btn-1':
        numforo = "4";
        console.log("entre 1");
        break;
      case 'btn-2':
        numforo = "5";
        console.log("entre 2");
        break;
      case 'btn-3':
        numforo = "6";
        console.log("entre 3");
        break;
      case 'btn-4':
        numforo = "7";
        console.log("entre 4 ");
        break;
    }
  }
});