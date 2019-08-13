import { Ficha } from './Ficha';


export class Tablero{
    fichasJugadas=[]
    extremo1:any
    extremo2:any

    constructor(){}

    JugarFicha(ficha:Ficha){
            this.fichasJugadas.push(ficha)
            this.seTExtremo1(ficha.lado1)
            this.seTExtremo2(ficha.lado2)
    }

    seTExtremo1(valor){
        this.extremo1=valor
       // console.log("extremo1= ",this.extremo1);
        
    }

    seTExtremo2(valor){
        this.extremo2=valor
        //console.log("extremo2= ",this.extremo2);
    }

    

}