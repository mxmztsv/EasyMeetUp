


// $('.object').draggable({
//     start: function() {
//         const nextEl = $(this).next();
//         console.log(nextEl);
//         $(this).clone(true, true).prependTo('.object-list__box');
//         $(this).css('position', 'absolute');
//         // $(document.body).append($('.object'));
//         // $('.object').parent = $(document.body);
//         // $(document).onmousedown(function(e){
//         //     var X = e.pageX; // положения по оси X
//         //     var Y = e.pageY; // положения по оси Y
//         //     console.log("X: " + X + " Y: " + Y); // вывод результата в консоль
//         //     $('.object').css('top', Y);
//         //     $('.object').css('left', X);
//         // });
//
//     },
//     // stop: function() {
//     //     $('#draggable').text("Перетащи меня")
//     // },
//     // // helper: "clone",
//     // containment: '.main-field'
// });


// $('#myModal').modal(options)

// $('.object').click((e) => {
//     clone().appendTo('.object-list__box');
// })


        //     let currentDroppable = null;
        //
        //     $('.table-rectangle').onmousedown(function(event) {
        //     let shiftX = event.clientX - $('.table-rectangle')[0].getBoundingClientRect().left;
        //     let shiftY = event.clientY - $('.table-rectangle')[0].getBoundingClientRect().top;
        //
        //     $('.table-rectangle').css('position', 'absolute');
        //     // ball.style.zIndex = 1000;
        //     $('.table-rectangle').css('zIndex', 1000);
        //     document.body.append($('.table-rectangle'));
        //
        //     moveAt(event.pageX, event.pageY);
        //
        //     function moveAt(pageX, pageY) {
        //     // ball.style.left = pageX - shiftX + 'px';
        //     $('.table-rectangle').css('left', pageX - shiftX + 'px');
        //     // ball.style.top = pageY - shiftY + 'px';
        //     $('.table-rectangle').css('top', pageY - shiftY + 'px');
        // }
        //
        //     function onMouseMove(event) {
        //     moveAt(event.pageX, event.pageY);
        //
        //     // ball.hidden = true;
        //     $('.table-rectangle').css('hidden', true);
        //     let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
        //     // ball.hidden = false;
        //     $('.table-rectangle').css('hidden', false);
        //
        //     if (!elemBelow) return;
        //
        //     let droppableBelow = elemBelow.closest('.droppable');
        //     if (currentDroppable != droppableBelow) {
        //     if (currentDroppable) { // null если мы были не над droppable до этого события
        //     // (например, над пустым пространством)
        //     leaveDroppable(currentDroppable);
        // }
        //     currentDroppable = droppableBelow;
        //     if (currentDroppable) { // null если мы не над droppable сейчас, во время этого события
        //     // (например, только что покинули droppable)
        //     enterDroppable(currentDroppable);
        // }
        // }
        // }
        //
        //     document.addEventListener('mousemove', onMouseMove);
        //
        //     $('.table-rectangle').onmouseup(function() {
        //     document.removeEventListener('mousemove', onMouseMove);
        //     $('.table-rectangle').onmouseup = null;
        // });
        //
        // });
        //
        //     function enterDroppable(elem) {
        //     elem.style.background = 'pink';
        // }
        //
        //     function leaveDroppable(elem) {
        //     elem.style.background = '';
        // }
        //
        //     ball.ondragstart = function() {
        //     return false;
        // };



