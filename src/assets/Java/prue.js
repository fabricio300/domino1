
var posicionMedia=40  /* 45 pc  / 40 movil */ 
var tamani2=80    /* 120 pc  / 80 movil */ 
var tamani1=40      /* 60 pc  / 40 movil */ 

/*lado izquierdo */
izquierdaDerecha=-80
arribaAbajo=0

cont=0

function cam(){
    console.log("contador=",cont);
    
   var ficha=FichaAcostada()
    if(cont>0){
        ficha=setPositionX(ficha)
    }


    var new_div = $(ficha).hide();
    $('#table').append(new_div);
    new_div.show(1000);

    cont++;
}



function setPositionX(ficha){
    ficha.style.marginLeft=''+izquierdaDerecha+'px'
    return ficha
}




function FichaAcostada(){
    console.log("cam");
    
    /* ficha acostada------------------------------------------ */
     var ficha1=document.createElement("div");
     ficha1.style.width=''+tamani2+'px';
     ficha1.style.height=''+tamani1+'px';
     ficha1.style.overflow="hidden"
     ficha1.style.position="absolute"
     ficha1.style.top=''+posicionMedia+'%'
     ficha1.style.left=''+posicionMedia+'%'
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
     ima1.setAttribute("src","../../assets/imagenes/yelmo/2.png")
     ima1.style.height='100%'
     ima1.style.border='1px solid black'
     ima1.style.transform='rotate(90deg)'
 
 
     var ima2=document.createElement("img");
     ima2.setAttribute("src","../../assets/imagenes/yelmo/1.png")
     ima2.style.height='100%'
     ima2.style.border='1px solid black'
     ima2.style.transform='rotate(90deg)'
 
 
     ficha1.appendChild(parte1)
     ficha1.appendChild(parte2)
     parte1.appendChild(ima1)
     parte2.appendChild(ima2)

     return ficha1
}

function FichaDePie(){
    /* ficha de pie------------------------------------------ */
    var ficha1=document.createElement("div");
    ficha1.style.width=''+tamani1+'px';
    ficha1.style.height=''+tamani2+'px';
    ficha1.style.overflow="hidden"
  
    ficha1.style.position="absolute"
    ficha1.style.top=''+posicionMedia+'%'
    ficha1.style.left=''+posicionMedia+'%'

 
    var parte1=document.createElement("div");
    parte1.style.width='100%'
    parte1.style.height='50%'
    parte1.style.textAlign='center'
 

    var parte2=document.createElement("div");
    parte2.style.width='100%'
    parte2.style.height='50%'
    parte2.style.textAlign='center'
    
    var ima1=document.createElement("img");
    ima1.setAttribute("src","../../assets/imagenes/yelmo/2.png")
    ima1.style.height='100%'
    ima1.style.border='1px solid black'
    


    var ima2=document.createElement("img");
    ima2.setAttribute("src","../../assets/imagenes/yelmo/1.png")
    ima2.style.height='100%'
    ima2.style.border='1px solid black'
   


    ficha1.appendChild(parte1)
    ficha1.appendChild(parte2)
    parte1.appendChild(ima1)
    parte2.appendChild(ima2)

    return ficha1
}