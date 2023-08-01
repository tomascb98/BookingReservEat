import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { ContextProvider } from './utils/global.context.jsx'
import AuthContextProvider from './utils/AuthContext.jsx'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <BrowserRouter>
      <AuthContextProvider>
        <ContextProvider>
            <App />
        </ContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </LocalizationProvider>
)
