import { CircularProgress, Grid, makeStyles } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import auth from '../auth/auth-helper'
import Shop from '../product/Shop'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        margin: 40,
    },
}))

export default function Home({ history }) {
    const classes = useStyles()
    const [defaultPage, setDefaultPage] = useState(false)
    useEffect(() => {
        setDefaultPage(auth.isAuthenticated())
        const unlisten = history.listen(() => {
            setDefaultPage(auth.isAuthenticated())
            // setDefaultPage(true)
        })
        return () => {
            unlisten()
        }
    }, [])

    return (
        <div className={classes.root}>
            {!defaultPage &&
                <CircularProgress />
            }
            {defaultPage &&
                <Grid>
                    <Shop />
                </Grid>
            }
        </div>
    )
}