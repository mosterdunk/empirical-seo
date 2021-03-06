import React from 'react'
import Router from 'next/router'
import { connect } from 'react-redux'
import { Button, Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { removeUser } from '../../reducers/userSlice'
import { setPageControl } from '../../reducers/flagsSlice'

import { Toolbar } from '@material-ui/core'
import Link from '../../src/Link'


const useStyles = makeStyles({
  navButton: {
    marginRight: 15,
  },
  toolbar: {
  //  border: 'dash',
  backgroundColor: 'orange',
  }
})

const Footer = props => {
  const classes = useStyles()

  const { isUser } = props.user

  const fbSignOut = () => {
    props.removeUser()
    props.setPageControl(0)
    Router.push('/create')
  }

  return (
    <>
      <Divider />
      <Toolbar className={classes.toolbar}>
        <Link href='/help' className={classes.navButton}>
          help
        </Link>
        <Link href='/about' className={classes.navButton}>
          about
        </Link>
        <Link href='privacy' className={classes.navButton}>
          privacy
        </Link>
        {
          isUser ?
            <Button onClick={fbSignOut}>
              Logout
            </Button> :
              null
        }
      </Toolbar>
    </>
  )
}

const mapState = state => ({
  user: state.user
})

const mapDispatch = { removeUser, setPageControl }
export default connect(mapState, mapDispatch)(Footer)