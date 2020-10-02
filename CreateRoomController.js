$(document).ready(function () {

    $('#addObjectButton').on('click', function () {
        const selectedObject = $('#object-select').val()
        console.log(selectedObject)
        switch (selectedObject) {
            case 'table':
                $('.main-field').append($('<div class="object table-rectangle">Table</div>').draggable({
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
                $('.main-field').append($('<div class="object seat-circle"><img src="assets/img/circle.svg"></div>').draggable({
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

    $('#createRoomButton').on('click', function () {
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

        const data = {
            'id': -1,
            'roomName': $('#inputRoomName').val(),
            'chests': chests,
            'tables': tables,
        }

        let newRoomState = JSON.stringify(data);
        console.log(newRoomState)


        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(data);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://easymeetup.herokuapp.com/newroom", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

        // var settings = {
        //     "url": "https://easymeetup.herokuapp.com/newroom",
        //     "method": "POST",
        //     "timeout": 0,
        //     "headers": {
        //         "Content-Type": "application/json"
        //     },
        //     "data": JSON.stringify(data),
        // };
        //
        // $.ajax(settings).done(function (response) {
        //     console.log(response);
        // });

        // $.ajax ({
        //     url: 'https://easymeetup.herokuapp.com/newroom',
        //     type: 'POST',
        //     headers: {
        //
        //     },
        //     cache: false,
        //     data: data,
        //     success: function (response) {
        //         alert(response)
        //     }
        // })

    })

})
