import '../styles/cart.scss'

import {useState, useEffect} from 'react'
import {BiCartAdd, BiTrash} from 'react-icons/bi'

import Item from '../components/item-order/Item'

import { itens } from '../variables/Itens'

const Cart = () => {

  const [cartData, setCartData] = useState([])
  const [cart, setCart] = useState([])
  const [cost, setCost] = useState()
  const items = []

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

  for(var i = 0; i <= cart.length -1; i++){
    items.push(cart[i].item)
  }

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
        {items.map((iten) => <Item itemName={iten}
        srcImage={getImage(iten)}
        description={getDescription(iten)}
        price={getPrice(iten)}
        deleteAction={<BiTrash/>}
        />)}
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