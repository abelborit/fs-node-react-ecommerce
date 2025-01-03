import multer, { StorageEngine } from "multer";

export class MulterAdapter {
  /**
   * Configura el almacenamiento en memoria para los archivos subidos.
   * Esto permite acceder a los archivos como buffers sin guardarlos en disco.
   */
  /* si fuera sin el "get" entonces en el método "upload" tendría que ser -- { storage: this.storage() } -- */
  /* Se incluye el tipo StorageEngine para garantizar que el almacenamiento sea válido */
  static get storage(): StorageEngine {
    /* Los archivos subidos se almacenan en memoria como buffers. Esto es útil si se planea procesar los archivos directamente o enviarlos a un servicio externo como AWS S3 o Cloudinary */
    return multer.memoryStorage();
  }

  /**
   * Middleware para manejar la subida de un solo archivo.
   * @param fieldName - Nombre del campo en el formulario que contiene el archivo.
   * @returns Middleware de Multer para manejar un solo archivo.
   */
  static uploadSingle(fieldName: string) {
    if (!fieldName || typeof fieldName !== "string") {
      throw new Error("The 'fieldName' parameter must be a non-empty string.");
    }

    /* aquí se tiene que retornar la función middleware de multer para luego poder usarlo correctamente como un middleware en las rutas que necesitemos */
    return multer({ storage: this.storage }).single(fieldName);
  }

  /**
   * Middleware para manejar la subida de múltiples archivos en un mismo campo.
   * @param fieldName - Nombre del campo en el formulario que contiene los archivos.
   * @param maxCount - Número máximo de archivos permitidos.
   * @returns Middleware de Multer para manejar múltiples archivos.
   */
  static uploadMultiple(fieldName: string, maxCount: number = 10) {
    if (!fieldName || typeof fieldName !== "string") {
      throw new Error("The 'fieldName' parameter must be a non-empty string.");
    }

    if (typeof maxCount !== "number" || maxCount <= 0) {
      throw new Error("The 'maxCount' parameter must be a positive number.");
    }

    /* aquí se tiene que retornar la función middleware de multer para luego poder usarlo correctamente como un middleware en las rutas que necesitemos */
    return multer({ storage: this.storage }).array(fieldName, maxCount);
  }

  /**
   * Middleware para manejar múltiples campos con archivos.
   * Útil para formularios con varios campos de archivo.
   * @param fields - Lista de campos con sus respectivos límites de archivos.
   * @returns Middleware de Multer para manejar múltiples campos de archivos.
   */
  static uploadFields(fields: { name: string; maxCount?: number }[]) {
    if (!Array.isArray(fields) || fields.length === 0) {
      throw new Error("Fields parameter must be a non-empty array.");
    }

    for (const field of fields) {
      if (!field.name || typeof field.name !== "string") {
        throw new Error("Each field must have a valid 'name' property.");
      }

      if (field.maxCount !== undefined && typeof field.maxCount !== "number") {
        throw new Error("'maxCount' must be a number if provided.");
      }
    }

    /* aquí se tiene que retornar la función middleware de multer para luego poder usarlo correctamente como un middleware en las rutas que necesitemos */
    return multer({ storage: this.storage }).fields(fields);
  }
}

/* ************************************************************************************************************************ */
/* Un buffer es un área de memoria utilizada para almacenar temporalmente datos mientras se mueven de un lugar a otro. En el contexto de programación, un buffer es una estructura de datos o un bloque de memoria que contiene datos binarios en bruto, normalmente usados para manejar flujos de datos, archivos, o cualquier tipo de datos que se transportan entre sistemas.

En Node.js específicamente, un Buffer es un objeto global que se utiliza para trabajar con datos binarios de manera eficiente, especialmente en operaciones de entrada/salida (I/O). Es fundamental en el manejo de datos provenientes de archivos, sockets de red o flujos de datos.

- ¿Dónde se Usan los Buffers?

  - Subida y Descarga de Archivos:
    - Procesar archivos en trozos para no cargar grandes cantidades de datos en memoria.

  - Flujos de Datos (Streams):
    - Manipular datos mientras llegan, como al recibir respuestas HTTP o manejar archivos.

  - Codificación/Decodificación:
    - Convertir datos entre diferentes formatos (e.g., Base64, UTF-8, etc.).

  - Sockets de Red:
    - Enviar y recibir datos en conexiones de red, como WebSockets o TCP.

  - Procesamiento de Archivos:
    - Leer y escribir archivos binarios (imágenes, videos, etc.).


- Ejemplo Básico de un Buffer en Node.js

  - Crear un Buffer

    ```
    const buffer = Buffer.from("Hello, World!", "utf-8");
    console.log(buffer);
    // Salida: <Buffer 48 65 6c 6c 6f 2c 20 57 6f 72 6c 64 21>
    ```

  - Convertir un Buffer a Texto

    ```
    console.log(buffer.toString("utf-8"));
    // Salida: Hello, World!
    ```

  - Modificar un Buffer

    ```
    buffer[0] = 0x48; // Cambiar el primer byte
    console.log(buffer.toString("utf-8"));
    // Salida: Hello, World! (sin cambios en este caso porque ya era 'H')
    ```


- ¿Por Qué Usar Buffers en Node.js?
  - Eficiencia: Permiten trabajar con grandes cantidades de datos binarios sin necesidad de convertirlos constantemente a texto.
  - Compatibilidad: Facilitan la comunicación con sistemas que requieren datos binarios en lugar de texto.
  - Control Preciso: Ofrecen acceso a nivel de byte para trabajar con datos.


- Diferencia con Cadenas de Texto

  - Característica          Buffer                            Cadena de Texto
  - Contenido               Datos binarios                    Datos de texto (UTF-8, etc.)
  - Tamaño                  Fijo una vez creado               Dinámico
  - Manipulación            A nivel de byte                   A nivel de carácter
  - Uso principal           Archivos, flujos, sockets         Manipulación de texto
*/
