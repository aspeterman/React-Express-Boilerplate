import Card from '@material-ui/core/Card'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import React, { useEffect, useState } from 'react'
import { listProducts } from './api-product'
import ProductList from './ProductList'

const useStyles = makeStyles(theme => ({
  card: {
    margin: 'auto',
    paddingTop: 0,
    paddingBottom: theme.spacing(3)
  },
  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
    color: theme.palette.openTitle,
    fontSize: '1em'
  },
  media: {
    minHeight: 330
  }
}))
export default function Shop() {
  const classes = useStyles()
  const [products, setProducts] = useState([])

  useEffect(() => {
    listProducts().then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        setProducts(data)
      }
    })

  }, [])

  const addPost = (product) => {
    const updatedProducts = [...products]
    updatedProducts.unshift(product)
    setProducts(updatedProducts)
  }


  return (
    <Card className={classes.card}>
      <Typography type="title" className={classes.title}>
        Shop Our Collection
        </Typography>

      <ProductList products={products} />
    </Card>
  )
}

