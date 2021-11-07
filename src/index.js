let messenger = document.getElementById('messenger');

messenger.style.display = 'none';

let rename = () => {

    messenger.style.display = 'none';

    document.getElementById('divUserName').style.display = 'flex';

    document.getElementById('header').remove()

};

let createUser = (id, divId) => {

    localStorage.setItem('userName', document.getElementById(id).value);

    let headerUserName = document.createElement('div');

    if ((document.getElementById(id).value) === '' || (document.getElementById(id).value) == null) {
        alert('Ошибка: не указано имя')
    } else {
        headerUserName.innerHTML = localStorage.getItem('userName') +
            '<button onclick="rename()">Изменить имя</button>';

        headerUserName.id = 'header';

        document.body.prepend(headerUserName);

        messenger.style.display = 'flex';

        document.getElementById(divId).style.display = 'none';
    }
};

let inputUserName = document.getElementById('userName');

inputUserName.value = localStorage.getItem('userName');

let sendMessage = () => {

    localStorage.setItem('messageInput', document.getElementById('messageInput').value);

    let message = document.createElement('div');

    let time = (new Date()).getHours() + ':' + (new Date()).getMinutes();

    if ((document.getElementById('messageInput').value) === '' || (document.getElementById('messageInput').value) == null) {
        alert('Ошибка: пустое сообщение')
    } else {
        message.innerHTML = localStorage.getItem('userName') + ': ' + localStorage.getItem('messageInput') +
            "<sub>" + time + "</sub>";

        document.getElementById('windowMessenger').append(message);

        message.id = 'message';

        document.getElementById('messageInput').value = '';
    }
};
