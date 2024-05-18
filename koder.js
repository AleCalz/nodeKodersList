/* eslint-disable */

const fs = require("node:fs")
const koderFile = 'dbKoder.json'

function add(name) {
    //leer archivo (recuperar arreglo de koders)
    const arrKoder = getKoders()
    //actualizar (anadir al areglo y actualizar el archivo)
    arrKoder.push(name.toLowerCase().trim())
    updateKoders(arrKoder)
    console.log("koder añadido!");
}

function ls() {
    const arrKoder = getKoders()
    //Validacion vacio y mostrar
    if (arrKoder.length === 0) {
        console.log("No hay Koders aqui!");
        process.exit()
    }
    console.log('\nLista de Koders:');
    arrKoder.forEach((name, index) => {
        console.log((index+1)+'.-' ,name );
    });
}

function rm(name) {
    const arrKoder = getKoders()
    let nameFormat = name.toLowerCase().trim() 
    //validar si el nombre esta en el arreglo
    if (!arrKoder.includes(nameFormat)) {
        console.log("Ese nombre no existe en la lista :c");
        process.exit();
    }
    
    //buscamos y eliminamos
    // arrKoder.forEach((nameIt, index) => {
        // if (nameIt === nameFormat ) {
            // arrKoder.splice(index,1)
        // }
    // });

    // era mejor con indexOf..(correccion)
    const indx = arrKoder.indexOf(name)
    arrKoder.splice(indx,1)
    
    console.log("koder Eliminado!");
    updateKoders(arrKoder)
}

function reset() {
    updateKoders([])
}

function init (){
    if (!fs.existsSync(koderFile)) {
        fs.writeFileSync(koderFile, JSON.stringify({ kodersList:[] }))
    }
}

function getKoders() {
    arrKoders = JSON.parse(fs.readFileSync(koderFile,'utf8')).kodersList
    return arrKoders
}

function updateKoders(koders) {
    //remplazamos el objeto que teniamos con lo nuevo que nos esta llegando
    const newObjectKoder = { kodersList: koders }
    //reescribimos el archivo con los datos nuevos 
    fs.writeFileSync(koderFile,JSON.stringify(newObjectKoder))
}

(function () {

    init()
    const accion = process.argv[2]
    const name = process.argv[3]

    switch (accion) {
        case 'ls':
            ls()
            break;
    
        case 'add':
            if (!isNaN(name)) {
                console.log("No se permiten numeros para el nombre!");
                break;
            }
            add(name)
            ls()
            break;
            
        case 'rm':
            if (!isNaN(name)) {
                console.log("No se permiten numeros para el nombre!");
                break;
            }
            rm(name)
            ls()
            break;
    
        case 'reset':
            reset()
            ls()            
            break;
    
        default:
            console.log("No existe ese comando!");
            break;
    }
})()
