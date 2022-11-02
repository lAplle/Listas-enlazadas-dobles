class Inventario{
    constructor(){
        this.primero = null;
        this.ultimo = null;
    }
    // agreR(nuevo,item){
        //     if(item.siguiente == null){
    //         let temp = this.primero;
    //         while (temp != null) {
    //             if (nuevo.codigo == temp.codigo) {
        //                 console.log('falo');
        //                 return false;
    //             }
    //             temp = temp.siguiente;
    //         }
    //         item.siguiente = nuevo;
    //     }else{
        //         this.agreR(nuevo, item.siguiente);
    //     }
    // }
    agregar(nuevo){
        if (this.primero==null){
            this.primero=nuevo;
            this.ultimo=nuevo;
        }
        else if(nuevo.codigo<this.primero.codigo){
            this.primero.anterior=nuevo;
            nuevo.siguiente=this.primero;
            this.primero=nuevo;
        }
        else if(this.ultimo.codigo<nuevo.codigo){
            this.ultimo.siguiente=nuevo;
            nuevo.anterior=this.ultimo;
            this.ultimo=nuevo;
        }
        else{
            let temp=this.primero;
            while (temp.siguiente!=null){
                if(temp.codigo<nuevo.codigo && temp.siguiente.codigo> nuevo.codigo){
                    temp.siguiente.anterior=nuevo;
                    nuevo.siguiente= temp.siguiente;
                    nuevo.anterior=temp;
                    temp.siguiente=nuevo;
                }
                temp=temp.siguiente;
            }
        }
    }
    eliminar(codigo){
        if(this.primero.codigo==codigo){
            this.primero=this.primero.siguiente;
            return;
        }
        else{
            let temp=this.primero;
            while(temp!=null){
                if(temp.siguiente.codigo==codigo){
                    temp.siguiente.siguiente.anterior=temp;
                    temp.siguiente=temp.siguiente.siguiente;
                    return;
                }
                else{
                    temp=temp.siguiente;
                }
            }
        }
    }
    
    
    // insertar(posicion, nuevo){
        //     if(this.primero == null && posicion != 1){
            //         return false;
            //     }
            //     if(this.primero == null && posicion == 1){
                //         this.primero = nuevo;
                //         return true;
                //     }
                //     let temp = this.primero;
                //     let count = 1;
                //     while(temp != null){
                    //         if(count == posicion && posicion == 1){
                        //             this.primero = nuevo;
                        //             nuevo.siguiente = temp;
                        //             return true;
                        //         } else if(count+1 == posicion){
                            //             nuevo.siguiente = temp.siguiente;
                            //             temp.siguiente = nuevo;
                            //             return true;
                            //         } else if(temp.siguiente == null && count < posicion){
                                //             temp.siguiente = nuevo;
                                //             nuevo.siguiente = null;
                                //             return true;
                                //         }
                                //         temp = temp.siguiente;
                                //         count++;
                                //     }
                                //     return false;
                                // }
    listar(){
        let list="";
        let temp = this.primero;
        while(temp != null){
            list += "<" + temp.codigo + "> Nombre: " + temp.nombre
            + " Costo: " + temp.costo + " Cantidad: " + temp.cantidad + "<br>";
            temp = temp.siguiente;
        }
        return list;
    }
    listarInverso(){
        let listadoInv="";
        let tempList = "";
        let temp = this.primero;
        while(temp != null){
            tempList = listadoInv;
            listadoInv = "";
            listadoInv += "<" + temp.codigo + "> Nombre: " + temp.nombre
            + " Costo: " + temp.costo + " Cantidad: " + temp.cantidad + "<br>" + tempList;
            
            temp = temp.siguiente;
        }
        return listadoInv;
    }
    buscar(codigo){
        let temp = this.primero;
        while(temp != null){
            if(temp.codigo === codigo){
                return temp;
            }
            temp = temp.siguiente;
        }
        return null;
    }
}
const inventario = new Inventario();

const nombre = document.getElementById("nombre");
const codigo = document.getElementById("codigo");
const cantidad = document.getElementById("cantidad");
const precio = document.getElementById("precio");
const lista = document.getElementById("lista");
const busqueda = document.getElementById("busqueda");
const posicion = document.getElementById("posicion");

const btnBuscar = document.getElementById("buscar");
const btnListar = document.getElementById("listar");
const btnAgregar = document.getElementById("agregar")
// const btnInsertar = document.getElementById("insertar");
const btnEliminar = document.getElementById("eliminar");
const btnInverso = document.getElementById("inverso");
class Producto{
    constructor(codigo,nombre,cantidad,costo){
        this.codigo = codigo;
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.costo = costo;
    }
    PCodigo(){
        return this.codigo;
    }
    info(){
        return `<div> Codigo: ${this.codigo}<br>Nombre: ${this.nombre}<br>Cantidad: ${this.cantidad}<br>Costo: $${this.costo}</div>`;
    }
}



btnListar.addEventListener("click",()=>{
    let list = "";
    list = inventario.listar()
    if(list === ""){
        return lista.innerHTML = "0 registros al hilo.";
    }
    lista.innerHTML = inventario.listar();
})

btnAgregar.addEventListener("click",()=>{
    if(!codigo.value || !nombre.value || !cantidad.value || !precio.value){
        return lista.innerHTML = "Faltan datos";
    } else{
        var producto = new Producto(Number(codigo.value),nombre.value,cantidad.value,precio.value)
    }
    if(inventario.agregar(producto) == false){
        return lista.innerHTML = "Ya existe el codigo";
    } else {
        lista.innerHTML = inventario.listar();
    }
})

// btnInsertar.addEventListener("click",()=>{
//     if(!codigo.value || !nombre.value || !cantidad.value || !precio.value){
//         return lista.innerHTML = "Datos faltantes...";
//     }else if(!posicion.value){
//         return lista.innerHTML = "Posición requerida...";
//     } else {
//         producto = new Producto(Number(codigo.value),nombre.value,cantidad.value,precio.value)
//         inventario.insertar(Number(posicion.value), producto); 
//         lista.innerHTML = inventario.listar();
//     }
// })



btnBuscar.addEventListener("click",()=>{
    let codigo=Number(document.getElementById('busqueda').value);
    let buscador= inventario.buscar(codigo);
    if(buscador=== null){
        document.getElementById('lista').innerHTML=`<p>Ningun producto tiene tal codigo</p>`
    }else{
        document.getElementById('lista').innerHTML=buscador.info();
    }
})





btnEliminar.addEventListener("click",()=>{
    let codigo = parseInt(document.getElementById("busqueda").value);
    inventario.eliminar(codigo);
    document.getElementById("lista").innerHTML = ("Eliminado el producto cuyo codigo fue: " + codigo + "<br>")
})
btnInverso.addEventListener("click",()=>{
    let listadoInv = "";
    listadoInv = inventario.listarInverso()
    if(listadoInv === ""){
        return lista.innerHTML = "No hay registros";
    }
    lista.innerHTML = inventario.listarInverso();
})