import { Facilitador } from "./Facilitador";
import { Ficha } from './Ficha';
import {Tablero} from './Tablero'
import { log } from 'util';

export class Agente{
    fichas=[]
    idPlayer=null
    imagenPerfil=""
    apariencia=""
    numeroDeFichas=0
    facilitador
    tabblero
    turno=0
    nombre
    constructor(facilita:Facilitador){
        this.facilitador=facilita

    }



    setIdPlayer(id){
       this.idPlayer=id
       let res= Math.floor(Math.random() * (7 - 1)) + 1
       console.log("radom= ",res);
        
       this.definirApariencia(res)
    }

    setTablero(tabblero:Tablero){
        this.tabblero=tabblero
    }

    setTurno(turno){
        this.turno=turno

       // console.log("jugador: ",this.idPlayer, "turno ",this.turno);
    }

    asingnarfichas(todasLasFichas:any){

        todasLasFichas.forEach(element => {
            if(element.idJugador==this.idPlayer){
                element.setImagen1(this.apariencia+element.lado1+".png")
                element.setImagen2(this.apariencia+element.lado2+".png")
                this.fichas.push(element)
            }
        });

        //console.log("fichas agente:\n",this.fichas);
        this.numeroDeFichas=this.fichas.length
    }
    
    
    nombrar(){
        let elementos=['0','1','2','3','4','5','6','7','8','9' ,'a',
        'b','c','d','e','f','g','h','i','j','k','l','m','n ','ñ','o','p','q','r','s','t',
        'u','v','w','x','y','z']

        elementos=this.ordenarAleatoriamente2(elementos)

        let res="play"
        for (let index = 0; index <3; index++) {
            
            res=res+elementos[index]
        }

        this.nombre=res
    }

    ordenarAleatoriamente2(arreglo){
        arreglo.forEach((val, key) => {
            let randomIndex = Math.ceil(Math.random()*(key + 1));
            arreglo[key] =  arreglo[randomIndex];
            arreglo[randomIndex] = val;
     });

     return arreglo
    }


    definirApariencia(eleccion){
            switch (eleccion) {
                    case 1: this.imagenPerfil="../../assets/imagenes/normal/normal.png"
                            this.apariencia="../../assets/imagenes/normal/"
                    break;

                    case 2:this.imagenPerfil="../../assets/imagenes/sol/sol.png"
                           this.apariencia="../../assets/imagenes/sol/"
                    break;

                    case 3:this.imagenPerfil="../../assets/imagenes/yelmo/yelmo.png"
                    this.apariencia="../../assets/imagenes/yelmo/"
                    break

                    case 4:this.imagenPerfil="../../assets/imagenes/calabera/calabera.png"
                            this.apariencia="../../assets/imagenes/calabera/"
                    
                    break;
                    case 5:this.imagenPerfil="../../assets/imagenes/punch/puño.png"
                          this.apariencia="../../assets/imagenes/punch/"
                    
                    break;
                    case 6:this.imagenPerfil="../../assets/imagenes/star/star.png"
                             this.apariencia="../../assets/imagenes/star/"
                    break;
                    case 7:this.imagenPerfil="../../assets/imagenes/luna/luna.png"
                            this.apariencia="../../assets/imagenes/luna/"
                    break;
            
                default:
                    break;
            }

            this.nombrar()
    }
    

jugarMula(ficha:Ficha){
        let jugada =0

        jugada =this.facilitador.JugarFichaF(ficha)
        //console.log("agente",this.idPlayer, "tiro");
        
        if(jugada>0){
            this.removerFicha(this.fichas,ficha)
            this.numeroDeFichas=this.fichas.length
        }
        this.facilitador.jugarTurno()
}


    
  removerFicha(fichas:any, elemento:any){
    var i = fichas.indexOf( elemento );
    fichas.splice( i, 1 );

  }


  verFichasJuables(){
    let fichasJugables=[]
    let ficha=null
    //console.log("tablero L1=",this.tabblero.extremo1," L2=",this.tabblero.extremo2);
    
    this.fichas.forEach(element => {
        if(element.lado1==this.tabblero.extremo1  || element.lado1==this.tabblero.extremo2 ||
            element.lado2==this.tabblero.extremo1  || element.lado2==this.tabblero.extremo2  )
        {

            fichasJugables.push(element)

        }


    });

    if(fichasJugables.length>0){
        let fichasYJugadas=[]
       // console.log("fichas jugables: ",fichasJugables);
        fichasJugables.forEach(element => {
            if(element.lado1==this.tabblero.extremo1  || element.lado1==this.tabblero.extremo2){
             
                fichasYJugadas.push([element,this.masJugadas(element.lado2,element.id)])
            }else{
                this.masJugadas(element.lado1,element.id)
                fichasYJugadas.push([element,this.masJugadas(element.lado1,element.id)])
            }
        });
    
       // console.log("fichasYJugadas",fichasYJugadas);
        
        let anterior=-1
        
        fichasYJugadas.forEach(element => {
            if(anterior<element[1]){
                anterior=element[1]
                ficha=element[0]
            }
        });
    
       // console.log("mejir ficha ",ficha);
    }else{
        console.log("no hay fichas ");
        
    }

    
    return ficha
  }



  masJugadas(ladoQueQuedara:any,idFicha:any){
      let jugadas=0
     this.fichas.forEach(element => {
         if(element.id!=idFicha){
            if(element.lado1==ladoQueQuedara || element.lado2==ladoQueQuedara){
                jugadas++
            }

         }
     });

     //console.log("ficha:",idFicha," jugadas:",jugadas);
     return jugadas
  }


  jugar(){
     // console.log("j facilitador",this.facilitador.turno, "  turno ", this.turno);
      
      if(this.facilitador.turno==this.turno){
        console.log("juega ",this.nombre);
        this.jugarFicha()

        let gane=this.facilitador.verGanador(this.idPlayer,this.fichas,this.nombre,this.imagenPerfil)

        if(gane==false)
            this.facilitador.jugarTurno()
        
     }
  }

  jugarFicha(){
     // console.log("fichas:",this.fichas);
      
      let fichaAjugar= this.verFichasJuables()
     // console.log("fichaAjugar",fichaAjugar);
        let juego=0
      if(fichaAjugar!=null){
           
            juego=this.facilitador.JugarFichaF(fichaAjugar)

            if(juego==2){
                this.dobleJuego(fichaAjugar)
            }
            
            console.log("juega ",fichaAjugar);
            this.removerFicha(this.fichas,fichaAjugar)
            this.numeroDeFichas=this.fichas.length
           
            
      }else{
         if(this.facilitador.cajaDeFicha.length>0){
             let index1= Math.floor(Math.random() * (this.facilitador.cajaDeFicha.length -0)) + 0;
             console.log("tomar Ficha",index1);
             
            console.log("caja:",this.facilitador.cajaDeFicha);
            
            console.log("ficha tomada=", this.facilitador.cajaDeFicha[index1]);

            this.tomarFicha(this.facilitador.cajaDeFicha[index1])
            

            fichaAjugar= this.verFichasJuables()

            if(fichaAjugar!=null){
                let juego=this.facilitador.JugarFichaF(fichaAjugar)

            if(juego==2){
                    this.dobleJuego(fichaAjugar)
            }
               
            
                this.removerFicha(this.fichas,fichaAjugar)
                
               
            }
            
            this.numeroDeFichas=this.fichas.length
         }
        
      }

      console.log("juego sta---------------------",juego);
         
      if(juego==0){
             console.log("jugador pasa-------------------------------",this.idPlayer);
             this.facilitador.saltar(true) 
         
      }else{
         console.log("jugador no pasa-------------------------------",this.idPlayer);
         this.facilitador.saltar(false) 
      }
      
  }


  tomarFicha(ficha:Ficha){
    ficha.setIdJuagador(this.idPlayer)
    ficha.setImagen1(this.apariencia+ficha.lado1+".png")
    ficha.setImagen2(this.apariencia+ficha.lado2+".png")
    this.fichas.push(ficha)
    this.removerFicha(this.facilitador.cajaDeFicha,ficha)
    this.numeroDeFichas=this.fichas.length
  }


  dobleJuego(ficha){
    let opcion=Math.floor(Math.random() * (2 - 1)) + 1;

    if(opcion==2){
        this.tirarLado2(ficha)
    }else{
        this.tirarLado1(ficha)
    }
  }


tirarLado1(fichaD){
    this.facilitador.tirarLado1(fichaD)    
}

tirarLado2(fichaD){
    this.facilitador.tirarLado2(fichaD)
    
}


elegirAQuienBloquear(){
    setTimeout(() => {
   
    console.log("agente ",this.idPlayer, " decide");
    
    let elegido=null
    let menor=100
    if(this.facilitador.Agentes.length>1){

        this.facilitador.Agentes.forEach(element => {
                if(element.idPlayer!=this.idPlayer){
                    if(element.fichas.length<menor){
                        menor=element.fichas.length
                        elegido=element.turno
                    }


                }
            });
        if(this.facilitador.fichaplayer.length<menor){
            elegido=100
        }

        console.log("elegido   =  ",elegido);
        this.facilitador.bloquearJuagador(elegido)
        
    }else{
       this.facilitador.bloquearJuagador(elegido), this.facilitador.bloquearJuagador(100)
    }


     
    },7000);


}

}