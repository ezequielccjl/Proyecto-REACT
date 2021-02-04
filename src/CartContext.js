import React, {createContext, useEffect, useState} from 'react'

export const CartContext = React.createContext();

export const Context = ({children}) => {

    const [listaCarrito, setCarrito] = useState([])

    const [cantCarrito, setCantidad] = useState(0)


    const calcularCantidad = () =>{
        let cantidadFinal = 0
        listaCarrito.forEach(prod => {
            cantidadFinal= cantidadFinal + prod.cantidad
        });
        return cantidadFinal
    }

    useEffect(()=>{
        setCantidad(calcularCantidad)
    }, [listaCarrito])
    
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
            listaCarrito.forEach(i => {
                if (i.id == id) {
                    i.cantidad=i.cantidad+cantidad
                }
            });
        }
    }

    return(
        <CartContext.Provider value={{listaCarrito, agregarProd, cantCarrito}}>
            {children}
        </CartContext.Provider>
    )

}