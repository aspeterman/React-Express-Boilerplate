import { Avatar, Menu, MenuItem } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { ShoppingBasket } from '@material-ui/icons'
import HomeIcon from '@material-ui/icons/Home'
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state'
import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import useIsSsr from '../utils/useIsSsr'
import auth from './../auth/auth-helper'

const isActive = (history, path) => {
    if (history.location.pathname == path)
        return { color: '#bef67a' }
    else
        return { color: '#ffffff' }
}


const MenuBar = withRouter(({ history }, props) => {
    const isSsr = useIsSsr()

    const screenWidth = isSsr ? null : window.innerWidth;
    return (
        screenWidth &&
        <>
            <AppBar position="static">
                <div id='back-to-top-anchor'>
                    <Toolbar>
                        <Typography variant="h6" color="inherit">
                            Ecommerce Boilerplate
      </Typography>
                        <div>
                            <Link to="/">
                                <IconButton aria-label="Home" style={isActive(history, "/")}>
                                    <HomeIcon />
                                </IconButton>
                            </Link>
                        </div>
                        <div style={{ 'position': 'absolute', 'right': '10px' }}>
                            <div style={{ 'float': 'right' }}>
                                {
                                    !auth.isAuthenticated() && (<>
                                        <Link to="/signup">
                                            <Button style={isActive(history, "/signup")}>Sign up
            </Button>
                                        </Link>
                                        <Link to="/signin">
                                            <Button style={isActive(history, "/signin")}>Sign In
            </Button>
                                        </Link>
                                    </>)
                                }
                            </div>
                            <div >
                                {
                                    auth.isAuthenticated() && (<>
                                        <Link to={`/cart/${auth.isAuthenticated().user._id}`}>
                                            <IconButton>
                                                <ShoppingBasket color='secondary' />
                                            </IconButton>
                                        </Link>
                                        <PopupState variant="popover" popupId="demo-popup-menu">
                                            {(popupState) => (
                                                <>
                                                    <Button

                                                        {...bindTrigger(popupState)}>
                                                        <Avatar src={'../images/profile-pic.png'} />
                                                    </Button>
                                                    <Menu
                                                        getContentAnchorEl={null}
                                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                                                        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                                                        {...bindMenu(popupState)}>
                                                        <MenuItem onClick={popupState.close}>
                                                            <Button>
                                                                <Link to={"/user/" + auth.isAuthenticated().user._id}>
                                                                    My Profile
                              </Link>
                                                            </Button>
                                                        </MenuItem>
                                                        <MenuItem onClick={popupState.close}>
                                                            <Button color="inherit" onClick={() => {
                                                                auth.clearJWT(() => history.push('/'))
                                                            }}>Sign out</Button>
                                                        </MenuItem>
                                                    </Menu>
                                                </>
                                            )}
                                        </PopupState>



                                    </>)
                                }
                            </div>
                        </div>
                    </Toolbar>
                </div>
            </AppBar>
        </>
    )
})

export default MenuBar
