// /* --- FORMA 1 --- */
// import { Server } from "./presentation/server";
// import { envs } from "./config/envs.plugin";
// import { AppRoutes } from "./presentation/routes";

// /* Usar async en funciones como main ayuda a mantener un flujo estándar cuando la aplicación crezca. Por ejemplo, si se agrega inicializaciones que requieren await, no se tendrá que cambiar todo el esquema del inicio */
// /* Las funciones asíncronas permiten usar try-catch de manera eficiente, especialmente para operaciones que puedan fallar y lanzar excepciones */
// /* ¿Cuándo NO usar async? Cuando la función no tiene ninguna operación asíncrona y no existe posibilidad razonable de que en el futuro se agreguen */

// const main = async () => {
//   try {
//     const server = new Server({
//       port: envs.PORT,
//       public_path: envs.PUBLIC_PATH,
//       routes: AppRoutes.routes,
//     });

//     await server.start();
//   } catch (error) {
//     console.error("Error starting the server:", error);

//     /* Indica que la aplicación se cerró debido a un error no manejado correctamente. Esto es útil en aplicaciones donde no se puede continuar si algo falla al inicio (por ejemplo, fallar al conectar con la base de datos o cargar configuraciones críticas) */
//     process.exit(1); // Cerrar el proceso si ocurre un error crítico
//   }
// };

// (() => {
//   main();
// })();

/* ************************************************************************************************************************ */

/* --- FORMA 2 --- */
// import { Server } from "./presentation/server";
// import { envs } from "./config/envs.plugin";
// import { AppRoutes } from "./presentation/routes";

// /* Usar async en funciones como main (o en este caso hacerlo en una función anónima autoejecutable) ayuda a mantener un flujo estándar cuando la aplicación crezca. Por ejemplo, si se agrega inicializaciones que requieren await, no se tendrá que cambiar todo el esquema del inicio */
// /* Las funciones asíncronas permiten usar try-catch de manera eficiente, especialmente para operaciones que puedan fallar y lanzar excepciones */
// /* ¿Cuándo NO usar async? Cuando la función no tiene ninguna operación asíncrona y no existe posibilidad razonable de que en el futuro se agreguen */

// (async () => {
//   try {
//     const server = new Server({
//       port: envs.PORT,
//       public_path: envs.PUBLIC_PATH,
//       routes: AppRoutes.routes,
//     });

//     await server.start();
//   } catch (error) {
//     console.error("Error starting the server:", error);

//     /* Indica que la aplicación se cerró debido a un error no manejado correctamente. Esto es útil en aplicaciones donde no se puede continuar si algo falla al inicio (por ejemplo, fallar al conectar con la base de datos o cargar configuraciones críticas) */
//     process.exit(1); // Cerrar el proceso si ocurre un error crítico
//   }
// })();

/* ************************************************************************************************************** */
/* --- DIFERENCIAS ENTRE LA FORMA 1 Y FORMA 2 --- */
/*
- Diferencias clave:

  - Manejo de promesas en el ámbito global:
En la FORMA 1, main es llamado dentro de una función anónima autoejecutable, pero no se maneja explícitamente su resultado, ya que no se está usando await ni catch en esa invocación. Esto significa que si main lanza una excepción no manejada, el programa puede comportarse de forma inesperada.

  - Función no marcada como async:
En su función anónima (() => { main(); }) no está marcada como async, por lo que no se puede usar await directamente dentro de ella para esperar a que main termine.

- Comparación de comportamientos:
  - En la FORMA 2: El error es capturado directamente en el try-catch de la función anónima, lo que garantiza un manejo robusto y consistente.

  - En la FORMA 1: La llamada main() dentro de (() => { main(); }) no captura explícitamente los errores que podrían salir del contexto del main (si hubiera algún error que ocurriera fuera del try-catch). Aunque parece robusto, puede haber situaciones en las que errores asíncronos no se manejen adecuadamente.

    - ¿Qué deberías cambiar para que sea igual?
      - Si se desea mantener la estructura de main con un try-catch interno, hay que asegurarnos de manejar el flujo de la promesa devuelta por main en la función anónima:

        ```
          (() => {
            main().catch((error) => {
              console.error("Unexpected error:", error);
              process.exit(1);
            });
          })();
        ```

  - Conclusión

    - La FORMA 1 puede funcionar correctamente, pero es más propenso a errores si no se captura explícitamente el resultado de la llamada a main. La estructura async en la función anónima autoejecutable en la FORMA 2 es más robusta y fácil de mantener, especialmente en aplicaciones más complejas.
*/

/* ************************************************************************************************************** */

/* --- FORMA 3 --- */
import { Server } from "./presentation/server";
import { envs } from "./config/envs.plugin";
import { AppRoutes } from "./presentation/routes";

/* Usar async en funciones como main (o en este caso hacerlo en una función anónima autoejecutable) ayuda a mantener un flujo estándar cuando la aplicación crezca. Por ejemplo, si se agrega inicializaciones que requieren await, no se tendrá que cambiar todo el esquema del inicio */
/* Las funciones asíncronas permiten usar try-catch de manera eficiente, especialmente para operaciones que puedan fallar y lanzar excepciones */
/* ¿Cuándo NO usar async? Cuando la función no tiene ninguna operación asíncrona y no existe posibilidad razonable de que en el futuro se agreguen */

const main = async () => {
  const server = new Server({
    port: envs.PORT,
    public_path: envs.PUBLIC_PATH,
    routes: AppRoutes.routes,
  });

  await server.start();
};

(async () => {
  try {
    await main();
  } catch (error) {
    console.error("Error starting the server:", error);

    /* Indica que la aplicación se cerró debido a un error no manejado correctamente. Esto es útil en aplicaciones donde no se puede continuar si algo falla al inicio (por ejemplo, fallar al conectar con la base de datos o cargar configuraciones críticas) */
    process.exit(1); // Cerrar el proceso si ocurre un error crítico
  }
})();
