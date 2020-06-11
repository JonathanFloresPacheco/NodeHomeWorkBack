const eventos  = require('events');

class carro extends eventos{

    constructor(){
        super();
    }

    Arrancar(){
        console.log('El auto arranca');
    }

}

var carro1 = new carro();

//Para escuchar eventos, suscribirnos con el objeto on

carro1.on('arranco',function(){
    console.log('El evento fue escuchado, y la secuencia completada');
});

carro1.Arrancar();