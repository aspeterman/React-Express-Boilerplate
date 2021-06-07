import Card from '@material-ui/core/Card'
import Divider from '@material-ui/core/Divider'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import React, { useEffect, useState } from 'react'
import auth from '../auth/auth-helper'
import ProductList from '../product/ProductList'
import { read } from './api-user'

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
export default function Cart({ match }) {
    const classes = useStyles()
    const [products, setProducts] = useState([])
    const [values, setValues] = useState({
        user: { cart: [] },
        redirectToSignin: false,
        cart: false
    })
    const jwt = auth.isAuthenticated()

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal

        read({
            userId: match.params.userId
        }, { t: jwt.token }, signal).then((data) => {
            if (data && data.error) {
                setValues({ ...values, redirectToSignin: true })
            } else {
                let cart = checkProduct(data)
                setValues({ ...values, user: data, cart: cart })
            }
        })
        return function cleanup() {
            abortController.abort()
        }

    }, [match.params.userId])

    const checkProduct = (user) => {
        const match = user.cart.some((product) => {
            return product._id == jwt.user._id
        })
        return match
    }
    return (
        <Card className={classes.card}>
            <Typography type="title" className={classes.title}>
                Your Shopping Cart
        </Typography>
            <Divider />
            <ProductList products={values.user.cart} />
        </Card>
    )
}

