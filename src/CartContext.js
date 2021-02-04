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
        console.log("CANTIDAD FINAL------------------- "+cantidadFinal)
        return cantidadFinal
    }

    useEffect(()=>{
        setCantidad(calcularCantidad)
        console.log("SE AGREGA ALGO AL CARRITO-------------------")
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
            console.log("LENGTH ES IGUAL A 1 ---------------------------------------------")
            listaCarrito.forEach(i => {
                if (i.id === id) {
                    i.cantidad=i.cantidad+cantidad
                    console.log(i.cantidad=i.cantidad+cantidad)
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