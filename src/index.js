let messenger = document.getElementById('messenger');

messenger.style.display = 'none';

let messageArray = [];

let rename = () => {

    messenger.style.display = 'none';

    document.getElementById('divUserName').style.display = 'flex';

    document.getElementById('header').remove()

};

let drawSingleMessage = (arr) => {

    function compareNumbers(a, b) {
        return a.dateTime - b.dateTime;
    }
    console.log("arr", arr);

    arr.sort(compareNumbers).map((a) => {
        if (a.isDrawn === false) {
            let message = document.createElement('div');
            message.innerHTML = a.userName + ": " + a.message + "<sub>" +
                (new Date(a.dateTime)).toLocaleTimeString().slice(0, -3) + "</sub>";
            document.getElementById('windowMessenger').append(message);
            message.className = 'message';
            message.id = a.id;
            a.isDrawn = true;
        }
        if (a.isSend === true) {
            let sendId = a.id + '_send';
            let send = document.getElementById(sendId);
            console.log(send);
            if (send == null) {
                let sendDiv = document.createElement('div');
                sendDiv.innerHTML = "Отправлено";
                sendDiv.id = sendId;
                document.getElementById(a.id).append(sendDiv)
            }
        }
    })
};

request = (type, data) => {

    let xml = new XMLHttpRequest();

    xml.open(type, 'http://kpakozz96pyc.xyz:9092/messages', true);

    xml.setRequestHeader('Content-Type', 'application/json');

    if (type === "POST") {
        xml.send(JSON.stringify(data));
        xml.addEventListener("readystatechange", () => {

            if (xml.readyState === 4 && xml.status === 200) {
                let a = JSON.parse(xml.responseText);
                messageArray.push({...a, isDrawn: true, isSend: true});
            }

        })
    } else if (type === "GET") {
        xml.send();
        xml.addEventListener("readystatechange", () => {

            if (xml.readyState === 4 && xml.status === 200) {
                let a = JSON.parse(xml.responseText);
                for (let i = 0; i < a.length; i++) {
                    if (!messageArray.find((e) => e.id === a[i].id))
                        messageArray.push({...a[i], isDrawn: false, isSend: true});
                    if (a[i].isSend === false)
                        a[i].isSend = true;
                }
                drawSingleMessage([...messageArray])
            }
        })

    } else {
        console.log('Неверный запрос')
    }
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

let generateUUID = () => {
    let d = new Date().getTime();
    let d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = Math.random() * 16;//random number between 0 and 16
        if (d > 0) {//Use timestamp until depleted
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
};

let sendMessage = () => {

    localStorage.setItem('messageInput', document.getElementById('messageInput').value);

    let message = document.createElement('div');

    let time = new Date();

    if ((document.getElementById('messageInput').value) === '' || (document.getElementById('messageInput').value) == null) {
        alert('Ошибка: пустое сообщение')
    } else {
        message.innerHTML = localStorage.getItem('userName') + ': ' + localStorage.getItem('messageInput') +
            "<sub>" + time.toLocaleTimeString().slice(0, -3) + "</sub>";

        document.getElementById('windowMessenger').append(message);

        let uuid =generateUUID();

        message.id = uuid;

        message.className = 'message';

        let userMessage = {
            'id': uuid, 'message': document.getElementById('messageInput').value,
            'userName': localStorage.getItem('userName'), 'dateTime': time.getTime()
        };

        document.getElementById('messageInput').value = '';
        request('POST', userMessage);

    }
};

setInterval(() => request("GET"), 5000);
