import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ShopProvider } from './context/shopContext/ShopProvider.tsx'
import { FormDeliveryProvider } from './context/formDeliveryContext/FormDeliveryProvider.tsx'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FormDeliveryProvider>
      <ShopProvider>
        <App />
      </ShopProvider>
    </FormDeliveryProvider>
  </StrictMode>
)
