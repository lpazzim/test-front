import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import * as palette from './../../styles/variables'
import ItemList from './../../components/ItemList/ItemList'
import Services from './../../services/productsServices'
import SummaryCart from '../../components/SummaryCart/SummaryCart'
import BButton from '../../components/Button/Button'

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 18px 12px;
  box-shadow: 1px 1px 5px 0px rgba(0, 0, 29, 0.22);
  flex-direction: column;
  background-color: ${palette.BACKGROUND_CONTAINERS};
`

const TitleCart = styled.h1`
  margin-left: 12px;
  font-size: ${palette.FONTSIZE_2};
  font-family: ${palette.FONT_FAMILY};
  font-weight: bold;
  color: #999;
`
export default function Cart(props) {
  const [products, setProduct] = useState(null)
  let history = useHistory()

  function searchProducts() {
    Services.getProducts()
      .then((res) => {
        setProduct(res.items)
      })
      .catch((error) => {
        return error
      })
  }

  useEffect(() => {
    searchProducts()
  }, [])

  function toPayment() {
    history.push('/payment')
  }

  return (
    <>
      <TitleCart> PRODUTOS </TitleCart>
      <Container>
        {products && products.map((e) => <ItemList key={e.product.sku} item={e.product} />)}
      </Container>
      <SummaryCart />
      <BButton onClick={() => toPayment()}> {'SEGUIR PARA O PAGAMENTO'} </BButton>
    </>
  )
}
