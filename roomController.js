// Контроллер комнаты.
// осуществляет получение состояние комнаты с сервера и отрисовку всех объектов


$(document).ready(function () {

const roomId = localStorage.getItem('roomId')

    console.log(Number(roomId))

    getRoomStateAndRender(Number(roomId))


    function getRoomStateAndRender(roomId) {

    // Функция получения состояние комнаты с сервера и отрисовки всех объектов

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
                console.log(result)
                if (result === "" || result === null || result === undefined) {
                    alert("Кажется команты с таким ID не существует : (")
                } else {
                    const res = JSON.parse(result)
                    // alert(typeof res)
                    localStorage.setItem('roomState', res);
                    // alert(localStorage.getItem('roomState'))
                    renderRoom(res)
                }
            })
            .catch(error => console.log('error', error));
    }

    function renderRoom(roomState) {

    // Функция отрисовки объектов в комнате

        const roomName = roomState.roomName;
        console.log(roomName)
        const roomId = roomState.roomId;
        console.log(roomId)
        const chests = roomState.chests;
        const tables = roomState.tables;

        $('#roomId').text(roomId)
        $('#eventName').text(roomName)

        tables.forEach(function (table, i, tables) {
            console.log('coords', table.coordinates)
            const top = table.coordinates.top + 'px'
            const left = table.coordinates.left + 'px'

            $('.main-field').append($(`<div class="object table-rectangle" style="position: absolute; top: ${top}; left: ${left}">Стол</div>`))
        })

        chests.forEach(function (chest, i, chests) {
            console.log('coords', chest.coordinates)
            const top = chest.coordinates.top + 'px'
            const left = chest.coordinates.left + 'px'
            const label = chest.free ? "": chest.user.fullName
            const color = chest.free ? '#7986CB' : '#b71c1c'
            const id = chest.chestId
            const title = chest.free ? "" : "Здесь сидит: " + chest.user.fullName + "\n" + "Описание: " + chest.user.description

            $('.main-field').append($(`<div class="object seat-circle" id="${id}" title="${title}" style="position: absolute; top: ${top}; left: ${left}; background-color: ${color}; text-overflow: ellipsis;"></div>`))
        })

        let choosenSeatId;

        $('.seat-circle').on('click', function () {

            $('.seat-circle').removeClass('.seat-circle-target')
            $(this).addClass('.seat-circle-target')
            choosenSeatId = $(this).attr( "id" )
            const isTaken = $(this).attr( "title" ) === "" ? false : true
            if (!isTaken) {
                $("#myModal1").modal('show');
            }
        })

        $('#registerButton').on('click', function () {

            //Отправка регистрации на стул

            const name = $('#inputName').val().trim()
            const descript = $('#descriptionTextarea').val().trim()

            if (name != null && name !== "") {
                console.log(name)
                console.log(descript)


                const data = {
                    "fullName": name,
                    "description": descript
                }

                console.log(data)

                const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                const raw = JSON.stringify(data);

                const requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    redirect: 'follow',
                    body: raw,
                };

                const url = "https://easymeetup.herokuapp.com/room/" + roomId + "/" + choosenSeatId

                fetch(url, requestOptions)
                    .then(response => response.text())
                    .then(result => {
                        const message = result === "true" ? "Вы успешно зарегистрированы!" : "Ошибка! Похоже что место уже занято. Обновите страницу чтобы увидеть актуальную информацию."
                        alert(message)
                        location.reload();
                        $("#myModal1").modal('hide');
                    })
                    .catch(error => console.log('error', error));
            } else alert("Введите имя")





        })

    }


})
