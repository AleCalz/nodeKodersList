/* eslint-disable */

const fs = require("node:fs")

const koderFile = 'dbKoder.json'

//  registrar koder -- add(name)
//  listar koders -- ls()
//  Eliminar koders*nombre -- rm(name)
//  Eliminar koders -- reset()


function add(name) {
    //leer archivo (recuperar arreglo de koders)
    const arrKoder = getKoders()
    //actualizar (anadir al areglo y actualizar el archivo)
    arrKoder.push(name.toLowerCase().trim())
    updateKoders(arrKoder)
    console.log("koder añadido!");
}

function ls() {
    //leer archivo (recuperar arreglo de koders)
    const arrKoder = getKoders()
    //Validacion vacio y mostrar
    if (arrKoder.length === 0) {
        console.log("Aun no hay Koders aqui!");
        process.exit()
    }
    console.log('\nLista de Koders:\n');
    arrKoder.forEach((name, index) => {
        console.log(name, '-', index);
    });
}

function rm(name) {
    //leer archivo (recuperar arreglo de koders)
    const arrKoder = getKoders()
    let nameFormat = name.toLowerCase().trim() 
    //validar si el nombre esta en el arreglo
    if (!arrKoder.includes(nameFormat)) {
        console.log("Ese nombre no existe en la lista :c");
        process.exit();
    }
    //buscamos y eliminamos
    arrKoder.forEach((nameIt, index) => {
        if (nameIt === nameFormat ) {
            arrKoder.splice(index,1)
        }
    });

    //Actualizar
    updateKoders(arrKoder)
}

function reset() {
    //Actualizar a vacio
    updateKoders([])
}

//verificamos existencia del archivo, caso contrario se crea
function init (){
    if (!fs.existsSync(koderFile)) {
        //crear archivo
        fs.writeFileSync(koderFile, JSON.stringify({ kodersList:[] }))
    }
}

//nos regresa el arreglo de koders
function getKoders() {
    //leer archivo
    arrKoders = JSON.parse(fs.readFileSync(koderFile,'utf8')).kodersList
    return arrKoders
}

//actualizar koders
function updateKoders(koders) {
    //remplazamos el objeto que teniamos con lo nuevo que nos esta llegando
    const newObKoder = { kodersList: koders }
    //reescribimos el archivo con los datos nuevos 
    fs.writeFileSync(koderFile,JSON.stringify(newObKoder))
}

function main() {

    init()
    const accion = process.argv[2]
    const name = process.argv[3]

    switch (accion) {
        case 'ls':
            ls()
            break;
    
        case 'add':
            //validar no numeros
            if (!isNaN(name)) {
                console.log("No se permiten numeros para el nombre!");
            }
            add(name)
            ls()
            break;
            
        case 'rm':
            if (!isNaN(name)) {
                console.log("No se permiten numeros para el nombre!");
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
}

main()