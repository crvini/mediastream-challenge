import './assets/styles.css'
import React, { useState, useEffect } from 'react'
import { countDuplicatesItemArray, removeArrayDuplicates, removeItemArray } from '../../../utils/arrays'
import { STORAGE_PRODUCTS_CART } from './utils/consts'

export default function Exercise01 () {
  const [singelProductsCart, setSingelProductsCart] = useState([])
  const [cartTotalPrice, setCartTotalPrice] = useState(0)
  const products  = [
    {
      id: 1,
      name: 'Star Wars',
      price: 20
    },
    {
      id: 2,
      name: 'Minions',
      price: 25
    },
    {
      id: 3,
      name: 'Fast and Furious',
      price: 10
    },
    {
      id: 4,
      name: 'The Lord of the Rings',
      price: 5
    }
  ]
  const [productsCart, setProductsCart] = useState([])
  const getProductsCart = () => {
    const idsProducts = localStorage.getItem(STORAGE_PRODUCTS_CART)

    if (idsProducts) {
      const idsProductsSplit = idsProducts.split(',')
      setProductsCart(idsProductsSplit)
    } else {
      setProductsCart([])
    }
  }

  const addProductCart = (id) => {
    const idsProducts = productsCart
    idsProducts.push(id)
    setProductsCart(idsProducts)
    localStorage.setItem(STORAGE_PRODUCTS_CART, idsProducts)
    getProductsCart()
  }

  const increaseQuantity = id => {
    const arrayItemsCart = productsCart
    arrayItemsCart.push(id)
    localStorage.setItem(STORAGE_PRODUCTS_CART, arrayItemsCart)
    getProductsCart()
  }
  const decreaseQuantity = id => {
    const arrayItemsCart = productsCart
    const result = removeItemArray(arrayItemsCart, id.toString())
    localStorage.setItem(STORAGE_PRODUCTS_CART, result)
    getProductsCart()
  }
  useEffect(() => {
    const allProductsId = removeArrayDuplicates(productsCart)
    setSingelProductsCart(allProductsId)
  }, [productsCart])

  useEffect(() => {
    const productData = []
    let totalPrice = 0

    const allProductsId = removeArrayDuplicates(productsCart)
    allProductsId.forEach(productId => {
      const quantity = countDuplicatesItemArray(productId, productsCart)
      const productValue = {
        id: productId,
        quantity: quantity
      }
      productData.push(productValue)
    })
    products.forEach(product => {
      productData.forEach(item => {
        if (product.id == item.id) {
          const totalValue = product.price * item.quantity
          totalPrice = totalPrice + totalValue
        }
      })
    })
    setCartTotalPrice(totalPrice)
  }, [productsCart, products])

  return (
    <section className="exercise01">
      <div className="movies__list">
        <ul>
          {products.map((o) => (
            <li key={o.id} className="movies__list-card">
              <ul>
                <li>
                  ID: {o.id}
                </li>
                <li>
                  Name: {o.name}
                </li>
                <li>
                  Price: ${o.price}
                </li>
              </ul>
              <button onClick={() => addProductCart(o.id)}>
                Add to cart
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="movies__cart">
        <ul>
          {!singelProductsCart ? (<h1>cargando</h1>) : ( (singelProductsCart.map((idProductCart) => (

            products.map((o)=>(
    
              (o.id == idProductCart) ? ( (
        
                <li key={o.id} className="movies__list-card">
                  <ul>
                    <li>
                     ID: {idProductCart}
                    </li>
                    <li>
                Name: {o.name}
                    </li>
                    <li>
                Price: ${o.price}
                    </li>
                  </ul>
                  <span>
                    {countDuplicatesItemArray(o.id, productsCart)}
                  </span>
                  <div className="movies__cart-card-quantity">
                    <button onClick={() => decreaseQuantity(o.id)}>
                  -
                    </button>
            
                    <button onClick={() => increaseQuantity(o.id)}>
                  +
                    </button>
                  </div>
                </li>
              )) : (<></>)
            )   ))) ))}
        </ul>
        <div className="movies__cart-total">
          <p>Total: ${cartTotalPrice.toFixed(2)}</p>
        </div>
      </div>
    </section>
  )
}
