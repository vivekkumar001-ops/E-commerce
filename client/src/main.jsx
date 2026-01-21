
import { createRoot } from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import App from "./pages/App";
import { AuthProvider } from "./context/auth.jsx";
import { CartProvider } from './context/Cart.jsx';

createRoot(document.getElementById('root')).render(
    <>
    <AuthProvider>
    <CartProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </CartProvider>
    </AuthProvider>
    </>
)
