import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  /* optimización "Split Chunks" de la aplicación utilizando la opción optimizeDeps de Vite que permite especificar qué módulos deberían ser precompilados y optimizados para dividir el código en partes más pequeñas que puedan cargarse de manera más eficiente, especialmente en aplicaciones grandes. Con esta configuración Vite precompilará y optimizará los módulos especificados en optimizeDeps lo que puede ayudar a mejorar el tiempo de carga de la aplicación especialmente en entornos de producción */
  /* es importante tener en cuenta que optimizeDeps se usa principalmente para optimizar el rendimiento de la carga inicial de la aplicación dividiendo el código en partes más pequeñas. Por lo tanto, generalmente se querrán incluir los módulos que son esenciales para la carga inicial de la aplicación. Si se incluyen todas las dependencias del proyecto en optimizeDeps esto podría aumentar el tiempo de compilación y no necesariamente resultará en un beneficio significativo para el rendimiento de la aplicación. Por lo tanto, es recomendable incluir solo las dependencias esenciales que se utilizan en la carga inicial de la aplicación como las bibliotecas principales del marco de trabajo (por ejemplo, React, Vue, Angular), enrutadores, bibliotecas de gestión de estados, y otras dependencias críticas que sean necesarias para la funcionalidad básica de la aplicación. */
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom", "react-icons"],
  },
});
