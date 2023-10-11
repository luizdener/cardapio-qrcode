import {FiHelpCircle, FiInstagram, FiCheckCircle} from 'react-icons/fi'
import {TiTicket} from 'react-icons/ti'
import { MdOutlineTableBar } from 'react-icons/md'
import { FaPepperHot } from 'react-icons/fa'
 
import { useState } from 'react'

// importação do css
import '../styles/home.scss'

// Importação de components
import OrderType from '../components/order-type-container/OrderType'
import List from '../components/list-items/List'

// importação de variaveis
import {orderTypes} from '../variables/OrderTypes'
import Context from '../variables/Context'

function Home() {

    const [typeItems, setTypeItems] = useState()

  return (
    <Context.Provider value={[typeItems, setTypeItems]}>
    <div className='home'>
        <header>
            <a href="/">
                <h1>Pimenta Restaurante</h1>
            </a>
            <h3> <MdOutlineTableBar/> Mesa</h3>
        </header>

        <div className="orders">
            <div className="popular-requests">

            </div>

            <div className="order-types">
                {orderTypes.map((orderType) => <OrderType typeName={orderType.typeName} urlImage={orderType.urlImage} key={orderType.id}/>)}
            </div>

            {typeItems != '' ? <List/> : <></>}
        </div>

        <footer>
            <a href="#">
                <p><FiHelpCircle/> <span>Ajuda</span></p>
            </a>
            <a href="#">
                <p><FiInstagram/> <span>Siga-nos</span></p>
            </a>
            <a href="/cart">
                <div className="logo"><FaPepperHot/></div>
                <p>PEDIR</p>
            </a>
            <a href="#">
                <p><TiTicket/> <span>Cashback</span></p>
            </a>
            <a href="#">
                <p><FiCheckCircle/> <span>Conta</span></p>
            </a>
        </footer>
    </div>
    </Context.Provider>
  )
}

export default Home