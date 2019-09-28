import { Ficha } from './Ficha';



export class Movimientos{

    fichaAncho=60 /* 60 pc / 40 movil */
    fichaAlto=120 /* 120 pc / 80 movil */

    marginLeft=0
    marginRight=0

    condorI=0
    condorD=0

    margenTablero=0;

    extremo1=0
    extremo2=0

    constructor(){

    }


    jugarFicha(lado,fichax:Ficha ){
      
        
        let ficha:any 
        if(lado==1){
            if(fichax.lado1==this.extremo1){
                ficha=this.definirIzquierda(fichax.imagen2,fichax.imagen1) 
            }else{
                
                ficha=this.definirIzquierda(fichax.imagen1,fichax.imagen2) 
            }
           
        }else{

            if(fichax.lado1==this.extremo2){
                ficha=this.definirDerecha(fichax.imagen1,fichax.imagen2)
            }else{
                ficha=this.definirDerecha(fichax.imagen2,fichax.imagen1)
            }
            
        }

        
       document.getElementById('Tablero').append(ficha)
    }




    primeraFicha(lado1, lado2){
       
        let ficha=this.crearFicha(lado1,lado2)
        ficha.style.marginLeft='0.2px'
        document.getElementById('Tablero').append(ficha)
        this.marginLeft=120;
        this.marginRight=120
    }


    definirIzquierda(lado1,lado2){
        let ficha:any 
       
        if(this.condorI<4){
         ficha=this.crearFicha(lado1,lado2)
         ficha.style.marginLeft='-'+this.marginLeft+'px'  
         this.marginLeft=this.marginLeft+this.fichaAlto; 
        }else if(this.condorI==4){
            ficha=this.crearFichaDepie(lado1,lado2)
            ficha.style.marginTop='-28px'
            ficha.style.marginLeft='-'+(this.marginLeft-30)+'px' 
            this.marginLeft=this.marginLeft-60; 
            this.marginLeft=this.marginLeft*(-1)
        }else{     
            ficha=this.crearFicha(lado2,lado1)
            ficha.style.marginTop='-118px'
            ficha.style.marginLeft=''+this.marginLeft+'px'  
            this.marginLeft=this.marginLeft+this.fichaAlto; 
        }

        this.condorI++
       
        return ficha
    }



    definirDerecha(lado1,lado2){
        let ficha:any 
        
        

        if(this.condorD<4){
            ficha=this.crearFicha(lado1,lado2)
            ficha.style.marginLeft=''+this.marginRight+'px'
            this.marginRight=this.marginRight+this.fichaAlto;
        }else if(this.condorD==4){
            ficha=this.crearFichaDepie(lado1,lado2)
            ficha.style.marginTop='31px'
            ficha.style.marginLeft=''+(this.marginRight-30)+'px'
            this.marginRight=this.marginRight-60; 
            
        }else{
            ficha=this.crearFicha(lado2,lado1)
            ficha.style.marginTop='118px'
            ficha.style.marginLeft=''+this.marginRight+'px'
            this.marginRight=this.marginRight-this.fichaAlto;

            if(this.condorD>13){
                this.margenTablero=this.margenTablero+200
                document.getElementById('Tablero').style.marginLeft=''+this.margenTablero+'px'
            }
        }


        
        this.condorD++
        return ficha
    }

    


    crearFicha(lado1,lado2){
        var ficha1=document.createElement("div");
        ficha1.setAttribute("id","idFichajugada")
        ficha1.style.width=''+this.fichaAlto+'px';
        ficha1.style.height=''+this.fichaAncho+'px';
        ficha1.style.overflow="hidden"
        ficha1.style.position="absolute"
         
        ficha1.style.display='flex'
   
        ficha1.style.borderRadius="5px"
        ficha1.style.background="black"
        ficha1.style.border="1px solid black;"
   
   
       
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
        ima1.style.borderRadius="5px"
    
    
        var ima2=document.createElement("img");
        ima2.setAttribute("src",""+""+lado2)
        ima2.style.height='100%'
        ima2.style.border='1px solid black'
        ima2.style.transform='rotate(90deg)'
        ima2.style.borderRadius="5px"
    
        ficha1.appendChild(parte1)
        ficha1.appendChild(parte2)
        parte1.appendChild(ima1)
        parte2.appendChild(ima2)
        return ficha1
    }



    crearFichaDepie(lado1,lado2){
        /* ficha de pie------------------------------------------ */
        var ficha1=document.createElement("div");
        ficha1.style.width=''+this.fichaAncho+'px';
        ficha1.style.height=''+this.fichaAlto+'px';
        ficha1.style.overflow="hidden"
        ficha1.setAttribute("id","idFichajugada")
        ficha1.style.position="absolute"
     
    
        ficha1.style.borderRadius="5px"
        ficha1.style.background="black"
        ficha1.style.border="1px solid black;"
     
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
        ima1.style.borderRadius="5px"
    
    
        var ima2=document.createElement("img");
        ima2.setAttribute("src",""+lado2)
        ima2.style.height='100%'
        ima2.style.border='1px solid black'
        ima2.style.borderRadius="5px"
    
    
        ficha1.appendChild(parte1)
        ficha1.appendChild(parte2)
        parte1.appendChild(ima1)
        parte2.appendChild(ima2)
    
        return ficha1
    }


}