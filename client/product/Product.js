import { Button, Card, CardActions, CardContent, CardMedia, Divider, GridListTile, IconButton, makeStyles, Tooltip, Typography } from '@material-ui/core'
import { Info } from '@material-ui/icons'
import React from 'react'
import { Link } from 'react-router-dom'
import auth from '../auth/auth-helper'
import { addToCart } from './api-product'

const useStyles = makeStyles(theme => ({
    card: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(3),
        backgroundColor: 'rgba(0, 0, 0, 0.06)',
        width: 400,
        overflow: 'hidden',
    },
    cardContent: {
        backgroundColor: 'white',
        // padding: `${theme.spacing(2)}px 0px`,
        height: 250
    },
    title: {
        fontSize: '3em',
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1)
    },
    text: {
        margin: theme.spacing(2)
    },
    photo: {
        textAlign: 'center',
        backgroundColor: '#f2f5f4',
        padding: theme.spacing(1)
    },
    media: {
        maxHeight: 300,
        '&:hover': {
            cursor: 'pointer'
        },
    },
    button: {
        margin: theme.spacing(1),
    }
}))

export default function Product(props) {
    const classes = useStyles()
    const jwt = auth.isAuthenticated()

    const addItemToCart = () => {
        addToCart({
            userId: jwt.user._id
        }, {
            t: jwt.token
        }, props.product._id).then((data) => {
            if (data.error) {
                console.log(data.error)
            } else {
                console.log(data)
            }
        })
    }
    const imageUrl = props.product._id
        ? `/api/products/image/${props.product._id}?${new Date().getTime()}`
        : '/api/products/defaultphoto'

    return (
        <GridListTile cols={4} >
            <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                    <div className={classes.photo}>
                        <Link to={`/products/${props.product._id}`}>
                            <CardMedia
                                className={classes.media}
                                image={imageUrl}
                                title={props.product.name}
                            />
                        </Link>
                    </div>
                    <Typography gutterBottom variant="h5" component="h2">
                        <Link to={`/products/${props.product._id}`}>{props.product.name}</Link>
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        <span>Product Description: </span>{props.product.description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Tooltip title="Product Information">
                        <IconButton className={classes.button} aria-label="Info" color="primary" >
                            <Info />
                        </IconButton>
                    </Tooltip>
                    <Button onClick={addItemToCart} className={classes.button} color='secondary'>
                        Add To Cart
                    </Button>
                </CardActions>
                <Divider />
            </Card>
        </GridListTile>
    )
}