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

  const saveToLocalStorage = (data: Record<string, UseBuyProductsLocalStorageInterface>) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  };

  const addPurchase = useCallback(
    (purchase: UseBuyProductsLocalStorageInterface) => {
      // Formatear fecha en "YYYY-MM-DD"
      const formattedDate = purchase.shopDate.toISOString().slice(0, 10); // Ejemplo: "2024-12-17"

      setPurchaseShopState((prev) => {
        const updatedState = { ...prev, [formattedDate]: purchase };
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
