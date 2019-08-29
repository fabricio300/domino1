import { Component, OnInit } from '@angular/core';
import { Facilitador} from '../../logica/Facilitador'
import { Acciones1 } from '../../logica/Acciones1';

import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
import { Ficha } from 'src/logica/Ficha';
import { Agente} from '../../logica/Agente';



@Component({
  selector: 'app-juego1',
  templateUrl: './juego1.page.html',
  styleUrls: ['./juego1.page.scss'],

  animations: [
    trigger('itemState', [
      state('in', style({transform: 'translateX(0)'})),
      //Enter
      transition('void => *', [
        style({
          transform: 'translateX(-100%)'
        }),
        animate('300ms linear')
      ]),
      //Leave
      transition('* => void', animate('300ms ease-out', style({
        transform: 'translateX(100%)'
      }))),
    ])
  ]
})
export class Juego1Page implements OnInit {
  apariencia="../../assets/imagenes/calabera/"
  facilita = new Facilitador()
  acciones=new Acciones1()
  newF=[]
  idPlayer=null
  fondo:boolean =false
  turno
  dobleTiro=false
  fichas=[]
  tomaficha=false
  caja=true
  fichaD:Ficha
  imagenPerfil="../../assets/imagenes/calabera/calabera.png"
  
  cantidadDeJugadores=4
  Agentes=[]
  mula
  parienciasTurno=[]
  nombre="#yo"
  go=false
  constructor(
    

  ) { 
  

  }

  ngOnInit() {
    this.idPlayer=this.cantidadDeJugadores-1
    //document.getElementById("Marco").style.transition='0.5s'
   // document.getElementById("Marco").style.marginLeft="-100%"
    document.getElementById("ganadorContenedor").className="quitar"


      this.facilita.crearFicha(this.apariencia)
      //console.log("fichas=\n",this.fichas);
      this.newF=this.facilita.repartirFichas(this.cantidadDeJugadores-1)
      
      
      ///crear agentes
      for (let index = 0; index <this.cantidadDeJugadores-1; index++) {
            let agente=new Agente(this.facilita)
            agente.setIdPlayer(index)
            this.Agentes.push(agente)
      }

      //console.log("agentes= ",this.Agentes);
      
      this.Agentes.forEach(element => {
            element.asingnarfichas(this.newF)
            element.setTablero(this.facilita.tablero)  
      });

      this.newF.forEach(element => {
        if(element.idJugador==this.idPlayer){
          this.fichas.push(element)
        }
      });

      let auxi=[]

      this.newF.forEach(element => {
          if(element.idJugador==null){
            auxi.push(element)
          }
      });

      this.newF=auxi

    
    this.facilita.newCaja(this.newF)
    this.facilita.setFichasJugador(this.fichas,this.imagenPerfil,this.nombre)
    this.tirarMulaMayor()
  }

  




  jugar(ficha:Ficha){
      //console.log("turno",this.facilita.turno);
     
      let jugada=0
      if(this.turno==this.facilita.turno && this.go==true){
        jugada=this.facilita.JugarFichaF(ficha)
      
     // console.log("juagad=",jugada);
      
      switch(jugada){
        case 0: //this.existenFichasJugables()
          break;
          case 1: //ficha.setIdJuagador(null)
                  this.removerFicha(this.fichas,ficha)
                  let gane=this.facilita.verGanador(this.idPlayer,this.fichas,this.nombre,this.imagenPerfil)
                  if(gane==false)this.facilita.jugarTurno()
                  console.log("yo no paso zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz");
                  
                  this.facilita.saltar(false)
            break;
            case 2: 
              this.dobleTiro=true;
              document.getElementById("Marco").style.marginLeft="0"
              this.fichaD=ficha
              console.log("yo no paso zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz");
              this.facilita.saltar(false)
              break;
      }
    
    }

    
  }

  tirarLado1(){
      this.facilita.tirarLado1(this.fichaD)
      document.getElementById("Marco").style.marginLeft="-100%"
      this.dobleTiro=false;
      this.removerFicha(this.fichas,this.fichaD)
      let gane=this.facilita.verGanador(this.idPlayer,this.fichas,this.nombre,this.imagenPerfil)
      if(gane==false)this.facilita.jugarTurno()
      
  }
  
  tirarLado2(){
      this.facilita.tirarLado2(this.fichaD)
      document.getElementById("Marco").style.marginLeft="-100%"
      this.dobleTiro=false;
      this.removerFicha(this.fichas,this.fichaD)
      let gane=this.facilita.verGanador(this.idPlayer,this.fichas,this.nombre,this.imagenPerfil)
      if(gane==false)this.facilita.jugarTurno()

  }



  tomarFicha(ficha:Ficha){
    ficha.setIdJuagador(this.idPlayer)
    this.fichas.push(ficha)
    this.removerFicha(this.facilita.cajaDeFicha,ficha)
    document.getElementById("Marco").style.marginLeft="-100%"
    this.tomaficha=false

    console.log("tomo ficha", this.facilita.fichasJugables(this.fichas));
    console.log("fichas ",this.fichas);
    
    if(this.facilita.fichasJugables(this.fichas)==false){
      console.log("tomo ficha pero no se puede jugar");
      console.log("jugador pasa-------------------------------");
      this.facilita.saltar(true)
      this.facilita.jugarTurno()
    }
      
  }

  cajaBasia(){
    let res=false
    this.facilita.cajaDeFicha.forEach(element => {
        if(element.idJugador==null){
          res=true
        }
    });
    
    this.caja=res
    if(this.caja==false){

      setTimeout(function(){

          document.getElementById("Marco").style.marginLeft="-100%"
         console.log("jugador pasa-------------------------------");
        //  this.facilita.saltar(true)
          this.facilita.jugarTurno()
      },2000);
      
    }
  }


  existenFichasJugables(){
    
    //console.log("fichasss",this.facilita.fichasJugables(this.fichas) );
    if(this.facilita.fichasJugables(this.fichas)==false){
      this.mostrarCaja()
    }
    
  }

  mostrarCaja(){
    this.tomaficha=true
    this.cajaBasia()
    document.getElementById("Marco").style.marginLeft="0"
  }
  
  removerFicha(fichas:any, elemento:any){
    var i = fichas.indexOf( elemento );
    fichas.splice( i, 1 );

  }

  tirarMulaMayor(){
     // console.log("id=",this.idPlayer);
      this.facilita.setAgentes(this.Agentes)
    
      let mulas=[]
      let mandar=[]
      this.Agentes.forEach(element => {
          mulas.push(this.facilita.buscarMulaMayor(element.fichas ,element.idPlayer))
      });

      mulas.push(this.facilita.buscarMulaMayor(this.fichas,this.idPlayer))

    //  console.log("mula mayor=",mulas);
      
      let anterior=-1
      let contador=0
      let index=0
      let turnos
      let fic
      mulas.forEach(element => {
        if(element[1]>anterior){
          anterior=element[1]
          index=contador
        }
        contador++
      });

     // console.log("elegido=",mulas[index]);
      
     this.Agentes.forEach(element => {
        mandar.push(element.idPlayer)
     }); 
        mandar.push(this.idPlayer)

      if(index==this.idPlayer){
        this.fichas.forEach(element => {
            if(element.lado1==mulas[index][1] && element.lado2==mulas[index][1]){
             // console.log("econtrado",element);
              fic= element
            }
        });

          turnos= this.facilita.definirTurnos(this.idPlayer,mandar)        
      }else{
        
        
        this.Agentes[index].fichas.forEach(element => {
          if(element.lado1==mulas[index][1] && element.lado2==mulas[index][1]){
           // console.log("econtrado",element); 
            turnos= this.facilita.definirTurnos(element.idJugador,mandar)
              fic=element
          }
        });
        


      }

      console.log("turnoccc",turnos);
      this.facilita.turnos=turnos
      contador=0
      let contador2=0
      turnos.forEach(element => {
        if(element==this.idPlayer){
          this.turno=contador
          this.parienciasTurno.push({nombre:this.nombre,imagen:this.imagenPerfil,turno:this.turno+1})
        }else if(contador<=this.Agentes.length ){
          
          this.Agentes.forEach(element2 => {
            if(element2.idPlayer==element){
              element2.setTurno(contador)
              this.parienciasTurno.push({nombre:element2.nombre,imagen:element2.imagenPerfil,turno:element2.turno+1})
            }
          });
          contador2++   
        }
        contador++    
       
      });
     // console.log("mi turno es",this.turno);
      
      //console.log("mula -v ",fic);
     // console.log("#turno",this.facilita.turno);
      this.mula=fic

    
      //console.log("apa\n",this.parienciasTurno);
      
    // this.jugarmula()


      
  }


  jugarmula(){
    document.getElementById("Marco").style.transition='0.5s'
    document.getElementById("Marco").style.marginLeft="-100%"
    document.getElementById("turnosC").className="quitar"
    this.go=true
    this.facilita.setTrunoPlayer(this.turno,this.tomaficha,this.caja)
    if(this.mula.idJugador==this.idPlayer){
      this.jugar( this.mula)
    }else{
      this.facilita.Agentes.forEach(element => {
        if( this.mula.idJugador==element.idPlayer){
          element.jugarMula( this.mula)
        }
      });
    }
  }



  recetear(){
    location.reload()

  }



  
}
