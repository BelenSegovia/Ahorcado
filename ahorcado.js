;(function name(){
    'use strict'
    var juego = {
        palabra: "ALURA",
        estado: 7,
        adivinado: ["A", "L"],
        errado: ["B", "J", "K", "C"]
    }

    var $html= {
    hombre: document.getElementById('hombre'),
    adivinado: document.querySelector('.adivinado'),
    errado: document.querySelector('.errado')
    }

    // Actualizar la imagen del hombre
    function dibujar(juego) {
        var $elem
        $elem= $html.hombre

        var estado = juego.estado
        if (estado === 8) {
            estado = juego.estadoPrevio
        }
        $elem.src= './imagenes/estados/0' + estado + '.png'

        // Creamos las letras adivinadas
        var palabra= juego.palabra
        var adivinado = juego.adivinado
        $elem = $html.adivinado
        // borramos los elementos anteriores
        $elem.innerHTML= ''
        for (let letra of palabra) {
            let $span= document.createElement('span')
            let $txt= document.createTextNode('')
            if (adivinado.indexOf(letra) >= 0) {
                $txt.nodeValue= letra
            }
            $span.setAttribute('class', 'letra adivinada')
            $span.appendChild($txt)
            $elem.appendChild($span)
            }

            // creamos letras erradas
            var errado= juego.errado
            $elem= $html.errado
            // borramos los elementos anteriores 
            $elem.innerHTML = ''
            for (let letra of errado) {
                let $span= document.createElement('span')
                let $txt= document.createTextNode(letra)
                $span.setAttribute('class', 'letra errada')
                $span.appendChild($txt)
                $elem.appendChild($span)
            }
        }
        // Si ya perdió o ganó no hay que hacer nada
     function adivinar (juego, letra) {
        var estado = juego.estado  
        // palabra 
        if (estado === 1 || estado === 8) {
            return
        }   
        var adivinado = juego.adivinado
        var errado = juego.errado
        // letra
        if (adivinado.indexOf(letra) >= 0 || errado.indexOf(letra) >= 0) {
            return
        }
        var palabra = juego.palabra
        // Si es letra de la palabra
        if (palabra.indexOf(letra) >= 0){
            let ganado = true
            // revisar si llegamos al estado ganado
            for (let l of palabra) {
                if (adivinado.indexOf(l) < 0 && l != letra ) {
                    ganado = false
                    juego.estadoPrevio = juego.estado
                    break 
                }
            }
            // Si se ganó, se debe indicar
            if (ganado) {
                juego.estado= 8
            } 
            // Agregar la letra a la lista de letras adivinadas
            adivinado.push(letra)
        } else {
            // si no es letra, acercamos al hombre un paso más de la horca
            juego.estado -- 
            // agregamos la letra a la lista de letras erradas
            errado.push(letra)
        }
     }    

     window.onkeypress = function adivinarLetra (e) {
        var letra = e.key
        letra = letra.toUpperCase ()
        if (/[^A-ZÑ]/.test(letra)) {
            return
        }
        adivinar(juego, letra)
        dibujar(juego)
     }

    dibujar(juego)
}())