import { Ficha } from './Ficha';



export class Acciones1{
    posicionMedia=45  /* 45 pc  / 40 movil */ 
    tamani2=120   /* 120 pc  / 80 movil */ 
    tamani1=60    /* 60 pc  / 40 movil */ 

    

    extremoDerecho=null
    exremoIzquierdo=null

    iZquierda=120
    derecha=120
    verticalIzquierda=0
    verticalDerecha=0



    contadorIzquierda=0
    contadorDerecha=0

    inverzaDerecha=false
    inverzaIzquierda=false
    constructor(){}
    /// 1 == izquierda / 2 == derecha
    ponerFicha(fichap:Ficha,ladoJuego:any){
      
        let ficha:any 
        
        if(ladoJuego==null){
            ficha =this.FichaAcostada(fichap.imagen1,fichap.imagen2)
        }
        
        console.log("AC lado ",ladoJuego);
        
        if(ladoJuego==1){
            if(fichap.lado1==this.exremoIzquierdo){
               ficha =this.tipoIzquierda(fichap.imagen2,fichap.imagen1)
            }else{
                ficha =this.tipoIzquierda(fichap.imagen1,fichap.imagen2)
            }

        
           
        }else if((ladoJuego==2)){
            if(fichap.lado2==this.extremoDerecho){
                ficha =this.tipoDerecha(fichap.imagen2,fichap.imagen1)
            }else{
                ficha =this.tipoDerecha(fichap.imagen1,fichap.imagen2)
            }

            
           
        }
      
       //var ficha=this.FichaDePie()

       
    
    
        ficha.animate([
            // keyframes
            {  opacity: 0 }, 
            {  opacity: 1 },
            
          ], { 
            // timing options
            duration: 1000,
           
          });
        
        
        document.getElementById('table').append(ficha)
    
       
       
    }
    
/*---------------------------posicionar fichas--------------------------------------------------------------*/

    tipoDerecha(imagen1,imagen2){
        let ficha
        if(this.contadorDerecha<4){
            ficha=this.FichaAcostada(imagen1,imagen2)
            ficha=this.pocicionarDerecha(ficha)
            this.contadorDerecha=this.contadorDerecha+1
        }else if(this.inverzaDerecha!=false){
            ficha=this.FichaAcostada(imagen2,imagen1)
            ficha=this.pocicionarDerechaInversa(ficha)
        }else{
            ficha=this.FichaDePie(imagen1,imagen2)
            ficha.style.marginLeft=''+this.derecha+'px'
            this.verticalDerecha=this.verticalDerecha+120
            this.derecha=this.derecha-(this.tamani2/2)
            this.inverzaDerecha=true;
        }
        return ficha
    }

    pocicionarDerecha(ficha){
        console.log("derecha");
        ficha.style.marginLeft=''+this.derecha+'px'
        ficha.style.marginTop=''+this.verticalDerecha+'px'
        this.derecha=this.derecha+this.tamani2

        return ficha
    }

    pocicionarDerechaInversa(ficha){
        ficha.style.marginLeft=''+this.derecha+'px'
        ficha.style.marginTop=''+this.verticalDerecha+'px'
        this.derecha=this.derecha-this.tamani2

        return ficha
    }


   




    tipoIzquierda(imagen1,imagen2){
        let ficha
        if(this.contadorIzquierda<4){
            ficha=this.FichaAcostada(imagen1,imagen2)
            ficha=this.pocicionarIzquierda(ficha)
            this.contadorIzquierda=this.contadorIzquierda+1
        }else if(this.inverzaIzquierda!=false){
            ficha=this.FichaAcostada(imagen2,imagen1)
            ficha=this.pocicionarIzquierdaInversa(ficha)
        }else{
            ficha=this.FichaDePie(imagen1,imagen2)
            ficha.style.marginLeft='-'+(this.iZquierda-60)+'px'
            this.verticalIzquierda=this.verticalIzquierda-60
            ficha.style.marginTop=''+(this.verticalIzquierda)+'px'
            this.verticalIzquierda=this.verticalIzquierda-60
            
            this.iZquierda=this.iZquierda-(this.tamani2/2)
            this.iZquierda=this.iZquierda*(-1)
            this.inverzaIzquierda=true;
        }
        return ficha
    }


    pocicionarIzquierda(ficha){
        console.log("izquierda");
        ficha.style.marginLeft='-'+this.iZquierda+'px'
        this.iZquierda=this.iZquierda+this.tamani2
        ficha.style.marginTop=''+this.verticalIzquierda+'px'
        return ficha
    }

    pocicionarIzquierdaInversa(ficha){
        ficha.style.marginLeft=''+this.iZquierda+'px'
        ficha.style.marginTop=''+this.verticalIzquierda+'px'
        this.iZquierda=this.iZquierda+this.tamani2
        return ficha
    }


/*---------------------------posicionar fichas fin --------------------------------------------------------------*/
 
    tipoFicha(imagen2,imagen1 ,tipo){
        let fichap:any
        if(tipo==1){
            fichap =this.FichaDePie(imagen2,imagen1)
        }else{
            fichap =this.FichaAcostada(imagen2,imagen1)
        }
        return fichap
    }


    FichaAcostada(lado1,lado2){
    /* ficha acostada------------------------------------------ */
     var ficha1=document.createElement("div");
     ficha1.setAttribute("id","idFichajugada")
     ficha1.style.width=''+this.tamani2+'px';
     ficha1.style.height=''+this.tamani1+'px';
     ficha1.style.overflow="hidden"
     ficha1.style.position="absolute"
     ficha1.style.top=''+this.posicionMedia+'%'
     ficha1.style.left=''+this.posicionMedia+'%'
     ficha1.style.display='flex'
    
     var parte1=document.createElement("div");
     parte1.style.width='50%'
     parte1.style.height='100%'
     parte1.style.textAlign='center'
 
     var parte2=document.createElement("div");
     parte2.style.width='50%'
     parte2.style.height='100%'
     parte2.style.textAlign='center'
        
 
     var ima1=document.createElement("img");
     ima1.setAttribute("src",""+lado1)
     ima1.style.height='100%'
     ima1.style.border='1px solid black'
     ima1.style.transform='rotate(90deg)'
 
 
     var ima2=document.createElement("img");
     ima2.setAttribute("src",""+""+lado2)
     ima2.style.height='100%'
     ima2.style.border='1px solid black'
     ima2.style.transform='rotate(90deg)'
 
 
     ficha1.appendChild(parte1)
     ficha1.appendChild(parte2)
     parte1.appendChild(ima1)
     parte2.appendChild(ima2)


     return ficha1
    
}




FichaDePie(lado1,lado2){
    /* ficha de pie------------------------------------------ */
    var ficha1=document.createElement("div");
    ficha1.style.width=''+this.tamani1+'px';
    ficha1.style.height=''+this.tamani2+'px';
    ficha1.style.overflow="hidden"
    ficha1.setAttribute("id","idFichajugada")
    
    ficha1.style.position="absolute"
    ficha1.style.top=''+this.posicionMedia+'%'
    ficha1.style.left=''+this.posicionMedia+'%'

 
    var parte1=document.createElement("div");
    parte1.style.width='100%'
    parte1.style.height='50%'
    parte1.style.textAlign='center'
 

    var parte2=document.createElement("div");
    parte2.style.width='100%'
    parte2.style.height='50%'
    parte2.style.textAlign='center'
    
    var ima1=document.createElement("img");
    ima1.setAttribute("src",""+lado1)
    ima1.style.height='100%'
    ima1.style.border='1px solid black'
    


    var ima2=document.createElement("img");
    ima2.setAttribute("src",""+lado2)
    ima2.style.height='100%'
    ima2.style.border='1px solid black'
   


    ficha1.appendChild(parte1)
    ficha1.appendChild(parte2)
    parte1.appendChild(ima1)
    parte2.appendChild(ima2)

    return ficha1
}

    setLadoIzquierdo(valor){
        this.exremoIzquierdo=valor
      
    }

    setLadoDerecho(valor){
        this.extremoDerecho=valor
        console.log("------------------------tablero--------------------------------------------");
        console.log("tablero: lado1 ",this.exremoIzquierdo);
        console.log("tablero: lado2 ",this.extremoDerecho);
        console.log("------------------------tablero--------------------------------------------");
    }

}