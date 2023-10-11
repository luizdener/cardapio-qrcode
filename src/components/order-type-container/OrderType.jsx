import './ordertype.scss'

import Context from '../../variables/Context'
import { useContext } from 'react'


function OrderType({typeName, urlImage}) {
  const [typeItems, setTypeItems] = useContext(Context)

  function showItemList(typeName) {
    document.querySelector('.list-items').style = 'display: flex'

    setTypeItems(`${typeName}`)
  }

  return (
    <div  className="order-type-container" style={{backgroundImage: `url(${urlImage})`}} onClick={() => showItemList(typeName.toLowerCase())}>{typeName}</div>
  )
}

export default OrderType