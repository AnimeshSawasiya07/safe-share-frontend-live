
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux-config/Store.js'
import { GoogleOAuthProvider } from "@react-oauth/google"
const clientId = "449822973881-aa240r0de5getvkv3csm1avl978l75i2.apps.googleusercontent.com"

createRoot(document.getElementById('root')).render(
    <GoogleOAuthProvider clientId={clientId}>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </GoogleOAuthProvider>
)
