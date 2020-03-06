import Head from 'next/head'
import { makeStyles } from '@material-ui/core/styles'
import {
  Grid,
  Container,
  CssBaseline,
} from '@material-ui/core'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from '../src/theme'

import NavBar from './NavBar'
import Header from './Header'
import InfoBar from './InfoBar'
import Footer from './Footer'

const useStyles = makeStyles(theme => ({
  slab: {
    border: 'dashed',
  },
  pageContent: {
    padding: 3,
  }
}))

const Layout = props => {
  const classes = useStyles()

  return (
    <>
      <Head>
        <title>{props.title}</title>
      </Head>
      <div>
        <Container maxWidth="lg" className={classes.slab}>
          <NavBar />
          <Header />
          <InfoBar />
          <main>
            <Grid container className={classes.pageContent}>
              {props.content}
            </Grid>
          </main>
          <Footer />
        </Container>
      </div>
    </>
  )
}

export default Layout