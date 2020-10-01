$(document).ready(function () {

    $('#addObjectButton').on('click', function () {
        const selectedObject = $('#object-select').val()
        console.log(selectedObject)
        switch (selectedObject) {
            case 'table':
                $('.main-field').append($('<div class="object table-rectangle">Table</div>').draggable({
                    start: function() {
                        // const nextEl = $(this).next();
                        // console.log(nextEl);
                        // $(this).clone(true, true).prependTo('.object-list__box');
                        // $(this).css('position', 'absolute');
                        // $(document.body).append($('.object'));
                        // $('.object').parent = $(document.body);
                        // $(document).onmousedown(function(e){
                        //     var X = e.pageX; // положения по оси X
                        //     var Y = e.pageY; // положения по оси Y
                        //     console.log("X: " + X + " Y: " + Y); // вывод результата в консоль
                        //     $('.object').css('top', Y);
                        //     $('.object').css('left', X);
                        // });

                    },
                    stop: function() {
                        console.log('coords:',$(this).position())
                    },
                    // // helper: "clone",
                    containment: '.main-field'
                    }
                ))
                break;
            case 'seat':
                $('.main-field').append($('<div class="object seat-circle"><img src="assets/img/circle.svg"></div>').draggable())
                break;
        }

    })

    // $(function() {
    //
    //     $('.object').draggable();
    //
    // });

})
