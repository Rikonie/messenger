let messenger = document.getElementById('messenger');

messenger.style.display = 'none';

let messageArray = [];


request = (type, data) => {

    let xml = new XMLHttpRequest();

    xml.open(type, 'http://kpakozz96pyc.xyz:9092/messages', true);

    xml.setRequestHeader('Content-Type', 'application/json');

    if (type === "POST") {

    } else if (type === "GET") {
        xml.send();
        xml.addEventListener("readystatechange", () => {

            if (xml.readyState === 4 && xml.status === 200) {
                console.log('полученный массив', xml.responseText);

                let a = JSON.parse(xml.responseText);
                for(let i=0; i < a.length; i++){
                    console.log('i-й элемент массива из запроса',a[i]);
                    if(!messageArray.find(e=> e.id === a[i].id))
                        messageArray.push({...a[i], isDrawn: false, isSend: true});
                }
                console.log('сообщения на странице',messageArray);
            }
        })

    } else {
        console.log('Неверный запрос')
    }
};


setInterval(()=>request("GET"), 3000);

