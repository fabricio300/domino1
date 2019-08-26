import { Ficha } from './Ficha';
import { Acciones1} from './Acciones1';
import { Tablero } from './Tablero';
import { Agente } from './Agente';
import { longStackSupport } from 'q';


export class Facilitador{
    cadena="desde Facilitador"
    tablero=new Tablero()
    acciones=new Acciones1()
    cajaDeFicha=[]
    turnos:any
    turno=0
    candidadDejugadores=0
    Agentes:any
    gandor=[]
    saltos=0
    fichaplayer:any
    gan=0
    imagenPerfil
    nombreJugador
    constructor(){

    }

    setAgentes(agentes:any){
        this.Agentes=agentes
        console.log("agentes facilitador",agentes);
        
    }

/****************crear fichas*************************************** */  
crearFicha(){
        //console.log("entra a crear fichas");
        
        let contador=1
        let ficha
        for (let index = 0; index <=6; index++) {
                for (let index2 = index; index2 >=0; index2--) {
                    ficha=new Ficha(contador,index,index2)
                    ficha.setImagen1('../../assets/imagenes/normal/'+index+'.png')
                    ficha.setImagen2('../../assets/imagenes/normal/'+index2+'.png')

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

    ordenarAleatoriamente2(arreglo){
        arreglo.forEach((val, key) => {
            let randomIndex = Math.ceil(Math.random()*(key + 1));
            arreglo[key] =  arreglo[randomIndex];
            arreglo[randomIndex] = val;
     });

     return arreglo
    }


/****************crear fichas  fin*************************************** */ 



/****************repartir fichas*************************************** */ 
repartirFichas(cantidadDeJugadores){
        this.candidadDejugadores=cantidadDeJugadores
        let x=0;
        for (let index = 0; index <=cantidadDeJugadores; index++) {
                for (let index2 = 0; index2 <=6; index2++) {
                   
                    this.cajaDeFicha[x].setIdJuagador(index)
                    //console.log("ficha: ",this.cajaDeFicha[x]);
                    x++
                }
            
        }
        //console.log('Shuffled Array: ', this.cajaDeFicha)
        return this.cajaDeFicha
}

/****************repartir fichas fin*************************************** */ 

JugarFichaF(ficha:Ficha){
     //  console.log("-------------------facilitador ----------------------------------------------");
      // console.log("ficha",ficha);
    let jugada=0
    let lado1Juable=0
    let lado2Juable=0
    // primera ficha jugada
    if(this.tablero.fichasJugadas.length==0){
        this.tablero.JugarFicha(ficha)
        this.acciones.ponerFicha(ficha,null)
        this.acciones.setLadoDerecho(this.tablero.extremo2)
        this.acciones.setLadoIzquierdo(this.tablero.extremo1)
        jugada=1
    }else{
        
        lado1Juable=this.jugable(ficha.lado1)
        lado2Juable=this.jugable(ficha.lado2)

        if(lado1Juable>0 && lado2Juable>0){
            /*this.definirExtremosNuevos(lado1Juable,ficha.lado2)   
            this.acciones.ponerFicha(ficha,lado1Juable)
            this.acciones.setLadoIzquierdo(this.tablero.extremo1)
            this.acciones.setLadoDerecho(this.tablero.extremo2)

            */
             // console.log("doble jugada");
             // console.log("lado1Juable ",lado1Juable);
             // console.log("lado2Juable ",lado2Juable);
           

           if(lado1Juable==lado2Juable){
                this.definirExtremosNuevos(lado1Juable,ficha.lado2,ficha.imagen2)    
                 //  console.log("mulajugada");
                this.acciones.ponerFicha(ficha,lado1Juable)
                jugada=1
           }else{
               jugada=2
               console.log("jugada 2");
               
           }


        }else{
            //si el lado 1 es el que se puede jugar
             //  console.log("lado1Juable ",lado1Juable);
             //  console.log("lado2Juable ",lado2Juable);
            
            if(lado1Juable>0){
                this.definirExtremosNuevos(lado1Juable,ficha.lado2,ficha.imagen2)
                
                 //  console.log("lado de la ficha jugable1");
                this.acciones.ponerFicha(ficha,lado1Juable)
                jugada=1
            }

             //si el lado 2 es el que se puede jugar
            if(lado2Juable>0){
                this.definirExtremosNuevos(lado2Juable,ficha.lado1,ficha.imagen1)
               
                 //  console.log("lado de la ficha jugable2");
                this.acciones.ponerFicha(ficha,lado2Juable)
                jugada=1
            }
            this.acciones.setLadoIzquierdo(this.tablero.extremo1)
            this.acciones.setLadoDerecho(this.tablero.extremo2)


           
        }
    }

  // console.log("-------------------facilitador ----------------------------------------------");
    

    return jugada

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


definirExtremosNuevos(lado, newExtremo,imageneExtremo){
    if(lado==1){
        this.tablero.seTExtremo1(newExtremo,imageneExtremo)
    }else{
        this.tablero.seTExtremo2(newExtremo,imageneExtremo)
    }
}


tirarLado1(ficha:Ficha){
    let lado1Juable=0
    let lado2Juable=0

    lado1Juable=this.jugable(ficha.lado1)
    lado2Juable=this.jugable(ficha.lado2)


    if(lado1Juable==1){
        this.definirExtremosNuevos(lado1Juable,ficha.lado2,ficha.imagen2)
        this.acciones.ponerFicha(ficha,lado1Juable)
        
    }else
    
    if(lado2Juable==1){
        this.definirExtremosNuevos(lado2Juable,ficha.lado1,ficha.imagen1)
        this.acciones.ponerFicha(ficha,lado2Juable)
    }
    this.acciones.setLadoIzquierdo(this.tablero.extremo1)
    this.acciones.setLadoDerecho(this.tablero.extremo2)
}


tirarLado2(ficha:Ficha){


    let lado1Juable=0
    let lado2Juable=0

    lado1Juable=this.jugable(ficha.lado1)
    lado2Juable=this.jugable(ficha.lado2)


    if(lado1Juable==2){
        this.definirExtremosNuevos(lado1Juable,ficha.lado2,ficha.imagen2)
        this.acciones.ponerFicha(ficha,lado1Juable)
        
    }else
    
    if(lado2Juable==2){
        this.definirExtremosNuevos(lado2Juable,ficha.lado1,ficha.imagen1)
        this.acciones.ponerFicha(ficha,lado2Juable)
    }
    this.acciones.setLadoIzquierdo(this.tablero.extremo1)
    this.acciones.setLadoDerecho(this.tablero.extremo2)
    
}



fichasJugables(fichas:any){
    let fichaJubable=false

    fichas.forEach(element => {
          // console.log("vvv",element.idJugador);
        
    if(element.idJugador!=null){
        //console.log("tablerolado1=",this.tablero.extremo1);
           // console.log("tablerolado2=",this.tablero.extremo2);
        if(element.lado1== this.tablero.extremo1 || element.lado1==this.tablero.extremo2){
            
           // console.log("fichalado1=",element.lado1);
            
            fichaJubable=true
        }

        if(element.lado2== this.tablero.extremo1 || element.lado2==this.tablero.extremo2){
            fichaJubable=true
              // console.log("fichalado2=",element.lado2);
        }
    }
    
    });   
    return fichaJubable
}



buscarMulaMayor(fichas:any, id){
    let anterior=-1
    fichas.forEach(element => {
        if(element.lado1==element.lado2){
            if(element.lado1>anterior){
                anterior=element.lado1
            }
        }
    });

    let res=[id, anterior]
    return  res
}

newCaja(fichas:any){
    this.cajaDeFicha=fichas
}


definirTurnos(jugador1:any,agentes:any){
    let auxi=[]
    
    agentes=this.ordenarAleatoriamente2(agentes)

    auxi.push(jugador1)
    agentes.forEach(element => {
        
        if(element!=null && element!=jugador1){
            auxi.push(element)
        }       
        
    });

    agentes=auxi
    
    this.turno=0


    
    return agentes
}


jugarTurno(){

    setTimeout(() => {
       if(this.saltos!=(this.Agentes.length+1))
            this.echo()    
    },2000);
    
    
}

echo(){

    if(this.turno>this.candidadDejugadores-1){
        this.turno=0
    }else{
        this.turno=this.turno+1
    }
    console.log("-turno ",this.turno);
   // console.log("agentes    vvv",this.Agentes);
    let cont=0
    let ag=false
    for (let index = 0; index < this.Agentes.length; index++) {
            if (this.Agentes[index].turno==this.turno) {
                cont =index
                ag=true
                break
            }
        
    }

    //console.log("ag= ",ag);
    
    //console.log("siguiente es",this.Agentes[cont].nombre);
    if(ag==true){
        this.Agentes[cont].jugar()
    }
}

verGanador(id,fichas,nombre,perfil){
    if(fichas.length==0){
        console.log("gador jugador ",id);     
        this.gandor=[]
        let ele={nombre:nombre, imagen:perfil}
        this.gandor.push(ele)
        this.gan=this.gandor.length
        console.log("gano ",this.gandor);
        this.mostrarGanador()
        return true
    }else{
        return false
    }
}


saltar(status:boolean){

    if(status==true){
        this.saltos=this.saltos+1
    }else{
        this.saltos=0
    }

    if(this.saltos==(this.Agentes.length+1)){
        console.log("termina");
    
        this.verGanadorDeTabla()
    }
}


verGanadorDeTabla(){

    let menor=100
    let g=[]
    this.Agentes.forEach(element => {
        if(element.fichas.length<=menor){
            let ele={nombre:element.nombre, imagen:element.imagenPerfil}
            if(element.fichas.length==menor){
                g.push(ele)
            }else{
                g=[]
                g.push(ele)
            }
            menor=element.fichas.length
        }
    });

    if(this.fichaplayer.length<=menor){
        let ele={nombre:this.nombreJugador, imagen:this.imagenPerfil}
        if(this.fichaplayer.lengthh==menor){
            g.push(ele)
        }else{
            g=[]
            g.push(ele)
        }
    }

   
    this.gan=g.length

    this.gandor=g
    console.log("g= ",this.gandor);
   this.mostrarGanador()
}

setFichasJugador(fichas,imagenPerfil,nombre){
        this.fichaplayer=fichas
        this.imagenPerfil=imagenPerfil
        this.nombreJugador=nombre
}

mostrarGanador(){
    document.getElementById("ganadorContenedor").className="ganador centrar"
    
    document.getElementById("ganadorContenedor").animate([
        // keyframes
        {  opacity: 0 }, 
        {  opacity: 1 },
        
      ], { 
        // timing options
        duration: 1000,
       
      });
}


}