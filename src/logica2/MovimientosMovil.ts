import { style } from '@angular/animations';
import { Tablero } from './Tablero';
import { Ficha } from './Ficha';


export class MovimientosMovil{

    fichaAncho=40 /* 60 pc / 40 movil */
    fichaAlto=80 /* 120 pc / 80 movil */

    marginLeft=0
    marginRight=0
    marginTop=0
    marginBootom=0
    condorI=0
    condorD=0
    contadorTop=0
    contadorBotom=0
    direccionD=false
    direccionI=false
    margenTablero=0;
    tableroTop=200
    tableroBotom=180
    idFicha=1

    extremo1=0
    extremo2=0

    constructor(){
       
    }
    jugarFicha(lado,fichax:Ficha){
        document.getElementById('Tablero0').style.overflowY='scroll'
        console.log("3333333333333333333333333");
        
        let ficha:any 
        
        if(lado==1){
            if(fichax.lado1==this.extremo1){
                ficha=this.definirIzquierda(fichax.imagen2,fichax.imagen1) 
            }else{
                
                ficha=this.definirIzquierda(fichax.imagen1,fichax.imagen2) 
            }
            document.getElementById('Arriba').scrollIntoView(true );
        }else{
           
            if(fichax.lado1==this.extremo2){
                ficha=this.definirDerecha(fichax.imagen2,fichax.imagen1)
            }else{
                ficha=this.definirDerecha(fichax.imagen1,fichax.imagen2)
            }
             document.getElementById('Abajo').scrollIntoView(true );
        }
        ficha.setAttribute("id",''+this.idFicha+"jugada");
       
        
       document.getElementById('Tablero').append(ficha)
    }


    primeraFicha(lado1,lado2){
        let ficha=this.crearFicha(lado1,lado2)
        ficha.style.marginLeft='0.2px'
        document.getElementById('Tablero').append(ficha)
        this.marginLeft=80;
        this.marginRight=80;
        this.marginTop=78
    }

/*--------------------------------izquierda------------------------------------------------------------------------ */


    definirIzquierda(lado1,lado2){
        let ficha:any 
       
        if(this.condorI<1){
         ficha=this.crearFicha(lado1,lado2)
         ficha.style.marginLeft='-'+this.marginLeft+'px'  
         this.marginLeft=this.marginLeft+this.fichaAlto; 
        }
        
        else if(this.condorI==1){
            ficha=this.crearFichaDepie(lado1,lado2)
            ficha.style.marginTop='-18px'
            ficha.style.marginLeft='-'+(this.marginLeft-20)+'px' 
            this.marginLeft=this.marginLeft-40; 
            this.marginLeft=this.marginLeft*(-1)
            this.condorI=2
            this.contadorTop++
        }else{   
            
            if(this.condorI<7){
               
                
                if(this.direccionD==false){
                    ficha=this.crearFicha(lado2,lado1)
                    ficha.style.marginTop='-'+this.marginTop+'px'
                    ficha.style.marginLeft=''+this.marginLeft+'px' 
                   this.marginLeft=this.marginLeft+this.fichaAlto;  
                }else{
                    ficha=this.crearFicha(lado1,lado2)
                    ficha.style.marginTop='-'+this.marginTop+'px'
                    ficha.style.marginLeft=''+this.marginLeft+'px' 
                    this.marginLeft=this.marginLeft-this.fichaAlto;  
                }
                


            }else{
                 
               

                if(this.direccionD==false){
                    console.log("zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz");
                    ficha=this.crearFichaDepie(lado1,lado2)
                    this.direccionD=true
                    this.marginTop=this.marginTop+60
                    ficha.style.marginTop='-'+this.marginTop+'px'
                    ficha.style.marginLeft=''+(this.marginLeft-60)+'px'
                    this.marginLeft=this.marginLeft-120; 
                    this.marginTop=this.marginTop+20
                    this.condorI=3
                }else{
                    console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");
                    
                    ficha=this.crearFichaDepie(lado1,lado2)
                    this.direccionD=false
                    this.marginTop=this.marginTop+20
                    ficha.style.marginTop='-'+this.marginTop+'px'
                    ficha.style.marginLeft=''+(this.marginLeft+20)+'px'
                    this.marginTop=this.marginTop+60
                    this.marginLeft=this.marginLeft+40; 
                    this.condorI=2
                }
                
               
                    
              
               


                
                this.contadorTop++
                

                if(this.contadorTop>2){
                    document.getElementById('Tablero').style.marginTop=''+this.tableroTop+'px'
                    this.tableroTop=this.tableroTop+150
                   
                }
            }
            

            
        }

        this.condorI++
       
        return ficha
    }

      
/*--------------------------------derecha------------------------------------------------------------------------ */

    definirDerecha(lado1,lado2){
        let ficha:any 

        if(this.condorD<1){
            ficha=this.crearFicha(lado2,lado1)
            ficha.style.marginLeft=''+this.marginRight+'px'
            this.marginRight=this.marginRight+this.fichaAlto;
        }
        else if(this.condorD==1){
            ficha=this.crearFichaDepie(lado2,lado1)
            ficha.style.marginTop='20px'
            ficha.style.marginLeft=''+(this.marginRight-20)+'px'
            this.marginRight=this.marginRight-40; 
            this.marginBootom=this.marginBootom+80
            this.condorD=2
        }else{
            

            if(this.condorD<7){
                

                if(this.direccionI==false){
                    ficha=this.crearFicha(lado1,lado2)
                    ficha.style.marginTop=''+this.marginBootom+'px'
                    ficha.style.marginLeft=''+this.marginRight+'px'
                    this.marginRight=this.marginRight-this.fichaAlto;
                }else{
                    ficha=this.crearFicha(lado2,lado1)
                    ficha.style.marginTop=''+this.marginBootom+'px'
                    ficha.style.marginLeft=''+this.marginRight+'px'
                    this.marginRight=this.marginRight+this.fichaAlto;
                }
                

            }else{
            
                

                if(this.direccionI==false){

                    console.log("booooooooooooooooooooooooooooooooo");
                    
                    ficha=this.crearFichaDepie(lado2,lado1)
                    this.direccionI=true
                    this.marginBootom=this.marginBootom+60
                    this.marginRight=this.marginRight+60
                    ficha.style.marginTop=''+this.marginBootom+'px'
                    ficha.style.marginLeft=''+this.marginRight+'px'
                    this.marginRight=this.marginRight-this.fichaAlto;
                    this.marginBootom=this.marginBootom+20
                    this.marginRight=this.marginRight+140
                    this.condorD=3
                }else{
                    ficha=this.crearFichaDepie(lado2,lado1)
                    this.direccionI=false
                    this.marginBootom=this.marginBootom+20
                    this.marginRight=this.marginRight-20
                    ficha.style.marginTop=''+this.marginBootom+'px'
                    ficha.style.marginLeft=''+this.marginRight+'px'
                    this.marginRight=this.marginRight-20
                    this.marginBootom=this.marginBootom+60
                    this.condorD=2
                }


                
                this.contadorBotom++

                if(this.contadorBotom>1){
                    document.getElementById('Abajo').style.marginBottom='-'+this.tableroBotom+'px'  
                    this.tableroBotom=this.tableroBotom+50                
                   
                }

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