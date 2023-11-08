//creamos objeto de calculador, osea la variable
var calculadora = {
    currentInput: '',
//definimos current input como vacio, un valor que se debe ingresar
    clearDisplay: function () {
        document.getElementById('displayBox').value = '';
        this.currentInput = '';
    },
//funcion para limpiar por completo la pantalla, le damos valor vacio a el elemto con id displaybox
    writeToDisplay: function (value) {
        this.currentInput += value;
        document.getElementById('displayBox').value = this.currentInput;
    },
    eraseLastInput: function () {
        this.currentInput = this.currentInput.slice(0, -1);
        document.getElementById('displayBox').value = this.currentInput;
    },
//funcion para limpiar el ultimo numero agregado o ultimo input, este toma el input actual y analiza su cadena (la cual va desde el inicio hasta el final), una vez hecho eso elimina el ultimo caracter
    writeOperatorToDisplay: function (operator) {
        if ('+-*/'.includes(this.currentInput.slice(-1))) {
            this.currentInput = this.currentInput.slice(0, -1) + operator;
        } else {
            this.currentInput += operator;
        }
        document.getElementById('displayBox').value = this.currentInput;
    },
//funcion para escribir el operador para mostrar, es una funcion que toma de valor el operador. Hace una condicional que toma el ultimo carcter
//y ve si es un operador matematico, como +-/*, si es asi toma el operador actual y lo reemplaza por el nuevo
//si no automaticamente el input actual utiliza el operador que se agrega, ya que no intenta superponer simbolos
//por ultimo se cambia el valor de displaybox a current input
    solveOperation: function () {
        try {
            const sanitizedInput = this.currentInput
                .replace(/√/g, 'Math.sqrt')
                .replace(/%/g, '/100')
                .replace(/\^/g, '**')
                .replace(/∛/g, 'Math.cbrt'); 
                
                const result = new Function('return ' + sanitizedInput)();
                this.currentInput = result.toFixed(2).toString();
            document.getElementById('displayBox').value = this.currentInput;
        } catch (error) {
            document.getElementById('displayBox').value = 'Error';
        }
    },
//funcion que resuelve la operacion, creamos la variable sanitized input y le damos de valor el input actual
//para que funcionen los simbolos distintos a +-/*, necesitamos darles el funcionamiento especifico, por eso dejamos que ingrese el valor
//y se lo reemplaza por la funcion verdadera  a la hora de resolver la operacion
//definimos resultado igual la funcion eval (toma una cadena y la interpreta como codigo js) y dejamos que se almacene para luego agregamos
//ese mismo valor a la display box
//en caso de error en la pantalla mostrara error
    squareRoot: function () {
        this.currentInput += '√(';
        document.getElementById('displayBox').value = this.currentInput;
    },
//Esta funcion es la de la raiz cuadrada, que el current input sea el simbolo de la raiz, que definimos antes como seria su calculo
//y dejamos que se muestre en la pantallita este input que le dimos 
    percentage: function () {
        this.currentInput += '%';
        document.getElementById('displayBox').value = this.currentInput;
    },
//esta funcion la que pone el input de porcentaje en la pantalla, al ser un simbolo especial comoo todos los otros, necesita una programacion aparte
empowerment: function () {
        this.currentInput += '^';
        document.getElementById('displayBox').value = this.currentInput;
    },
//esta funcion es la que pone la potenciacion en la pantallita con su respectivo simbolo
    cubeRoot: function () {
        this.currentInput += '∛(';
        document.getElementById('displayBox').value = this.currentInput;
    }  
//la raiz cubica aca hace lo mismo que las otra, toma el valor que se le dio al input actual (el de raiz cubica) y lo muestra en
//la pantallita
};

