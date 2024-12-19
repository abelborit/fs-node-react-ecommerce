import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ShopProvider } from "./context/shopContext/ShopProvider.tsx";
import { FormDeliveryProvider } from "./context/formDeliveryContext/FormDeliveryProvider.tsx";
import { FormUserProvider } from "./context/formUserContext/FormUserProvider.tsx";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FormUserProvider>
      <FormDeliveryProvider>
        <ShopProvider>
          <App />
        </ShopProvider>
      </FormDeliveryProvider>
    </FormUserProvider>
  </StrictMode>
);
