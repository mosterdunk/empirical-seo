import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import Link from '../../src/Link'

import {setPageControl} from '../../reducers/flagsSlice'

const useStyles = makeStyles(theme => ({
  navButton: {
    marginLeft: theme.spacing(1),
  //  border: 'dashed',
    borderColor: 'blue',
  },
  navBar: {
   // padding: theme.spacing(1),
   // backgroundColor: 'white',
  //  border: 'dashed',
   // borderColor: 'green',
  },
  email: {

  },
}))

const NavBar = props => {
  console.log(props.user)
  const { userEmail, isUser } = props.user
  const classes = useStyles()

  const LoginUi = () => {
    if (isUser) {
      return (
        <>
            <Link href='/profile' color='textPrimary' className={classes.navButton}>
              <Typography variant='body1'>
                {userEmail}
              </Typography>
            </Link>
        </>
      )
    } else {
      return (
        <>
            <Link href='/profile' color='textPrimary' className={classes.navButton}>
              <Typography variant='body1'>
                login
              </Typography>
            </Link>
        </>
      )
    }
  }
  return (

    <AppBar position='static'>
      <Toolbar className={classes.navBar} disableGutters >
      <Link 
        href='/create' 
        color='textPrimary' 
        className={classes.navButton}
        onClick={() => props.setPageControl(0)}
      >
        <Typography variant='body1'>
          create
        </Typography>
      </Link>
        <LoginUi />
      </Toolbar>
    </AppBar>

  )
}

const mapState = state => ({
  user: state.user
})

const mapDispatch = {setPageControl}

export default connect(mapState, mapDispatch)(NavBar)