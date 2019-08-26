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
  facilita = new Facilitador()
  acciones=new Acciones1()
  newF=[]
  idPlayer=null
  fondo:boolean =false
  turno
  dobleTiro=false
  fichas=[]
  contrincantes=["1","2","3"]
  imagenlado1="../../assets/imagenes/yelmo/"
  imagenlado2="../../assets/imagenes/yelmo/"
  tomaficha=true
  caja=true
  fichaD:Ficha
  
  cantidadDeJugadores=2
  Agentes=[]

  constructor(
    

  ) { 
  

  }

  ngOnInit() {
    this.idPlayer=this.cantidadDeJugadores-1
    document.getElementById("Marco").style.transition='0.5s'
    document.getElementById("Marco").style.marginLeft="-100%"
      this.facilita.crearFicha()
      //console.log("fichas=\n",this.fichas);
      this.newF=this.facilita.repartirFichas(this.cantidadDeJugadores-1)
      
      
      ///crear agentes
      for (let index = 0; index <this.cantidadDeJugadores-1; index++) {
            let agente=new Agente(this.facilita)
            agente.setIdPlayer(index)
            this.Agentes.push(agente)
      }

      console.log("agentes= ",this.Agentes);
      
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

     // console.log("newf" , this.newF);
      
      
    // this.fichas=this.newF
    this.facilita.newCaja(this.newF)
    this.tirarMulaMayor()
  }

  




  jugar(ficha:Ficha){
      //console.log("turno",this.facilita.turno);
     
      let jugada=0
      if(this.turno==this.facilita.turno){
        jugada=this.facilita.JugarFichaF(ficha)
      }
     // console.log("juagad=",jugada);
      
      switch(jugada){
        case 0:
          break;
          case 1: //ficha.setIdJuagador(null)
                  this.removerFicha(this.fichas,ficha)
                  let gane=this.facilita.verGanador(this.idPlayer,this.fichas,"yo")
                  if(gane==false)this.facilita.jugarTurno()
                    
            break;
            case 2: 
              this.imagenlado1="../../assets/imagenes/yelmo/"+ this.facilita.tablero.extremo1+".png"
               this.imagenlado2="../../assets/imagenes/yelmo/"+ this.facilita.tablero.extremo2+".png"
              this.dobleTiro=true;
              document.getElementById("Marco").style.marginLeft="0"
              this.fichaD=ficha
              break;
      }

      this.existenFichasJugables()
  }

  tirarLado1(){
      this.facilita.tirarLado1(this.fichaD)
      document.getElementById("Marco").style.marginLeft="-100%"
      this.dobleTiro=false;
      this.removerFicha(this.fichas,this.fichaD)
      this.facilita.jugarTurno()
  }
  
  tirarLado2(){
      this.facilita.tirarLado2(this.fichaD)
      document.getElementById("Marco").style.marginLeft="-100%"
      this.dobleTiro=false;
      this.removerFicha(this.fichas,this.fichaD)
      this.facilita.jugarTurno()

  }



  tomarFicha(ficha:Ficha){
    ficha.setIdJuagador(this.idPlayer)
    this.fichas.push(ficha)
    this.removerFicha(this.facilita.cajaDeFicha,ficha)
    document.getElementById("Marco").style.marginLeft="-100%"
    this.tomaficha=false
      
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
         
      },2000);
      this.facilita.jugarTurno()
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
        }else if(contador<=this.Agentes.length ){
          
          this.Agentes.forEach(element2 => {
            if(element2.idPlayer==element){
              element2.setTurno(contador)
            }
          });
          contador2++   
        }
        contador++    
       
      });
      console.log("mi turno es",this.turno);
      
      //console.log("mula -v ",fic);
     // console.log("#turno",this.facilita.turno);

      if(fic.idJugador==this.idPlayer){
        this.jugar(fic)
      }else{
        this.facilita.Agentes.forEach(element => {
          if(fic.idJugador==element.idPlayer){
            element.jugarMula(fic)
          }
        });
      }
      
     
      
  }

  
}
