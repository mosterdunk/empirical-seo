import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Typography, Button, Grid, FormControl
} from '@material-ui/core'
import { Formik, Form, ErrorMessage } from 'formik';
import { TextField } from 'formik-material-ui';

import { db } from '../config/firebase'

import Layout from '../components/Layout'
import ScenarioForm from '../components/ScenarioForm'

const useStyles = makeStyles(theme => ({
  extra: {
    backgroundColor: 'red',
  },
  form: {
    backgroundColor: 'purple',
  },
}))

const Create = props => {
  const [pageControl, setPageControl] = React.useState(0)

  const classes = useStyles()

  const LoginForm = () => {
    return (
      <div className={classes.extra}>
        <Typography variant='body1'>
          In order for us to secure your results so that only you can see them, you need to make an account with us. Don't worry, we won't ever email you unless you opt in and we won't share your information with anyone!
        </Typography>
        <div id='firebaseui'></div>
      </div>
    )
  }

  const pageContent = (
    <>
      {
        {
          0: <ScenarioForm />,
          1: <LoginForm />
        }[pageControl]
      }
    </>
  )

  return (
    <>
      <Layout
        content={pageContent}
        title='Create a New Scenario'
      />
    </>
  )
}

export default Create