import { Router } from "express";
import { ProductController } from "./controller";
import { MulterAdapter } from "../../config";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class ProductRoutes {
  /* aquí se utiliza static functions porque como no se hará inyección de dependencias entonces no sería necesario instsanciar la clase AppRoutes y solo se coloca directo. También se están usando el get function para tener otra forma de realizar esta función, se podría realizar sin ese get (son solo diferentes formas de hacerlo) */
  static get routes(): Router {
    const router = Router();

    const productController = new ProductController();

    /* Routes de las API del auth */
    /* FORMA 1: aquí solo se está mandando la referencia a la función porque lo que se manda y lo que se recibe es el mismo orden y lo mismo */
    /* se coloca primero las rutas que tengan parámetros porque puede ser que si se coloca primero la ruta base al querer llamar a las rutas con los parámetros estas no funcionen correctamente y me mande la respuesta de la ruta base. Este comportamiento seguramente se debe a cómo Express maneja las rutas, cuando llega una solicitud, Express recorre las rutas en el orden en que se definieron y utiliza la primera que coincide con la ruta de la solicitud, entonces, si se tiene la ruta "/" antes que la de "/:id" Express va a considerar cualquier cosa después del "/" como parte de esa ruta y no como un parámetro para "/:id" por eso es que si se invierte el orden y se pone el "/:id" primero, Express va a reconocer el id como un parámetro y va a devolver la información correspondiente en lugar otra información perteneciente a otra ruta. Algunas veces puede ocurrir eso, y algunas veces no importa el orden de las rutas, pero sería bueno colocar el orden adecuado desde un inicio para evitar problemas a futuro */
    router.get("/get-product/:id", productController.getProductById);
    router.put("/update-product/:id", productController.updateProduct);
    router.delete("/delete-product/:id", productController.deleteProduct);

    router.get("/get-products", productController.getProducts);
    router.post(
      "/create-product",
      [
        /* en este caso, solo vamos a utilizar el middleware de AuthMiddleware para una ruta en particular, la cual es la ruta de crear el producto que es un post, pero si se necesita colocar o que afecte a varias rutas dentro de una ruta padre, entonces también se podría hacer, es decir, si quisiéramos que afecte todas las rutas de una ruta padre, por ejemplo, que el AuthMiddleware afecte a todas las rutas hijas de ..../api/products/.... también se puede hacer */
        /* en este caso como queremos que afecte a una ruta en particular, se coloca solo en esa ruta y se puede colocar como segundo argumento el middleware a utilizar o sino un arreglo de middleware porque si tenemos más middleware entonces sería solo añadirlo. Colocando el middleware aquí entonce hará que solo esta ruta en particular tenga esa validación necesaria en cada request para ver si el usuario puede acceder o no a crear un producto y con esto estamos creando una ruta protegida */
        AuthMiddleware.validateJWT,
        MulterAdapter.uploadFields([
          /* El método uploadFields acepta un arreglo donde se definen:
          - name: El nombre de los campos de archivo que se esperan en el formulario.
          - maxCount: El número máximo de archivos permitidos para cada campo.
          */
          /* En este caso, se están esperando hasta 4 archivos con los nombres image1, image2, image3, y image4. Cada uno puede tener como máximo 1 archivo. */
          { name: "image1", maxCount: 1 },
          { name: "image2", maxCount: 1 },
          { name: "image3", maxCount: 1 },
          { name: "image4", maxCount: 1 },
        ]),
      ], // si es un solo middleware se puede colocar directo MulterAdapter.uploadFields sin el arreglo.

      /* aquí tener en cuenta que como en el controller está como una función flecha entonces aquí no sería necesario bindear, es decir, no es necesario colocar el -- .bind(......) --. Si en el controller estuviera como una función tradicional y no como un función flecha y encima aquí en ProductRoutes no se colocara el -- .bind(......) -- entonces aquí nos saldrá un error similar a "TypeError: Cannot read properties of undefined (reading 'productService')" debido a que el controlador "ProductController" no está recibiendo correctamente la instancia de "ProductService" en su constructor, por lo que "productService" es undefined */
      /* En Express, cuando se pasa un método de clase directamente como middleware (productController.createProduct), el "this" del método puede perder el contexto de la instancia. Esto es debido a cómo JavaScript maneja el contexto de this, por lo tanto, es recomendable hacer bind al método. Entonces aplicamos el ".bind" para que el método createProduct mantenga el contexto de this */
      /* NOTA: Para evitar el bind, una forma común es definir "createProduct" (el que viene de productController) como una función flecha en el controlador, ya que las funciones flecha mantienen el contexto de this de la clase sin necesidad de hacer bind explícito. Al definir "createProduct" como una función flecha, el valor de this se refiere automáticamente a la instancia de "ProductController" y se elimina la necesidad de hacer bind en el archivo de rutas */
      productController.createProduct // usando función flecha
      // productController.createProduct.bind(productController) // usando función tradicional
    );

    /* FORMA 2: aquí se está mandando la función con sus parámetros que es una segunda forma de hacerlo en vez de la de arriba  */
    // router.get("/get-products", (request, response) =>
    //   productController.getProducts(request, response)
    // );

    return router;
  }
}
