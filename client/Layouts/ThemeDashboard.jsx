import { createTheme } from '@mui/material/styles'
import {cyan} from '@material-ui/core/colors'

export default ThemeDashboard = createTheme({
  palette: {
    background: {
      default: "#F7F7F7"
    },
    primary: {
      light: '#8d8d8d',
      main: '#606060',
      dark: '#363636',
      contrastText: '#fff',
    },
    secondary: {
      light: '#718792',
      main: '#455a64',
      dark: '#1c313a',
      contrastText: '#000',
    },
  },
});