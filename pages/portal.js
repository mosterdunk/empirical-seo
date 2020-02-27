import React, { useEffect, useState } from 'react'
import {
  Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { fbAuth, db, dbArrayUnion} from '../config/firebase'

import PortalCreate from '../components/PortalCreate'
import Layout from '../components/Layout'

const useStyles = makeStyles(theme => ({
  main: {
    backgroundColor: 'red',
  },
}))

const portal = props => {
  const classes = useStyles()

  //url querys
  console.log(props.query)
  const optIn = props.query.optin
  const scenarioId = props.query.scenarioid
  console.log(scenarioId)
  const urlId = props.query.urlid
  console.log(urlId)
  //portal mode for signin flow
  const portalMode = props.query.portal
  let user, uid, userEmail
  const [scenarios, setScenarios] = useState([])
  
  //fb auth
  

  useEffect(() => {
    // update 'users' collection in database, get data for render 
    const dbUpdate = () => {
      let docRef = db.collection('users').doc(uid)
      docRef.get().then(doc => {
        if (doc.exists) {
          console.log('user exists')
          docRef.set({
            optIn: optIn,
            urlIds: dbArrayUnion(urlId)
          }, {merge: true })
        } else {
          console.log('user dont exists')
          docRef.set({
            urlIds: [urlId],
            email: userEmail,
            optIn: optin
          })
        }
        // get urlids for render
        let urlsGet
        db.collection('users').doc(uid).get()
          .then(doc => {
            urlsGet = doc.data().urlIds
            console.log(urlsGet)
            setScenarios(urlsGet)
            console.log(scenarios)
          })
      })
      // add user id to scenario  
      db.collection('scenarios').doc(scenarioId).update({
        "owner": uid,
        "private": true,
      })
        .then(() => {
          console.log('scenario uptdated')
        })
        .catch(error => {
          console.log('error', error)
        }) 
    }
    // firebase authentication
    
    const userProcess = async () => {
      user = await fbAuth.currentUser
      if (user) {
        console.log('hooray', user)
        uid = user.uid
        userEmail = user.email
        console.log(userEmail)
        dbUpdate()
      } else {
        // if no user proceed with email link validation *
        console.log('no user')
        if (fbAuth.isSignInWithEmailLink(window.location.href)) {
          let email = window.localStorage.getItem('emailForSignIn')
          if (!email) {
            email = window.prompt('please provide email for account confirmation')
          }
          fbAuth.signInWithEmailLink(email, window.location.href)
            .then(result => {
              console.log('signed in', result.user)
              uid = result.user.uid
              userEmail = result.user.email
              console.log(uid, userEmail)
              dbUpdate()
            })
            .catch(error => {
              console.log('signin with email error', error)
            })
        }
      }
    }
    userProcess()
  }, [])

  const pageContent = (
    <>
      <div className={classes.main}>
        hi
      </div>
    </>
  )

  return (
    <Layout
      content={pageContent}
      title='sigin portal'
    />
  )
}

export default portal

portal.getInitialProps = ({ query }) => {
  return ({ query })
}