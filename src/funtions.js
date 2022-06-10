export function validarCedula(cedula){
    let suma = 0
    for (let index = 0; index < (cedula.length-1); index++) {
        if(index%2==0) suma += menorDiez(parseInt(cedula[index])*2)
        else suma += parseInt(cedula[index])
    }   
    let ultimo = decenaSuperio(suma)-suma 
    return ultimo===parseInt(cedula[cedula.length - 1])
}


function menorDiez(numero) {
        if(numero<10) return numero
        return menorDiez(numero-9)
    }

function decenaSuperio(numero){
        while(numero%10!=0){
            numero=numero+1
        }
    return numero
}    
