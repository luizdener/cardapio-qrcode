import './list.scss'

import { AiOutlineCloseCircle } from 'react-icons/ai'

import { useEffect, useState } from 'react'
import { useContext } from 'react'

import Item from '../item-order/Item'

import { itens } from '../../variables/Itens'
import Context from '../../variables/Context'

const List = () => {

  const [items, setItems] = useState([])
  const [typeItems, setTypeItems] = useContext(Context)
  const [cartData, setCartData] = useState([])
  const list = document.querySelector('.list-items')
  
  useEffect(() => {
    if(list != null){
      switch(typeItems){
        case 'batatas':
          setItems(itens.batatas)
          break
        case 'tábuas':
          setItems(itens.tábuas)
          break
        case 'hamburgueres':
          setItems(itens.hamburgueres)
          break
        case 'drinks':
          setItems(itens.drinks)
          break
        case 'bebidas':
          setItems(itens.bebidas)
          break
        case 'sucos':
          setItems(itens.sucos)
          break
        case 'sobremesas':
          setItems(itens.sobremesas)
          break
      }
    }
  })

  useEffect(() => {
    fetch('http://localhost:5000/carts/1', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      }
    })
    .then((resp) => resp.json())
    .then((data) => {
      setCartData(data)
    })
    .catch((err)=> console.log(err))
  }, [])

  const  addToCart = (item, price, quantity) => {
    // Verifica se item já está no carrinho para atualizar apenas a quantidade
    cartData.items.forEach((e) => {
      let index = cartData.items.findIndex(i => i===e)
      if(e.item == item){
        cartData.items[index].quantity += quantity
        cartData.totalCost += price * quantity
        
        fetch('http://localhost:5000/carts/1', {
          method: 'PATCH',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(cartData)
        })
        .then((resp) => resp.json())
        .then((data => {
          setCartData(data)
        }))
        .catch((err) => console.log(err))

        window.alert(`Adicionado ${quantity} ${item} ao carrinho`)
      }
    })

    // Adiciona item ao carrinho caso ainda não esteja
    if(cartData.items.findIndex(e => e.item === item) == -1) {
      cartData.items.push({item, quantity})
      cartData.totalCost += (price * quantity)

      fetch('http://localhost:5000/carts/1', {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(cartData)
      })
      .then((resp) => resp.json())
      .then((data) => data)
      .catch((err) => console.log(err))

      window.alert(`${item} foi adicionado ao carrinho`)
      }
    }

  function closeItems(){
    document.querySelector('.list-items').style = 'display: none'
    setItems([])
  }

  return (
    <div className='list-items'>
      <AiOutlineCloseCircle onClick={closeItems}/>
      <div className="container">
        {items.map((item) => <Item 
        key={item.id} 
        onClick={addToCart}
        itemName={item.name} 
        srcImage={item.img} 
        description={item.description}
        price={item.price}
        /> 
        )}
      </div>
    </div>
  )
}

export default List