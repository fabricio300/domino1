import { Component, OnInit } from '@angular/core';

import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';


import { ActivatedRoute, Router } from '@angular/router';
import { Facilitador } from '../../logica2/Facilitador';
import { Ficha } from 'src/logica2/Ficha';


@Component({
  selector: 'app-domino1',
  templateUrl: './domino1.page.html',
  styleUrls: ['./domino1.page.scss'],
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
export class Domino1Page implements OnInit {
  facilitador=new Facilitador()
  data: any;
  id:any
  mula:any
  fichaDoble:Ficha

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
        this.data = JSON.parse(params.special);
        //console.log("data= ",this.data);
    });

   
    
  }

  ngOnInit() {
    //console.log("data= ",this.data.aspecto);
    this.facilitador.crearAgentes(this.data.numeroDeJuagores)
    this.facilitador.setDatosPlayer(this.data)
    try {
      this.facilitador.definirId()
      this.facilitador.crearFicha(this.data.aspecto)
      this.facilitador.repartirFichas()
      this.facilitador.Agentes.forEach(element => {
            element. setFacilitador(this.facilitador)
      });

      this.mula=this.facilitador.encontrarMula()

      console.log("999999999999999999999999999",this.mula);
      

    } catch (error) {
      console.log("espera");
      location.reload();
    }
    

  }


  tirarmula(){
      this.facilitador.tirarMula(this.mula)
  }

  
  tiraFicha(ficha:Ficha){
    
    console.log("se puede jugar = ",this.facilitador.sePuedeJuagar(this.facilitador.fichasDelJugador));
    
     let jugada= this.facilitador.jugarFicha(ficha)

     console.log("jugado=",jugada);

     switch(jugada){
       case 1: this.removerFicha(ficha)
        break;
       case 2: this.facilitador.tiroDoble=true
                document.getElementById('Marco1111').scrollIntoView(true );
               
                this.facilitador.mostrarMarco()
                this.fichaDoble=ficha
         break;

     }
     
  }

  tiraLado1(){
    this.facilitador.tirarEstremo1(this.fichaDoble)
    this.facilitador.ocultarMarco()
    this.facilitador.tiroDoble=false
    this.removerFicha(this.fichaDoble)
  }


  tiraLado2(){
    this.facilitador.tirarEstremo2(this.fichaDoble)
    this.facilitador.ocultarMarco()
    this.facilitador.tiroDoble=false
    this.removerFicha(this.fichaDoble)
  }


  removerFicha(fiha:Ficha){
    this.facilitador.removerElemetoDearreglo(this.facilitador.fichasDelJugador,fiha)
  }
}
