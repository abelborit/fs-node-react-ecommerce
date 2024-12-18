import { useState, useCallback, useEffect } from "react";
import { CartDataInterface } from "../context/shopContext/ShopProvider";
import { FormDeliveryInterface } from "../constants/initialFormDelivery";

export interface UseBuyProductsLocalStorageInterface {
  cartItems: CartDataInterface;
  getCountAmount: number;
  formDeliveryValues: FormDeliveryInterface;
  selectedMethod: string;
  shopDate: Date;
}

const LOCAL_STORAGE_KEY = "purchaseShopState";

export const useBuyProductsLocalStorage = () => {
  const [purchaseShopState, setPurchaseShopState] = useState<
    Record<string, UseBuyProductsLocalStorageInterface>
  >(() => {
    // Recuperar datos del localStorage al cargar el hook
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : {};
  });

  const saveToLocalStorage = (
    data: Record<string, UseBuyProductsLocalStorageInterface>
  ) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  };

  const addPurchase = useCallback(
    (purchase: UseBuyProductsLocalStorageInterface) => {
      const timestamp = purchase.shopDate.getTime(); // Obtener milisegundos desde Epoch, daría algo como "1734551385982"
      const formattedDate = purchase.shopDate.toISOString().slice(0, 10); // Formatear fecha en "YYYY-MM-DD"
      const uniqueKey = `${formattedDate}-${timestamp}`; // Combinar fecha y timestamp

      setPurchaseShopState((prev) => {
        const updatedState = { ...prev, [uniqueKey]: purchase };
        saveToLocalStorage(updatedState); // Guardar en localStorage
        return updatedState;
      });
    },
    []
  );

  const removePurchase = useCallback((dateKey: string) => {
    setPurchaseShopState((prev) => {
      const newState = { ...prev };
      delete newState[dateKey];
      saveToLocalStorage(newState); // Guardar en localStorage
      return newState;
    });
  }, []);

  const getPurchaseByDate = useCallback(
    (dateKey: string): UseBuyProductsLocalStorageInterface | undefined => {
      return purchaseShopState[dateKey];
    },
    [purchaseShopState]
  );

  // Sincronizar el estado con localStorage en cada cambio
  useEffect(() => {
    saveToLocalStorage(purchaseShopState);
  }, [purchaseShopState]);

  return {
    /* states */
    purchaseShopState,

    /* functions */
    addPurchase,
    removePurchase,
    getPurchaseByDate,
  };
};
