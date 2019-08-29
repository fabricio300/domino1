

export class Ficha{
    id:any
    lado1:any
    lado2:any
    imagen1:any
    imagen2:any
    avilidades:any 
    idJugador:any   

    constructor(id,lado1,lado2){
            this.id=id
            this.lado1=lado1
            this.lado2=lado2
            if(lado1==lado2){
                this.avilidades=true
            }
    }

    setImagen1(imagen1){
           this.imagen1=imagen1
    }

    setImagen2(imagen2){
        this.imagen2=imagen2
    }


    getImagen1(){
        return this.imagen1
    }

    getImagen2(){
        return this.imagen2
    }

    setIdJuagador(idJugador){
        this.idJugador=idJugador
    }

    

}