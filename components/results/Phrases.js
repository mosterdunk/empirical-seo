import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    border: 'dashed',
    padding: theme.spacing(1)
  }
}))

export default function (props) {
  const classes = useStyles()
  
  const {rowsPhrases} = props

  return (
    <div className={classes.root}>
      <Typography variant='h4'>
        Phrases
      </Typography>
      {rowsPhrases()}
    </div>
  )
}