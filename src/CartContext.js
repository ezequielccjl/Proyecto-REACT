import React, { useEffect, useState} from 'react'
import {getFirestore} from './firebase'
import $ from 'jquery'

export const CartContext = React.createContext();

export const Context = ({children}) => {

    const [listaCarrito, setCarrito] = useState([])

    const [cantCarrito, setCantidad] = useState(0)

    const [total, setTotal] = useState(0)

    const [listaCatalogo, setCatalogo] = useState([])
    //Defino estados seteables para confirmación del "Fetch"
    const [estado, setEstado] = useState('En proceso')

//----------------------------------- OBTENIENDO CATALOGO --------------------------------------------

    useEffect(()=>{

    let db = getFirestore();
    let itemsDb = db.collection("catalogo")
    itemsDb.get()
      .then((querySnapshot) =>{
        if(querySnapshot.size > 0){
            
            setEstado('Exitoso')
            document.querySelector(".item-list-container").classList.remove("estado-cargando")
            
        }
        let arrayAMostrar = querySnapshot.docs.map((doc)=> doc.data()) 
        
        setCatalogo(arrayAMostrar)
            
      })

    }, [])

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

    function eliminarProd(item){

        let cantVolverStock = item.cantidad;
        let indice = listaCarrito.indexOf(item);
        
        listaCarrito.splice(indice,1)
        
        
        listaCatalogo.forEach(elem => {
            if (elem.id===item.id) {
                elem.stock = elem.stock+cantVolverStock
            }
        });

        setCarrito(listaCarrito)
        setCatalogo(listaCatalogo)
        setCantidad(calcularCantidad())
        calcularTotalCarrito()
        
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
        setTotal(total)
    }

//---------------------------------------------------------------------------------------------------

    return(
        <CartContext.Provider value={{listaCarrito, agregarProd, cantCarrito, setCantidad, calcularTotalItem, calcularTotalCarrito, eliminarProd, estado, listaCatalogo, total}}>
            {children}
        </CartContext.Provider>
    )

}