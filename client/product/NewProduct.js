import { Button, Card, CardActions, CardContent, Dialog, DialogContent, DialogTitle, IconButton, makeStyles, MenuItem, Select, TextField } from '@material-ui/core'
import { PhotoCamera } from '@material-ui/icons'
import React, { useState } from 'react'
import auth from '../auth/auth-helper'
import { create } from './api-product'
import categories from './categories'

const useStyles = makeStyles(theme => ({
    root: {
        // backgroundColor: '#efefef',
        // padding: `${theme.spacing(3)}px 0px 1px`
    },
    card: {
        maxWidth: 1000,
        margin: 'auto',
        marginBottom: theme.spacing(3),
        backgroundColor: 'rgba(65, 150, 136, 0.09)',
        boxShadow: 'none'
    },
    cardContent: {
        backgroundColor: 'white',
        paddingTop: 0,
        paddingBottom: 0
    },
    cardHeader: {
        paddingTop: 8,
        paddingBottom: 8
    },
    photoButton: {
        height: 30,
        marginBottom: 5
    },
    input: {
        display: 'none',
    },
    textField: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        width: '90%'
    },
    submit: {
        margin: theme.spacing(2)
    },
    filename: {
        verticalAlign: 'super'
    }
}))

export default function NewProduct(props) {
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const [values, setValues] = useState({
        name: '',
        description: '',
        category: 'General',
        stock: 1,
        photo: '',
    })
    const jwt = auth.isAuthenticated()


    const handleChange = name => event => {
        const value = name === 'photo'
            ? event.target.files[0]
            : event.target.value
        setValues({ ...values, [name]: value })
    }

    const clickPost = () => {
        let productData = new FormData()
        values.name && productData.append('name', values.name)
        values.stock && productData.append('stock', values.stock)
        values.description && productData.append('description', values.description)
        values.category && productData.append('category', values.category)
        values.photo && productData.append('photo', values.photo)

        create({
            userId: jwt.user._id
        }, {
            t: jwt.token
        }, productData).then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            } else {
                props.addUpdate(data)
                handleClose()
            }
        })
    }

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };


    return (
        <div className={classes.root}>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Sell Something
      </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">New Product</DialogTitle>
                <DialogContent>
                    <Card className={classes.card}>

                        <CardContent className={classes.cardContent}>
                            <TextField
                                label="Product Name"
                                value={values.name}
                                onChange={handleChange('name')}
                                className={classes.textField}
                                margin="normal"
                            />
                            <TextField
                                label="Product Description"
                                value={values.description}
                                onChange={handleChange('description')}
                                className={classes.textField}
                                margin="normal"
                            />
                            <TextField
                                label='Stock'
                                type='number'
                                value={values.stock}
                                onChange={handleChange('stock')}
                                className={classes.textField}
                                margin="normal"
                            />
                            <Select
                                value={values.category}
                                onChange={handleChange('category')}
                            >
                                {categories.map(option => (
                                    <MenuItem key={option.name} value={option.name}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </Select>
                            <input accept="image/*" onChange={handleChange('photo')} className={classes.input} id="icon-button-file" type="file" />
                            <label htmlFor="icon-button-file">
                                <IconButton color="secondary" className={classes.photoButton} component="span">
                                    <PhotoCamera />
                                </IconButton>
                            </label> <span className={classes.filename}>{values.photo ? values.photo.name : ''}</span>
                            {values.error && (<Typography component="p" color="error">
                                <Icon color="error" className={classes.error}>error</Icon>
                                {values.error}
                            </Typography>)
                            }
                        </CardContent>
                        <CardActions>
                            <Button color="primary" variant="contained" disabled={values.text === ''} onClick={clickPost} className={classes.submit}>POST</Button>
                        </CardActions>
                    </Card>
                </DialogContent>
            </Dialog>
        </div>
    )
}