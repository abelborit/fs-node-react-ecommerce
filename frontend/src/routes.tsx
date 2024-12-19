import { createHashRouter, Navigate } from "react-router-dom";

/* El uso de lazy() en la configuración de rutas de React Router es una característica introducida para soportar carga asíncrona de componentes en React Router v6.4 o superior. Sin embargo, lazy() no es un concepto explícito de React Router, sino una técnica derivada del manejo dinámico de importaciones (import()). La documentación oficial de React Router no menciona un método lazy() como el mostrado en el código. En cambio, utiliza el método lazy de React combinado con la API de carga diferida de las rutas. */

/* usualmente se utilizaría de esta forma: */
/*
const EcommerceLayout = lazy(() => import("./layouts/EcommerceLayout.tsx"));

  {
    path: "/",
    element: <EcommerceLayout />, // Se usa aquí directamente
  },
*/

export const router = createHashRouter([
  {
    path: "/",
    async lazy() {
      const { EcommerceLayout } = await import("./layouts/EcommerceLayout.tsx");
      return { Component: EcommerceLayout };
    },
    children: [
      /* RUTA PRINCIPAL QUE REDIRIGE AL /home */
      {
        path: "/",
        element: <Navigate to="/home" replace />,
      },

      /* ************************************************************************************************************** */
      /* ROUTES - AUTH */
      {
        // index: true, // se coloca true si queremos que cuando entre a /auth entonces su index sea el componente Login (se tendría que comentar o sacar el path para que funcione) pero aquí estamos colocando su ruta de forma explícita con path: "login" para que cuando entre a ese path de /auth/login entonces se muestre el componente Login
        path: "login",
        async lazy() {
          const { LoginPage } = await import("./pages/auth/LoginPage.tsx");
          return { Component: LoginPage };
        },
      },
      {
        // index: true, // se coloca true si queremos que cuando entre a /auth entonces su index sea el componente Login (se tendría que comentar o sacar el path para que funcione) pero aquí estamos colocando su ruta de forma explícita con path: "login" para que cuando entre a ese path de /auth/login entonces se muestre el componente Login
        path: "register",
        async lazy() {
          const { RegisterPage } = await import(
            "./pages/auth/RegisterPage.tsx"
          );
          return { Component: RegisterPage };
        },
      },

      /* ************************************************************************************************************** */
      /* ROUTES - ECOMMERCE */
      {
        path: "home",
        async lazy() {
          const { HomePage } = await import("./pages/ecommerce/HomePage.tsx");
          return { Component: HomePage };
        },
      },
      {
        path: "about",
        async lazy() {
          const { AboutPage } = await import("./pages/ecommerce/AboutPage.tsx");
          return { Component: AboutPage };
        },
      },
      {
        path: "collection",
        async lazy() {
          const { CollectionPage } = await import(
            "./pages/ecommerce/CollectionPage.tsx"
          );
          return { Component: CollectionPage };
        },
      },
      {
        path: "contact",
        async lazy() {
          const { ContactPage } = await import(
            "./pages/ecommerce/ContactPage.tsx"
          );
          return { Component: ContactPage };
        },
      },

      /* ************************************************************************************************************** */
      /* ROUTES - ECOMMERCE -> PRODUCT */
      {
        path: "product/:productId",
        async lazy() {
          const { ProductPage } = await import(
            "./pages/product/ProductPage.tsx"
          );
          return { Component: ProductPage };
        },
      },
      /* ROUTES - ECOMMERCE -> CART - DELIVER - ORDERS */
      {
        path: "cart",
        async lazy() {
          const { CartPage } = await import(
            "./pages/cart-deliver-orders/CartPage.tsx"
          );
          return { Component: CartPage };
        },
      },
      {
        path: "place-order",
        async lazy() {
          const { PlaceOrderPage } = await import(
            "./pages/cart-deliver-orders/PlaceOrderPage.tsx"
          );
          return { Component: PlaceOrderPage };
        },
      },
      {
        path: "shop-summary",
        async lazy() {
          const { ShopSummary } = await import(
            "./pages/cart-deliver-orders/ShopSummary.tsx"
          );
          return { Component: ShopSummary };
        },
      },
      {
        path: "orders",
        async lazy() {
          const { OrdersPage } = await import(
            "./pages/cart-deliver-orders/OrdersPage.tsx"
          );
          return { Component: OrdersPage };
        },
      },
      {
        path: "order-tracking",
        async lazy() {
          const { OrderTrackingPage } = await import(
            "./pages/cart-deliver-orders/OrderTrackingPage.tsx"
          );
          return { Component: OrderTrackingPage };
        },
      },

      /* ************************************************************************************************************** */
      /* ROUTES - 404 */
      {
        path: "*",
        async lazy() {
          const { Error404 } = await import("./pages/Error404.tsx");
          return { Component: Error404 };
        },
      },
    ],
  },

  /* ROUTES - Order PDF */
  {
    path: "order-pdf",
    async lazy() {
      const { OrderPDFPage } = await import(
        "./pages/cart-deliver-orders/OrderPDFPage.tsx"
      );
      return { Component: OrderPDFPage };
    },
  },

  /* ROUTES - 404 */
  {
    path: "*",
    async lazy() {
      const { Error404 } = await import("./pages/Error404.tsx");
      return { Component: Error404 };
    },
  },
]);
