import { Ficha } from './Ficha';


export class Tablero{
    fichasJugadas=[]
    extremo1:any
    extremo2:any
    imagenExtremo1:any
    imagenExtremo2:any
    constructor(){}

    JugarFicha(ficha:Ficha){
            this.fichasJugadas.push(ficha)
            this.seTExtremo1(ficha.lado1,ficha.imagen1)
            this.seTExtremo2(ficha.lado2,ficha.imagen2)
    }

    seTExtremo1(valor,imagen){
        this.extremo1=valor
       // console.log("extremo1= ",this.extremo1);
       this.imagenExtremo1=imagen
    }

    seTExtremo2(valor,imagen){
        this.extremo2=valor
        this.imagenExtremo2=imagen
        //console.log("extremo2= ",this.extremo2);
    }

    

}