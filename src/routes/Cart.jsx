import '../styles/cart.scss'

import {useState, useEffect} from 'react'
import {BiCartAdd, BiTrash} from 'react-icons/bi'

import Item from '../components/item-order/Item'

import { itens } from '../variables/Itens'

const Cart = () => {

  const [cartData, setCartData] = useState([])
  const [cart, setCart] = useState([])
  const [cost, setCost] = useState()

  useEffect(() => {
    fetch('http://localhost:5000/carts/1', {
      method: "GET",
      headers: {
        'Content-type': 'application/json'
      },
    })
    .then((resp) => resp.json())
    .then((data) => {
      setCartData(data)
      setCart(data.items)
      setCost(data.totalCost)

    })
    .catch((err) => console.log(err))
  },[])

  function getImage(itemName) {

    var imgSrc = ''

    itens.batatas.forEach((el, i) => {
      if(el.name === itemName ){
        imgSrc = el.img
      }
    })

    itens.tábuas.forEach((el) => {
      if(el.name === itemName){
        imgSrc = el.img
      }
    })

    itens.hamburgueres.forEach((el, i) => {
      if(el.name === itemName ){
        imgSrc = el.img
      }
    })

    itens.drinks.forEach((el, i) => {
      if(el.name === itemName ){
        imgSrc = el.img
      }
    })

    itens.bebidas.forEach((el, i) => {
      if(el.name === itemName ){
        imgSrc = el.img
      }
    })

    itens.sucos.forEach((el, i) => {
      if(el.name === itemName ){
        imgSrc = el.img
      }
    })

    itens.sobremesas.forEach((el, i) => {
      if(el.name === itemName ){
        imgSrc = el.img
      }
    })

    return imgSrc
  }

  function getPrice(itemName){
    var price = 0

    itens.batatas.forEach((el) => {
      if(el.name === itemName){
        price = el.price
      }
    })

    itens.tábuas.forEach((el) => {
      if(el.name === itemName){
        price = el.price
      }
    })

    itens.hamburgueres.forEach((el) => {
      if(el.name === itemName){
        price = el.price
      }
    })

    itens.drinks.forEach((el) => {
      if(el.name === itemName){
        price = el.price
      }
    })

    itens.bebidas.forEach((el) => {
      if(el.name === itemName){
        price = el.price
      }
    })

    itens.sucos.forEach((el) => {
      if(el.name === itemName){
        price = el.price
      }
    })

    itens.sobremesas.forEach((el) => {
      if(el.name === itemName){
        price = el.price
      }
    })

    return price
  }

  function getDescription(itemName){
    var descripition = ''

    itens.batatas.forEach((el) => {
      if(el.name === itemName){
        descripition = el.descripition
      }
    })

    itens.tábuas.forEach((el) => {
      if(el.name === itemName){
        descripition = el.descripition
      }
    })
    
    itens.hamburgueres.forEach((el) => {
      if(el.name === itemName){
        descripition = el.description
      }
    })

    itens.drinks.forEach((el) => {
      if(el.name === itemName){
        descripition = el.descripition
      }
    })

    itens.bebidas.forEach((el) => {
      if(el.name === itemName){
        descripition = el.descripition
      }
    })

    itens.sucos.forEach((el) => {
      if(el.name === itemName){
        descripition = el.descripition
      }
    })

    itens.sobremesas.forEach((el) => {
      if(el.name === itemName){
        descripition = el.descripition
      }
    })

    return descripition
  }

  function deleteItem(item, price){

    cartData.items.splice(cartData.items.indexOf(item), 1)
    cartData.totalCost -= price
    
    fetch('http://localhost:5000/carts/1', {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(cartData)
    })
    .then((resp) => resp.json())
    .then((data) => {
      setCartData(data)
      setCart(data.items)
      setCost(data.totalCost)
    })
    .catch((err) => console.log(err))
  }

  return (
    <div className='cart'>
      <section className="items-container">
        {cart.length > 0 ?
          cart.map((item) => <Item 
            itemName={item} 
            price={getPrice(item)} 
            srcImage={getImage(item)} 
            description={getDescription(item)}
            deleteAction={<BiTrash onClick={() => deleteItem(item, getPrice(item))}/>}
          />)
          :
          <h1>Carrinho vazio</h1>
        }
        </section>

        <section className='actions'>
        <a href="/">
          <BiCartAdd className='add'/>
        </a>
        </section>

      <section className='cart-footer'>
        <h3>Total do pedido: R$ {cost}</h3>
        <button>Realizar Pedido</button>
      </section>
    </div>
  )
}

export default Cart