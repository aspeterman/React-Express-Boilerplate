import { GridList, makeStyles } from '@material-ui/core';
import React from 'react';
import Product from './Product';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        transform: 'translateZ(0)',
    },
}));

export default function ProductList(props) {
    const classes = useStyles()
    return (
        <div style={{ marginTop: '24px' }}>
            {props.products && props.products.map((item, i) => {
                return (
                    <div className={classes.root}>
                        <GridList cellHeight={'auto'} className={classes.gridList} key={i} cols={4}>
                            <Product product={item} key={item._id} />
                        </GridList>
                    </div>
                )
            })
            }
        </div>
    )
}
