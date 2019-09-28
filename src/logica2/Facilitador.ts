import { Ficha } from './Ficha';
import { Agente } from './Agente';
import { Tablero } from './Tablero';
import { Movimientos } from './Movimientos';
import { MovimientosMovil } from './MovimientosMovil';



export class Facilitador{
    tablero=new Tablero()
    movimientos=new Movimientos

    caja=[]
    turnoActual
    Agentes=[]
    
    idPlayer
    datosPlayer
    fichasDelJugador=[]
    turnoDelPlayer

    tomandoFichas=false
    mostrandoTurnos=false
    turnos=[]
    tiroDoble=false

    constructor(){

    }
    
    setDatosPlayer(info:any){
            this.datosPlayer=info
    }

    crearAgentes(cantidad){
            for (let index = 0; index < cantidad-1; index++) {
                let agente=new Agente()
                this.Agentes.push(agente)
                
            }

       // console.log(this.Agentes);
        
    }



    crearFicha(apariencia){
        let contador=1
        let ficha
        for (let index = 0; index <=6; index++) {
                for (let index2 = index; index2 >=0; index2--) {
                    ficha=new Ficha()
                    ficha.setLado1(index)
                    ficha.setLado2(index2)
                    ficha.setImagen1(''+apariencia+index+'.png')
                    ficha.setImagen2(''+apariencia+index2+'.png')

                    this.caja.push(ficha)
                    contador=contador+1
                    
                }
            
        }
        
        this.caja=this.ordenarAleatoriamente(this.caja)
        //console.log(this.caja);
        
    }


    ordenarAleatoriamente(arreglo){
        arreglo.forEach((val, key) => {
            let randomIndex = Math.ceil(Math.random()*(key + 1));
            arreglo[key] =  arreglo[randomIndex];
            arreglo[randomIndex] = val;
     });

     return arreglo
    }


    mostrarMarco(){
        //console.log("muestra");   
        document.getElementById('Marco1111').style.transition="0.5s"
        document.getElementById('Marco1111').className="marco"
    }

    ocultarMarco(){
        //console.log("oculta");
        document.getElementById('Marco1111').style.transition="0.5s"
        document.getElementById('Marco1111').className="marco de"
    }


    removerElemetoDearreglo(arreglo:any, elemento:any){
        var i = arreglo.indexOf( elemento );
        arreglo.splice( i, 1 );
        
    }


    definirId(){
        let condor=1


        this.Agentes.forEach(element => {
            element.setId(condor)
            condor++
          
        });

       console.log( "agentes\n",this.Agentes);
       
       this.idPlayer=condor
       // console.log("mi id es",this.idPlayer);
        
    }


    repartirFichas(){
        this.caja=this.ordenarAleatoriamente(this.caja)
        let fichasA

        this.Agentes.forEach(element => {
            fichasA=[]
            for (let index = 0; index < 7; index++) {
                this.caja[0].setIdJuagador(element.id)
                fichasA.push(this.caja[0])
                this.removerElemetoDearreglo(this.caja,this.caja[0])
            }

            element.setFichas(fichasA)
        });

        fichasA=[]

        for (let index = 0; index < 7; index++) {
            this.caja[0].setIdJuagador(this.idPlayer)
            this.fichasDelJugador.push( this.caja[0])
            this.removerElemetoDearreglo(this.caja,this.caja[0])
        }

        this.caja=this.caja
        //console.log("fichas",this.caja, " caja", this.caja);
        
    }



    encontrarMula(){
        let elegido=null
        let mula=-1
       
        for (let index = 0; index < this.Agentes.length; index++) {
            this.Agentes[index].fichas.forEach(element => {
                if(element.lado1==element.lado2){
                   // console.log(element);
                    
                    if(element.lado1>mula){
                        elegido=element
                        mula=element.lado1
                    }
                    
                }
                
            });
            
        }

        this.fichasDelJugador.forEach(element => {
            if(element.lado1==element.lado2){
              ///  console.log(element);
                
                if(element.lado1>mula){
                    elegido=element
                    mula=element.lado1
                }
                
            }
        });

        //console.log("elegido/////////////////////////////////////////////////",elegido);

        this.definirTurnos(elegido)

        return elegido
    }


    definirTurnos(mula:Ficha){
        let turnos=[]
        let resto=[]
        turnos.push(mula.idJugador)
       // console.log("turnos",turnos);

        this.Agentes.forEach(element => {
            if(element.id!=mula.idJugador){
                resto.push(element.id)
            }
        });
       

        if(resto.length<this.Agentes.length ){
            resto.push(this.idPlayer)
        }

        
        resto=this.ordenarAleatoriamente(resto)
       // console.log("restos =",resto);

        resto.forEach(element => {
            if(element!=undefined){
                turnos.push(element)
            }
        });

       // console.log("turnos",turnos);
        
        let condor=1
        for (let index = 0; index <turnos.length; index++) {
            if(turnos[index]==this.idPlayer){
                this.turnoDelPlayer=condor
            }else{
                this.Agentes.forEach(element => {
                    if(turnos[index]==element.id){
                        element.setTurno(condor)
                    }
                });
            }

            condor++
            
        }

       // console.log("tur",turnos);
        

        for (let index = 0; index < turnos.length; index++) {
            let inf
            if(turnos[index]==this.idPlayer){
                 inf={nombre:this.datosPlayer.nombre,perfil:this.datosPlayer.perfil,turno:this.turnoDelPlayer}
              
            }else{
                this.Agentes.forEach(element => {
                    if(element.id==turnos[index]){
                        inf={nombre:element.nombre,perfil:element.imagenPerfil,turno:element.turno}
                        
                    }
                });
            }

            this.turnos.push(inf)
        }
       // console.log("turnos----------------------------------------------",this.turnos);
        this.mostrandoTurnos=true;
        this.mostrarMarco()
    }


    tirarMula(ficha:Ficha){
        this.ocultarMarco()
        this.mostrandoTurnos=false;

        this.movimientos.extremo1=ficha.lado1

        this.movimientos.extremo2=ficha.lado2
        

        this.tablero.seTExtremo1(ficha.lado1,ficha.imagen1)
        this.tablero.seTExtremo2(ficha.lado2,ficha.imagen2)
        this.movimientos.primeraFicha(ficha.imagen1,ficha.imagen2)

        if(ficha.idJugador==this.idPlayer){
            this.removerElemetoDearreglo(this.fichasDelJugador,ficha)
        }else{
            this.Agentes.forEach(element => {
                if(element.id==ficha.idJugador){
                    this.removerElemetoDearreglo(element.fichas,ficha)
                    element.cantidadDeFichas=element.fichas.length
                }
            });
        }

    }



    tomarFichaDeCaja(ficha:Ficha,idJugador){
        try {

            ficha.setIdJuagador(idJugador)
            this.fichasDelJugador.push(ficha)
            this.removerElemetoDearreglo(this.caja,ficha)

        } catch (error) {
            console.log("no se pudo tomar una ficha");
            
        }
        

        //this.Agentes[0].tomarFicha()
       
        this.ocultarMarco()
    }






/****************movimiento de fichas*********************************************************************** */



jugarFicha(ficha:Ficha){
    let tipo_de_juagada=0
    let lado1_juable=this.ladoJuable(ficha.lado1)
    let lado2_juable=this.ladoJuable(ficha.lado2)
    console.log("ficha",ficha);
    
    console.log("extremo1 t",this.tablero.extremo1, " estremo2 t ",this.tablero.extremo2);
    
    
    console.log("lado1",lado1_juable);
    console.log("lado2",lado2_juable);
    
    if(lado1_juable!=0 && lado2_juable!=0){
        /*solo se puede jugar de un extremo */
        if(lado1_juable==lado2_juable){
            if(lado1_juable==1){                           
                    this.tablero.seTExtremo1(ficha.lado2,ficha.imagen2)
                    this.movimientos.jugarFicha(lado1_juable,ficha)  
            }else if(lado1_juable==2){
                    this.tablero.seTExtremo2(ficha.lado2,ficha.imagen2)
                    this.movimientos.jugarFicha(lado1_juable,ficha)
            }
            tipo_de_juagada=1
        }else{
            tipo_de_juagada=2
        }

        


    }else{

        if(lado1_juable==1){                           
                this.tablero.seTExtremo1(ficha.lado2,ficha.imagen2)
                this.movimientos.jugarFicha(lado1_juable,ficha) 
                tipo_de_juagada=1 
        }else if(lado1_juable==2){
                this.tablero.seTExtremo2(ficha.lado2,ficha.imagen2)
                this.movimientos.jugarFicha(lado1_juable,ficha)
                tipo_de_juagada=1
        }


        if(lado2_juable==1){
            this.tablero.seTExtremo1(ficha.lado1,ficha.imagen1)
            this.movimientos.jugarFicha(lado2_juable,ficha)  
            tipo_de_juagada=1
        }else if(lado2_juable==2){
            this.tablero.seTExtremo2(ficha.lado1,ficha.imagen1)
            this.movimientos.jugarFicha(lado2_juable,ficha)
            tipo_de_juagada=1
        }

       }


       this.movimientos.extremo1=this.tablero.extremo1
       this.movimientos.extremo2=this.tablero.extremo2
       console.log("extremo1 t",this.movimientos.extremo1, " estremo2 t ",this.movimientos.extremo2);
   
       return tipo_de_juagada
}


ladoJuable(lado){
    let ladoAjuagar=0
    if(lado==this.tablero.extremo1){
        ladoAjuagar=1
    }else if(lado==this.tablero.extremo2){
        ladoAjuagar=2
    }

    return ladoAjuagar
}


tirarEstremo1(ficha:Ficha){

    if(ficha.lado1==this.tablero.extremo1){
        this.tablero.seTExtremo1(ficha.lado2,ficha.imagen2)
        
    }else{
        this.tablero.seTExtremo1(ficha.lado1,ficha.imagen1)
    }
    this.movimientos.jugarFicha(1,ficha)

    this.movimientos.extremo1=this.tablero.extremo1
    this.movimientos.extremo2=this.tablero.extremo2
    console.log("extremo1 t",this.movimientos.extremo1, " estremo2 t ",this.movimientos.extremo2);


}


tirarEstremo2(ficha:Ficha){

    if(ficha.lado1==this.tablero.extremo2){
        this.tablero.seTExtremo2(ficha.lado2,ficha.imagen2)
        
    }else{
        this.tablero.seTExtremo2(ficha.lado1,ficha.imagen1)
    }
    this.movimientos.jugarFicha(2,ficha)

    this.movimientos.extremo1=this.tablero.extremo1
    this.movimientos.extremo2=this.tablero.extremo2
    console.log("extremo1 t",this.movimientos.extremo1, " estremo2 t ",this.movimientos.extremo2);


}




sePuedeJuagar(arreglo:any){
    let resultado=false

    arreglo.forEach(element => {
        if(element.lado1==this.tablero.extremo1 || element.lado1==this.tablero.extremo2 ||
            element.lado2==this.tablero.extremo1 || element.lado2==this.tablero.extremo2
            ){
            resultado=true
        }
    });

    return resultado
}







 
    

}