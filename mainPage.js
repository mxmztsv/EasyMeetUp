// Контроллер домашней страницы


$(document).ready(function () {

    $('#createRoomButton').on('click', function () {

        // Переход на стрицу создания комнаты

        document.location.href = "/newroom.html";
    })

    $('#followRoomButton').on('click', function () {

        // Получение от сервера состояния комнаты по ее номеру (Проверяем, существует ли она)
        // кладем номер комнаты и ее состояние в localStorage

        const roomId = Number($('#roomIdInput').val().trim())

        console.log(roomId)

        if (!isNaN(roomId) && roomId !== "") {

            // Валидация поля ввода номера комнаты и отправка запроса

            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");


            const requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow',
            };

            const url = "https://easymeetup.herokuapp.com/room/" + roomId

            fetch(url, requestOptions)
                .then(response => response.text())
                .then(result => {
                    // console.log(result)
                    if (result === "" || result === null || result === undefined) {
                        alert("Кажется комнаты с таким ID не существует : (")
                    } else {
                        const res = JSON.parse(result)
                        // alert(res)
                        localStorage.setItem('roomState', res);
                        const roomId = res.roomId
                        localStorage.setItem('roomId', roomId);
                        // alert(localStorage.getItem('roomState'))
                        document.location.href = "/room.html";
                    }
                })
                .catch(error => console.log('error', error));
        } else alert("Номер комнаты должен состоять из 6 цифр")



    })

})
