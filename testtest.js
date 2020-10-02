$(document).ready(function () {

    // console.log('Salam')

const roomId = localStorage.getItem('roomId')
//     const roomId = '306187'
// const test = localStorage.getItem('test')

    console.log(Number(roomId))

    getRoomStateAndRender(Number(roomId))

    // let choosenSeatId;
    //
    // $('.main-field').on('click', function () {
    //     alert('click')
    //     // $('.seat-circle').removeClass('.seat-circle-target')
    //     // $(this).addClass('.seat-circle-target')
    //
    //     // alert($(this).attr( "title" ))
    //     alert($(this))
    //     choosenSeatId = $(this).attr( "id" )
    //     const isTaken = $(this).attr( "title" ) === "" ? false : true
    //     // alert(isTaken)
    //     if (!isTaken) {
    //         $("#myModal1").modal('show');
    //     }
    // })

    // alert('Salam')

    // console.log('Salam')


    // console.log(roomState)

    // const roomState = {
    //     "roomId": 464417,
    //     "roomName": "My Room",
    //     "chests": [
    //         {
    //             "chestId": 0,
    //             "coordinates": {
    //                 "top": 239.0,
    //                 "left": 209.0
    //             },
    //             "free": true,
    //             "user": {
    //                 "fullName": null,
    //                 "description": null
    //             }
    //         },
    //         {
    //             "chestId": 1,
    //             "coordinates": {
    //                 "top": 242.0,
    //                 "left": 505.0
    //             },
    //             "free": true,
    //             "user": {
    //                 "fullName": null,
    //                 "description": null
    //             }
    //         }
    //     ],
    //     "tables": [
    //         {
    //             "coordinates": {
    //                 "top": 122.0,
    //                 "left": 143.0
    //             }
    //         },
    //         {
    //             "coordinates": {
    //                 "top": 128.0,
    //                 "left": 437.0
    //             }
    //         }
    //     ]
    // }


    // const roomState = {
    //     "roomId": 444251,
    //     "roomName": "Test Room",
    //     "chests":[
    //     {"chestId":0,
    //         "coordinates":{"top":339,"left":74},
    //         "free":true,
    //         "user":{}
    //         },
    //         {"chestId":1,
    //             "coordinates":{"top":147,"left":69},
    //             "free":true,
    //             "user":{}
    //             },
    //         {"chestId":2,
    //             "coordinates":{"top":339,"left":391},
    //             "free":true,
    //             "user":{}
    //             },
    //         {"chestId":3,
    //             "coordinates":{"top":144,"left":386},
    //             "free":true,
    //             "user":{}
    //             },
    //         {"chestId":4,
    //             "coordinates":{"top":141,"left":821},
    //             "free":true,
    //             "user":{}
    //             },
    //         {"chestId":5,
    //             "coordinates":{"top":148,"left":511},
    //             "free":false,
    //             "user": {
    //                 "fullName": "Akchur Ren",
    //                 "description": "Desc 1323132"
    //             }
    //             },
    //         {"chestId":6,
    //             "coordinates":{"top":343,"left":515},
    //             "free":true,
    //             "user":{}
    //             },
    //         {"chestId":7,
    //             "coordinates":{"top":340,"left":824},
    //             "free":false,
    //             "user": {
    //                 "fullName": "Иннокентий",
    //                 "description": "люблю пиво"
    //             }
    //         }
    //         ],
    //     "tables":[
    //         {"coordinates":{"top":148,"left":185}},
    //         {"coordinates":{"top":149,"left":617}},
    //         {"coordinates":{"top":340,"left":185}},
    //         {"coordinates":{"top":338,"left":619}}],
    // };

    function getRoomStateAndRender(roomId) {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        // const raw = JSON.stringify(data);

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

            // $('.seat-circle').removeClass('.seat-circle-target')
            // $(this).addClass('.seat-circle-target')
            // alert('salam')
            // alert($(this).attr( "title" ))
            choosenSeatId = $(this).attr( "id" )
            const isTaken = $(this).attr( "title" ) === "" ? false : true
            // alert(isTaken)
            if (!isTaken) {
                $("#myModal1").modal('show');
            }
        })

        $('#registerButton').on('click', function () {

            const name = $('#inputName').val()
            const descript = $('#descriptionTextarea').val()

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
                    const message = result ? "Вы успешно зарегистрированы!" : "Ошибка! Похоже что место уже занято. Обновите страницу чтобы увидеть актуальную информацию."
                    alert(message)
                    location.reload();
                    $("#myModal1").modal('hide');
                })
                .catch(error => console.log('error', error));



        })

    }

    // const roomName = roomState.roomName;
    // const roomId = roomState.roomId;
    // const chests = roomState.chests;
    // const tables = roomState.tables;
    //
    // $('#roomId').text(roomId)
    // $('#eventName').text(roomName)
    //
    // tables.forEach(function (table, i, tables) {
    //     console.log('coords', table.coordinates)
    //     const top = table.coordinates.top + 'px'
    //     const left = table.coordinates.left + 'px'
    //
    //     $('.main-field').append($(`<div class="object table-rectangle" style="position: absolute; top: ${top}; left: ${left}">Table</div>`))
    // })
    //
    // chests.forEach(function (chest, i, chests) {
    //     console.log('coords', chest.coordinates)
    //     const top = chest.coordinates.top + 'px'
    //     const left = chest.coordinates.left + 'px'
    //     const label = chest.free ? "": chest.user.fullName
    //     const color = chest.free ? '#7986CB' : '#b71c1c'
    //     const id = chest.chestId
    //     const title = chest.free ? "" : "Здесь сидит: " + chest.user.fullName + "\n" + "Описание: " + chest.user.description
    //
    //     $('.main-field').append($(`<div class="object seat-circle" id="${id}" title="${title}" style="position: absolute; top: ${top}; left: ${left}; background-color: ${color}">${label}</div>`))
    // })

    // let choosenSeatId;
    //
    // $('.seat-circle').on('click', function () {
    //
    //     // $('.seat-circle').removeClass('.seat-circle-target')
    //     // $(this).addClass('.seat-circle-target')
    //     alert('salam')
    //     // alert($(this).attr( "title" ))
    //     choosenSeatId = $(this).attr( "id" )
    //     const isTaken = $(this).attr( "title" ) === "" ? false : true
    //     // alert(isTaken)
    //     if (!isTaken) {
    //         $("#myModal1").modal('show');
    //     }
    // })

    // $('#registerButton').on('click', function () {
    //
    //     const name = $('#inputName').val()
    //     const descript = $('#descriptionTextarea').val()
    //
    //     console.log(name)
    //     console.log(descript)
    //
    //
    //     const data = {
    //         "fullName": name,
    //         "description": descript
    //     }
    //
    //     console.log(data)
    //
    //     const myHeaders = new Headers();
    //     myHeaders.append("Content-Type", "application/json");
    //
    //     const raw = JSON.stringify(data);
    //
    //     const requestOptions = {
    //         method: 'POST',
    //         headers: myHeaders,
    //         redirect: 'follow',
    //         body: raw,
    //     };
    //
    //     const url = "https://easymeetup.herokuapp.com/room/" + roomId + "/" + choosenSeatId
    //
    //     fetch(url, requestOptions)
    //         .then(response => response.text())
    //         .then(result => console.log(result))
    //         .catch(error => console.log('error', error));
    //
    //
    //
    // })

})
