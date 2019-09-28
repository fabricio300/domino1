import { Ficha } from './Ficha';
import { Facilitador } from './Facilitador';




export class Agente{
    facilitador
    id
    nombre
    imagenPerfil
    apariencia
    fichas=[]
    cantidadDeFichas=0
    turno

    constructor(){
        let res= Math.floor(Math.random() * (7 - 1)) + 1
        //console.log("radom= ",res);  
        this.definirApariencia(res)
       
    }

    setFacilitador(facilitador:Facilitador){
        this.facilitador=facilitador
    }

    setTurno(turno){
        this.turno=turno
    }
    definirApariencia(eleccion){
        switch (eleccion) {
                case 1: this.imagenPerfil="../../assets/imagenes/normal/normal.png"
                        this.apariencia="../../assets/imagenes/normal/"
                break;

                case 2:this.imagenPerfil="../../assets/imagenes/sol/sol.png"
                       this.apariencia="../../assets/imagenes/sol/"
                break;

                case 3:this.imagenPerfil="../../assets/imagenes/yelmo/yelmo.png"
                this.apariencia="../../assets/imagenes/yelmo/"
                break

                case 4:this.imagenPerfil="../../assets/imagenes/calabera/calabera.png"
                        this.apariencia="../../assets/imagenes/calabera/"
                
                break;
                case 5:this.imagenPerfil="../../assets/imagenes/punch/puño.png"
                      this.apariencia="../../assets/imagenes/punch/"
                
                break;
                case 6:this.imagenPerfil="../../assets/imagenes/star/star.png"
                         this.apariencia="../../assets/imagenes/star/"
                break;
                case 7:this.imagenPerfil="../../assets/imagenes/luna/luna.png"
                        this.apariencia="../../assets/imagenes/luna/"
                break;
        
            default:
                break;
        }

        this.nombrar()
}

nombrar(){
    let elementos=['0','1','2','3','4','5','6','7','8','9' ,'a',
    'b','c','d','e','f','g','h','i','j','k','l','m','n ','ñ','o','p','q','r','s','t',
    'u','v','w','x','y','z']

    elementos=this.ordenarAleatoriamente(elementos)

    let res="Go"
    for (let index = 0; index <3; index++) {
        
        res=res+elementos[index]
    }

    this.nombre=res
}


ordenarAleatoriamente(arreglo){
    arreglo.forEach((val, key) => {
        let randomIndex = Math.ceil(Math.random()*(key + 1));
        arreglo[key] =  arreglo[randomIndex];
        arreglo[randomIndex] = val;
 });

 return arreglo
}


setId(id){
    this.id=id
}

setFichas(fichas:[]){
        this.fichas=fichas
        this.fichas.forEach(element => {
            let img1=this.apariencia+element.lado1+'.png'
            let img2=this.apariencia+element.lado2+'.png'
            try {
                element.setImagen1(img1)
                element.setImagen2(img2)
            } catch (error) {
                console.log("no se pudo cambiar la imagen de la ficha");
                
            }
            
        });
        this.cantidadDeFichas=fichas.length
}


/************************************************************************ */

tomarFicha(){
    let res= Math.floor(Math.random() * (this.facilitador.caja.length - 0)) + 0
    //console.log("res==================",res);
    this.facilitador.caja[res].setIdJuagador(this.id)
    //console.log("ficha elegida ",this.facilitador.caja[res]);
    this.fichas.push(this.facilitador.caja[res])
    this.cantidadDeFichas=this.fichas.length
    this.facilitador.removerElemetoDearreglo(this.facilitador.caja,this.facilitador.caja[res])

}


}