import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  info={
    nombre:"miNombre",
    aspecto:"../../assets/imagenes/calabera/",
    numeroDeJuagores:2,
    perfil:"../../assets/imagenes/calabera/calabera.png"
  }

  constructor(
    public router:Router
  ) {}

  de2(){
    this.info.numeroDeJuagores=2
    this.enviar()
  }

  de3(){
    this.info.numeroDeJuagores=3
    this.enviar()
  }

  de4(){
    this.info.numeroDeJuagores=4
    this.enviar()
  }

  enviar(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(this.info)
      }
    };
    this.router.navigate(['domino1'], navigationExtras);
  }





}
