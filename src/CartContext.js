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
                }
            });
        }
    }

//---------------------------------------------- ELIMINAR PRODUCTO (No funcional) -----------------------------------------------------

    //Esta función esta asignada a un onClick en un botón dentro de Cart.js (Linea:30)
    //Cuando se llama a la función se elimina el producto pero el problema es que cuando paso del ItemDetail al Cart se invoca por si misma

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