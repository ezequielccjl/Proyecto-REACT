import React, { useEffect, useState} from 'react'
import {getFirestore} from './firebase'
import $ from 'jquery'

export const CartContext = React.createContext();

export const Context = ({children}) => {

    const [listaCarrito, setCarrito] = useState([])

    const [listaCompras, setCompras] = useState([])

    const [cantCarrito, setCantidad] = useState(0)

    const [total, setTotal] = useState(0)

    const [listaCatalogo, setCatalogo] = useState([])

    const [estado, setEstado] = useState('En proceso')

    
    //Obtener carrito de Firestore
    useEffect(()=>{

    let db = getFirestore();
    let itemsDb = db.collection("catalogo")
    itemsDb.get()
      .then((querySnapshot) =>{
        if(querySnapshot.size > 0){
            
            setEstado('Exitoso')
            //document.querySelector(".item-list-container").classList.remove("estado-cargando")
            
        }
        let arrayAMostrar = querySnapshot.docs.map((doc)=> doc.data()) 
        
        setCatalogo(arrayAMostrar)
            
    })

    // Obtiene localStorage
    localStorage.carrito ? setCarrito(JSON.parse(localStorage.carrito)) : localStorage.setItem('carrito', [])
    localStorage.compras ? setCompras(JSON.parse(localStorage.compras)) : localStorage.setItem('compras', [])
    
    }, [])


    //Agregar producto al carrito
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
    
    //Eliminar producto de carrito
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

        localStorage.setItem('carrito', JSON.stringify(listaCarrito));
        
    }


    //Calcular total de UN item
    const calcularTotalItem = (id) => {
        let total = 0;
        listaCarrito.forEach(elem => {
            if (elem.id === id) {
                total = elem.item.price*elem.cantidad
                
            }
        });
        return total;
    }

    
    //Calcular total a pagar en carrito
    const calcularTotalCarrito = () => {
        let total = 0;
        listaCarrito.forEach(elem => {
            
            total = total + elem.item.price*elem.cantidad
            
        });
        setTotal(total)
    }

    
    //Calcular cantidad de items en carrito
    const calcularCantidad = () =>{
        let cantidadFinal = 0
        listaCarrito.forEach(prod => { 
            cantidadFinal= cantidadFinal + prod.cantidad
        });
        
        //Manejo de clases para responsive
        if ($( window ).width() > 575){
            listaCarrito.length >= 2 ? $(".section-cart").addClass("height_auto") : $(".section-cart").removeClass("height_auto")
        }else{
            listaCarrito.length > 0 ? $(".section-cart").addClass("height_auto") : $(".section-cart").removeClass("height_auto")
        }
        //console.log(cantidadFinal)
        return cantidadFinal
    }

    useEffect(()=>{
        setCantidad(calcularCantidad)
    },[cantCarrito])

    // Actualiza localStorage
    useEffect(() => {
        localStorage.setItem('carrito', JSON.stringify(listaCarrito));
        //console.log(listaCarrito)
        setCantidad(calcularCantidad)
    }, [listaCarrito]);

//---------------------------------------------------------------------------------------------------

    return(
        <CartContext.Provider 
        value = {{
            listaCarrito,
            listaCompras,
            listaCatalogo, 
            setCantidad,
            setCompras,
            calcularTotalItem, 
            calcularTotalCarrito, 
            calcularCantidad,
            agregarProd, 
            eliminarProd, 
            cantCarrito, 
            estado, 
            total
        }}>

            {children}
        
        </CartContext.Provider>
    )

}