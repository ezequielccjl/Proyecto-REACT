import React, { useEffect, useState} from 'react'

export const CartContext = React.createContext();

export const Context = ({children}) => {

    const [listaCarrito, setCarrito] = useState([])

    const [cantCarrito, setCantidad] = useState(0)

//---------------------------------------------------------------------------------------------------

    const calcularCantidad = () =>{
        let cantidadFinal = 0
        listaCarrito.forEach(prod => { 
            cantidadFinal= cantidadFinal + prod.cantidad
        });
        
        return cantidadFinal
    }

    useEffect(()=>{
        setCantidad(calcularCantidad)
    },[cantCarrito])

//--------------------------------------------- AGREGAR PRODUCTO ------------------------------------------------------
    
    const agregarProd = (id, item, cantidad) =>{
        let listaFiltrada = listaCarrito.filter((itemSelec) => itemSelec.id===id)
        
        if(listaFiltrada.length === 0){
            setCarrito([
                ...listaCarrito,
                {
                    id: id,
                    item: item,
                    cantidad: cantidad
                },
            ])
        }else if(listaFiltrada.length === 1){
            //Si bien este ELSE-IF no realiza ninguna función en particular, sin él, el CartWidget no se acumula
            //Creo que sirve como una especie de trigger en los effects

            listaCarrito.forEach(i => {
                if (i.id === id) {
                    i.cantidad=i.cantidad
                    console.log( i.cantidad=i.cantidad+cantidad )
                }
            });
        }
    }

//---------------------------------------------- ELIMINAR PRODUCTO (No funcional) -----------------------------------------------------

    //Esta función está asignada a un onClick dentro de Cart.js (Linea:30)
    //El problema con este método es que cuando se renderiza el componente, se ejecuta el onClick
    //Para probar se puede descomentar el alert en la Linea:61
    //Esto quiere decir que si quiero eliminar un producto del carrito, al querer renderizar el Cart.js ya se va a lanzar
    //esta funcion y nada se va a agregar a la lista

    const eliminarProd = (i) => {
        let indice = listaCarrito.indexOf(i);
        //context.listaCarrito.splice(indice,1)
        //alert("Se activa botón EliminarProd")
    }

//--------------------------------------------- CALCULAR TOTAL ------------------------------------------------------

    const calcularTotalItem = (id) => {
        let total = 0;
        listaCarrito.forEach(elem => {
            if (elem.id === id) {
                total = elem.item.price*elem.cantidad
                
            }
        });
        return total;
    }

//---------------------------------------------------------------------------------------------------

    const calcularTotalCarrito = () => {
        let total = 0;
        listaCarrito.forEach(elem => {
            
            total = total + elem.item.price*elem.cantidad
            
        });
        return total;
    }

//---------------------------------------------------------------------------------------------------

    return(
        <CartContext.Provider value={{listaCarrito, agregarProd, cantCarrito, setCantidad, calcularTotalItem, calcularTotalCarrito, eliminarProd}}>
            {children}
        </CartContext.Provider>
    )

}