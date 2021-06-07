import { blue, red } from '@material-ui/core/colors'
import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#52c7b8',
      main: '#131339',
      dark: '#00675b',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ffd95b',
      main: '#ffa726',
      dark: '#c77800',
      contrastText: '#000',
    },
    openTitle: blue['700'],
    protectedTitle: red['700'],
    type: 'light'
  }
})

export default theme