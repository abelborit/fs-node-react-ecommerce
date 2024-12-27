import { Server } from "./presentation/server";
import { envs } from "./config";
import { AppRoutes } from "./presentation/routes";
import { MongoConnectionDataBase } from "./database/mongo";

/* Función para conectar la base de datos */
async function initializeDatabase() {
  try {
    console.log("Connecting to MongoDB... 🔄");
    const isConnectionMongoSuccess = await MongoConnectionDataBase.connect({
      mongoUrl: envs.MONGO_URL,
      databaseName: envs.MONGO_DB_NAME,
    });

    if (!isConnectionMongoSuccess) {
      throw new Error("Failed to connect to MongoDB.");
    }
    console.log("app.ts - MongoDB connected successfully ✅");
  } catch (error) {
    console.error("app.ts - Failed to connect to MongoDB ❌:", error);
    throw error; // Escalar el error para manejarlo en el nivel principal.
  }
}

/* Función para iniciar el servidor */
async function initializeServer() {
  try {
    const server = new Server({
      port: envs.PORT,
      public_path: envs.PUBLIC_PATH,
      routes: AppRoutes.routes,
    });

    console.log("Starting the server... 🔄");
    await server.start();
    console.log("app.ts - Server started successfully ✅");
  } catch (error) {
    console.error("app.ts - Failed to start the server ❌:", error);
    throw error; // Escalar el error para manejarlo en el nivel principal.
  }
}

/* Manejar la desconexión y señales */
function setupGracefulShutdown() {
  process.on("SIGINT", async () => {
    console.log("🔄 Disconnecting from MongoDB...");
    try {
      await MongoConnectionDataBase.disconnect();
      console.log("app.ts - MongoDB disconnected successfully ✅.");
    } catch (error) {
      console.error("app.ts - Error during MongoDB disconnection ❌:", error);
    } finally {
      console.log("👋 Application terminated gracefully.");
      process.exit(0);
    }
  });
}

/* Función principal que organiza todo */
async function main() {
  try {
    await initializeDatabase(); // Conectar base de datos
    await initializeServer(); // Iniciar servidor
    setupGracefulShutdown(); // Configurar manejo de desconexión
  } catch (error) {
    console.error("app.ts - Application failed to start ❌:", error);

    /* Indica que la aplicación se cerró debido a un error no manejado correctamente. Esto es útil en aplicaciones donde no se puede continuar si algo falla al inicio (por ejemplo, fallar al conectar con la base de datos o cargar configuraciones críticas) */
    process.exit(1); // Terminar aplicación en caso de error crítico
  }
}

/* Llamada al flujo principal */
main();

/* ************************************************************************************************************************ */

/* --- NOTAS --- */
/* Usar async en funciones como main ayuda a mantener un flujo estándar cuando la aplicación crezca. Por ejemplo, si se agrega inicializaciones que requieren await, no se tendrá que cambiar todo el esquema del inicio */
/* Las funciones asíncronas permiten usar try-catch de manera eficiente, especialmente para operaciones que puedan fallar y lanzar excepciones */
/* ¿Cuándo NO usar async? Cuando la función no tiene ninguna operación asíncrona y no existe posibilidad razonable de que en el futuro se agreguen */
