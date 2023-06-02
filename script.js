class Box {
    constructor(id, x, y) {
        this.id = id;
        this.x = x;
        this.y = y;
    }
}

$(function () {
    var currentElementId;
    var draggedElementId;
    const numPiezas = 16;
    const box = new Box("Juan", 30);
    let boxes = [];
    let piezas = [];
    let verificados = [];
    let margenError = 16;
    
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var variable = urlParams.get('puzzle');
    let foto = 'img/foto'+variable+'.png';

    /**
     * En vez de hacerlo en index, hacerlo en puzzle.html. 
     * Hacer un puzzle2.html o mandar parametro por get con el nombre de la foto y solo cambiar el qué foto cargar. 
     * En el index hacer un login que se pueda ingresar poniendo la fecha en que empezamos a ser novios. Poner que el rompecabezas es porque fue de las primeras cosas que hicimos juntos
     */

    document.getElementById('verificarBtn').addEventListener('click', function () {
        if (verify()) {
            $('.btn').fadeOut(2000);
            $(".pieza").fadeOut(2000);
            $('.box').css('background-image', 'url('+foto+')').hide().fadeIn(4000);
            $('.box').animate({ borderWidth: 0 }, 2000);
            $('.quadrant').animate({ borderWidth: 0 }, 2000);
            $(".cartita").animate({ left: '-=450px' }, 100);
            $('.cartita').fadeIn(4000);
        } else {
            alert('Está mal mi vida :(');
            /* $('.btn').fadeOut(2000);
            $(".pieza").fadeOut(2000);
            $(".box").animate({ left: '-=1800px' }, 100);
            $('.box').css('background-image', 'url('+foto+')').hide().fadeIn(4000);
            $('.box').animate({ borderWidth: 0 }, 2000);
            $('.quadrant').animate({ borderWidth: 0 }, 2000);
            $(".cartita").animate({ left: '-=450px' }, 100);
            $('.cartita').fadeIn(4000); */

        }
    });

    function llenarBoxes() {
        for (let i = 0; i < numPiezas; i++) {

            var id = i + 1;
            var x = document.getElementById('q' + (i + 1)).getBoundingClientRect().left;
            var y = document.getElementById('q' + (i + 1)).getBoundingClientRect().top;
            const box = new Box(id, x, y);
            boxes[i] = box;
        }
    }

    function generarPiezas() {
        for (let i = 0; i < numPiezas; i++) {
            var id = i + 1;
            var x = document.getElementById('p' + (i + 1)).getBoundingClientRect().left;
            var y = document.getElementById('p' + (i + 1)).getBoundingClientRect().top;

            const box = new Box(id, x, y);
            piezas[i] = box;

            $('#p' + id).css('background-position', function () {
                var x = (id - 1) % 4;
                var y = Math.floor((id - 1) / 4);
                return x * -200 + 'px ' + y * -200 + 'px';
            });


        }
    }

    function position() {
        var divElement = document.getElementById('pieza');
        var rect = divElement.getBoundingClientRect();
        var top = rect.top;
        var left = rect.left;

        console.log(top);
        console.log(left);
    }

    function verify() {
        for (let i = 0; i < numPiezas; i++) {
            console.log(verificados[i]);
            if (!verificados[i]) return false;
        }
        return true;
    }

    function setFlagState() {
        var pieza = document.getElementById(draggedElementId).getBoundingClientRect();
        var boxId = draggedElementId.slice(1);

        var positionX = boxes[boxId - 1].x;
        var positionY = boxes[boxId - 1].y;

        verificados[boxId - 1] = ((pieza.left >= (positionX - margenError) && pieza.left <= (positionX + margenError))
            && (pieza.top >= (positionY - margenError) && pieza.top <= (positionY + margenError)));


        /* if ((pieza.left >= (positionX - margenError) && pieza.left <= (positionX + margenError)) &&
            (pieza.top >= (positionY - margenError) && pieza.top <= (positionY + margenError))) {
            alert('Posicion correcta');
        } */
    }

    $(".pieza").draggable({
        start: function (event, ui) {
            draggedElementId = $(this).attr("id");
            console.log(draggedElementId);
        }
    });


    $(".quadrant").droppable({
        drop: function (event, ui) {
            $(this).addClass("dropped");
            currentElementId = $(this).attr("id");
            setFlagState();
        }
    });


    generarPiezas();
    llenarBoxes();
});


