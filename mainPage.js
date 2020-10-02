$(document).ready(function () {

    $('#createRoomButton').on('click', function () {
        document.location.href = "/newroom.html";
    })

    $('#followRoomButton').on('click', function () {

        const roomId = Number($('#roomIdInput').val().trim())

        console.log(roomId)
        // sessionStorage.setItem('roomId', roomId);

        if (!isNaN(roomId) && roomId != "") {
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
        }



    })

})
