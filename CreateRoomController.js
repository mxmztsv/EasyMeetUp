// Контроллер страницы создания новой комнаты.

$(document).ready(function () {

    $('#addObjectButton').on('click', function () {

        // Добавление нового объекта в комнату

        const selectedObject = $('#object-select').val()
        console.log(selectedObject)
        switch (selectedObject) {
            case 'table':
                $('.main-field').append($('<div class="object table-rectangle" style="position: absolute">Стол</div>').draggable({
                    start: function() {

                    },
                    stop: function() {
                        console.log('coords:',$('.object').position())
                    },
                    containment: '.main-field'
                    }
                ))
                break;
            case 'seat':
                $('.main-field').append($('<div class="object seat-circle" style="position: absolute"></div>').draggable({
                    start: function() {

                    },
                    stop: function() {
                        console.log('coords:',$(this).position())
                    },
                    containment: '.main-field'
                }))
                break;
        }

    })

    $('#clearButton').on('click', function () {

        // Очистка комнаты (по факту перезагрузка страницы)

        location.reload();
    })

    $('#createRoomButton').on('click', function () {

        // Формирования состояния комнаты в json и отправка на сервер

        const chests = []
        $('.seat-circle').each(function(i,elem) {
            chests.push({
                'chestId' : i,
                'coordinates': $(elem).position(),
                'free': true,
                'user':{},
            })
        });

        const tables = []

        $('.table-rectangle').each(function(i,elem) {
            tables.push({
                'coordinates': $(elem).position(),
            })
        });

        const roomName = $('#inputRoomName').val().trim()

        if (roomName != null && roomName !== "") {
            const data = {
                'id': -1,
                'roomName': roomName,
                'chests': chests,
                'tables': tables,
            }

            let newRoomState = JSON.stringify(data);
            console.log(newRoomState)


            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify(data);

            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("https://easymeetup.herokuapp.com/newroom", requestOptions)
                .then(response => response.text())
                .then(result => {
                    console.log(typeof result)
                    const message = typeof result ? "Комната успешно создана, ее номер: " + result : "Ошибка создания комнаты, кажется что то пошло не так..."
                    alert(message)
                    document.location.href = "/index.html";
                    $("#myModal").modal('hide');
                })
                .catch(error => console.log('error', error));
        } else alert("Введите название комнаты")


    })

})
