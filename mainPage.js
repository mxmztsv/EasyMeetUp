$(document).ready(function () {

    $('#createRoomButton').on('click', function () {
        // $.ajax ({
        //     url: 'check.php',
        //     type: 'GET',
        //     cache: false,
        //     data: {'r': r, 'x': x, 'y': y},
        //     dataType: 'html',
        //     success: function (data) {
        //         // alert(data);
        //         document.getElementById("output").innerHTML = data;
        //     }
        // })
        document.location.href = "/room.html";
    })

})
