import { Ficha } from './Ficha';
import { Acciones1} from './Acciones1';
import { Tablero } from './Tablero';



export class Facilitador{
    cadena="desde Facilitador"
    tablero=new Tablero()
    acciones=new Acciones1()
    cajaDeFicha=[]
    constructor(){

    }

/****************crear fichas*************************************** */  
crearFicha(){
        //console.log("entra a crear fichas");
        
        let contador=1
        let ficha
        for (let index = 0; index <=6; index++) {
                for (let index2 = index; index2 >=0; index2--) {
                    ficha=new Ficha(contador,index,index2)
                    ficha.setImagen1('../../assets/imagenes/punch/'+index+'.png')
                    ficha.setImagen2('../../assets/imagenes/punch/'+index2+'.png')

                    this.cajaDeFicha.push(ficha)
                    contador=contador+1
                    
                }
            
        }
        this.ordenarAleatoriamente()
        
}


    ordenarAleatoriamente(){
        this.cajaDeFicha.forEach((val, key) => {
            let randomIndex = Math.ceil(Math.random()*(key + 1));
            this.cajaDeFicha[key] = this.cajaDeFicha[randomIndex];
            this.cajaDeFicha[randomIndex] = val;
     });
     // see the values
     //console.log('Shuffled Array: ', this.cajaDeFicha)
    }



/****************crear fichas  fin*************************************** */ 



/****************repartir fichas*************************************** */ 
repartirFichas(){
        let x=0;
        for (let index = 0; index <=3; index++) {
                for (let index2 = 0; index2 <=6; index2++) {
                   
                    this.cajaDeFicha[x].setIdJuagador(index)
                    //console.log("ficha: ",this.cajaDeFicha[x]);
                    x++
                }
            
        }

        return this.cajaDeFicha
}

/****************repartir fichas fin*************************************** */ 

JugarFichaF(ficha:Ficha){
    console.log("-------------------facilitador ----------------------------------------------");
    console.log("ficha",ficha);
    
    let lado1Juable=0
    let lado2Juable=0
    // primera ficha jugada
    if(this.tablero.fichasJugadas.length==0){
        this.tablero.JugarFicha(ficha)
        ficha.setIdJuagador(null)
        this.acciones.ponerFicha(ficha,null)
        this.acciones.setLadoDerecho(this.tablero.extremo2)
        this.acciones.setLadoIzquierdo(this.tablero.extremo1)
    }else{
        
        lado1Juable=this.jugable(ficha.lado1)
        lado2Juable=this.jugable(ficha.lado2)

        if(lado1Juable>0 && lado2Juable>0){
            this.definirExtremosNuevos(lado1Juable,ficha.lado2)
            ficha.setIdJuagador(null);
            this.acciones.ponerFicha(ficha,lado1Juable)
            this.acciones.setLadoIzquierdo(this.tablero.extremo1)
            this.acciones.setLadoDerecho(this.tablero.extremo2)
        }else{
            //si el lado 1 es el que se puede jugar
            console.log("lado1Juable ",lado1Juable);
            console.log("lado2Juable ",lado2Juable);
            
            if(lado1Juable>0){
                this.definirExtremosNuevos(lado1Juable,ficha.lado2)
                ficha.setIdJuagador(null)
                console.log("lado de la ficha jugable1");
                this.acciones.ponerFicha(ficha,lado1Juable)
                
            }

             //si el lado 2 es el que se puede jugar
            if(lado2Juable>0){
                this.definirExtremosNuevos(lado2Juable,ficha.lado1)
                ficha.setIdJuagador(null)
                console.log("lado de la ficha jugable2");
                this.acciones.ponerFicha(ficha,lado2Juable)
            }
            this.acciones.setLadoIzquierdo(this.tablero.extremo1)
            this.acciones.setLadoDerecho(this.tablero.extremo2)


           
        }
    }

console.log("-------------------facilitador ----------------------------------------------");
    

    return ficha

}


jugable(lado){
    let extremo=0
    if(lado==this.tablero.extremo1){
        extremo=1
    }
    if(lado==this.tablero.extremo2){
        extremo=2
    }
    return extremo
}


definirExtremosNuevos(lado, newExtremo){
    if(lado==1){
        this.tablero.seTExtremo1(newExtremo)
    }else{
        this.tablero.seTExtremo2(newExtremo)
    }
}


}