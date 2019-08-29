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
    turnoPlayer
    tomaficha=false
    caja
    mulaEnJuego=false

   // efectoDemula="Voraz"
    //descricionDeEfecto="Todos los jugadores toman una ficha de la caja"
    efectoDemula=null
    descricionDeEfecto=null
    inmune=null
    saltado=null

    constructor(){
        
    }

    setTrunoPlayer(turno,tomaficha,caja){
        this.turnoPlayer=turno
        this.tomaficha=tomaficha
    }

    setAgentes(agentes:any){
        this.Agentes=agentes
        console.log("agentes facilitador",agentes);
        
    }

/****************crear fichas*************************************** */  
crearFicha(apariencia){
        //console.log("entra a crear fichas");
        
        let contador=1
        let ficha
        for (let index = 0; index <=6; index++) {
                for (let index2 = index; index2 >=0; index2--) {
                    ficha=new Ficha(contador,index,index2)
                    ficha.setImagen1(''+apariencia+index+'.png')
                    ficha.setImagen2(''+apariencia+index2+'.png')

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
    let esMula=null
    // primera ficha jugada
    if(this.tablero.fichasJugadas.length==0){
        this.tablero.JugarFicha(ficha)
        this.acciones.ponerFicha(ficha,null)
        this.acciones.setLadoDerecho(this.tablero.extremo2)
        this.acciones.setLadoIzquierdo(this.tablero.extremo1)
        jugada=1
        
        
        console.log("jugada---",jugada);
        
      
            
            if(ficha.avilidades==true){
                this.tipoMula(ficha)
            }
        

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

           if(ficha.avilidades==true){
                this.tipoMula(ficha)
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

                if(ficha.avilidades==true){
                    this.tipoMula(ficha)
                }
            }

             //si el lado 2 es el que se puede jugar
            if(lado2Juable>0){
                this.definirExtremosNuevos(lado2Juable,ficha.lado1,ficha.imagen1)
               
                 //  console.log("lado de la ficha jugable2");
                this.acciones.ponerFicha(ficha,lado2Juable)
                jugada=1

                if(ficha.avilidades==true){
                    this.tipoMula(ficha)
                }
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
       if(this.saltos!=(this.Agentes.length+1) && this.mulaEnJuego==false)
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
    console.log("saltado=",this.saltado);
    
   if(this.saltado!=null){
       if(this.saltado==this.turno){
            
            if(this.saltado>this.candidadDejugadores-1){
                this.turno=0
            }else{
                this.turno=this.turno+1
            }


            console.log("--turno ",this.turno);
            this.saltado=null
        }
  
   }
  

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

    if(this.turno==this.turnoPlayer){
        console.log("miiiiiiiiiiiiiiii turno");
        if(this.fichasJugables(this.fichaplayer)==true){
            console.log("sepue jugar");
            
          }else{
            console.log("NO sepue jugar");
            this.mostrarCaja()
          }
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
    console.log("saltos= ",this.saltos, " caja=",this.cajaDeFicha, "staus ",status," xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
    
    
    if(status==true){
        if(this.cajaDeFicha.length==0)
            this.saltos=this.saltos+1   
        else
        this.saltos=0
       
    }else{ 
                        
        this.saltos=0
    }
    
        



    if(this.saltos>=this.candidadDejugadores+1){
        console.log("termina");
    
        this.verGanadorDeTabla()
    }

    console.log("saltos= ",this.saltos, " caja=",this.cajaDeFicha, "cantidad de jugadores +1=",this.candidadDejugadores+1," yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy");
}


verGanadorDeTabla(){
    console.log("saltos",this.saltos);
    
    let menor=100
    let g=[]
    this.Agentes.forEach(element => {
        if(element.fichas.length<=menor){
            console.log("agente ",element.idPlayer, " fichas",element.fichas.length);
            
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
    console.log("ganador tabla");
    
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



mostrarCaja(){
    if(this.gan==0){
        this.tomaficha=true
        this.cajaBasia()
        document.getElementById("Marco").style.marginLeft="0"
    }
    
  }
  

cajaBasia(){
    let res=false
    this.cajaDeFicha.forEach(element => {
        if(element.idJugador==null){
          res=true
        }
    });
    
    this.caja=res
    if(this.caja==false){
      setTimeout(function(){

          document.getElementById("Marco").style.marginLeft="-100%"

         
      },2000);
      this.saltar(true)
      this.jugarTurno()
    }
}


/*-----------------------------------poderes ------------------------------------------------------------------ */

removerFicha(fichas:any, elemento:any){
    var i = fichas.indexOf( elemento );
    fichas.splice( i, 1 );

  }

tipoMula(ficha:Ficha){
    let mula=null
    if(ficha.lado1==ficha.lado2){
        mula=ficha.lado1

        switch(mula){
            case 0:
            break;
            case 1:
            break;
            case 2:
            break;
            case 3:
            break;
            case 4:
            break;
            case 5: this.efectoDemula="Bloqueo"
                    this.descricionDeEfecto="El jugador de esta ficha elige bloquear el turno de otro"
                    this.inmune=ficha.idJugador
                    this.mula5()
                    console.log("id jugaor", ficha.idJugador , " extrar ",this.candidadDejugadores);
                    
                    if(ficha.idJugador<this.candidadDejugadores){
                        this.Agentes.forEach(element => {
                            if(element.idPlayer==ficha.idJugador){
                                element.elegirAQuienBloquear()
                            }
                        });
                    }
                   

            break;
            case 6:            
                    if(this.cajaDeFicha.length>=(this.Agentes.length+1)){
                            this.efectoDemula="Voraz"
                            this.descricionDeEfecto="Todos los jugadores toman una ficha de la caja"
                            this.mula6()
                        }
            break;
        }

       
    }

   

    return mula
            
}


mula6(){
    this.mulaEnJuego=true
    if(this.cajaDeFicha.length>=(this.Agentes.length+1)){
        this.mostrarEfectoDeMula()
        console.log("se juega la mula 6");
        
        this.Agentes.forEach(element => {
            element.tomarFicha(this.cajaDeFicha[0])
            this.removerFicha(this.cajaDeFicha, this.cajaDeFicha[0])
        });

        let ficha=this.cajaDeFicha[0]
        ficha.setIdJuagador(this.Agentes.length)
        this.fichaplayer.push(ficha)
        this.removerFicha(this.cajaDeFicha, this.cajaDeFicha[0])

    }else{
        this.mulaEnJuego=false
    }

    


}

mula5(){
    this.mulaEnJuego=true
    this.mostrarEfectoDeMula()

}


bloquearJuagador(turno){
    if(turno==100){
        this.saltado=this.turnoPlayer
    }else{
        this.saltado= turno
    }
    
    this.cerrarEfectoMula()
}



mostrarEfectoDeMula(){
    document.getElementById("Marco").style.transition='0.5s'
    document.getElementById("Marco").style.marginLeft="0"

    
}

cerrarEfectoMula(){
        document.getElementById("Marco").style.marginLeft="-100%"
        this.mulaEnJuego=false
        this.efectoDemula=null
        this.descricionDeEfecto=null
        this.jugarTurno()
   
}




}