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
  idPlayer=1
  ima="../../assets/imagenes/yelmo/1.png"
  fichas=[]
  contrincantes=['v','v','v']
  n=5
  purevaImagen='../../assets/imagenes/'+this.n+'.png'
  constructor(
    

  ) { }

  ngOnInit() {
     
      this.facilita.crearFicha()
      //console.log("fichas=\n",this.fichas);
      this.newF=this.facilita.repartirFichas()
    

      this.newF.forEach(element => {
        if(element.idJugador==this.idPlayer){
          this.fichas.push(element)
        }
      });
      
     this.fichas=this.newF
  }

  

  cambiar(){
    for (let index = 0; index < this.newF.length; index++) {
        console.log("foof");
        
            if(this.newF[index].idJugador!=1){
              this.newF[index].setIdJuagador(1)
              this.fichas.push( this.newF[index])
              console.log("Ficha:", this.fichas[index]);
              
              console.log("rompio");
              
              break;
            }
      
    }
  }

  jugar(ficha:Ficha){
      //console.log("ddd",ficha);
      
     ficha=this.facilita.JugarFichaF(ficha)
  }
  

}
