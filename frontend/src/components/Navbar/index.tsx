import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FaAlignRight,
  FaBagShopping,
  FaAngleLeft,
  FaMagnifyingGlass,
  FaUser,
} from "react-icons/fa6";
import { logo_img } from "../../assets";
import { useState } from "react";

interface NavbarOptionInterface {
  name: string;
  pathTo: string;
}

const navbarOption: NavbarOptionInterface[] = [
  {
    name: "HOME",
    // pathTo: "/", // si se quiere usar de esta forma entonces hay que hacer uso del -- end={optionMenu.pathTo === "/"} -- para que aplique coincidencia exacta solo para HOME pero hay que tener en cuenta que la ruta base debe estar solo con el "/" y nosotros nuestra ruta base es "/home" entonces deberíamos configurar nuestras "routes" y que cuando se esté en el home la url solo tenga "/" y no "/home"
    pathTo: "/home", // aquí se coloca el path directo de "/home" para que pueda reconocer es "isActive" del "NavLink" porque si se coloca directo "/" entonces es como una ruta base que también coincide con rutas anidadas como /about o /collection, etc, por eso puede causar que el estado "isActive" no funcione como se espera, ya que React Router ve que "/" está activo incluso cuando se está en otras rutas
  },
  {
    name: "COLLECTION",
    pathTo: "/collection",
  },
  {
    name: "ABOUT",
    pathTo: "/about",
  },
  {
    name: "CONTACT",
    pathTo: "/contact",
  },
];

/* aquí se podría usar como una función o también como un elemento de React, y si fuera como elemento de React (porque está retornando un jsx o tsx) habría que cambiar el nombre a "RenderNavLinkContent". Se coloca separado con la inteción de que reciba los parámetros que necesita o en vez de una función aparte también se puede colocar de forma directa los componentes necesarios */
// const renderNavLinkContent = (name: string, isActive: boolean) => {
//   return (
//     <>
//       <p>{name}</p>
//       <hr
//         className={`w-2/4 border-none h-[1.5px] ${
//           isActive ? "bg-[#C586A5]" : "hidden"
//         }`}
//       />
//     </>
//   );
// };

export const Navbar = () => {
  const [isVisibleMenu, setIsVisibleMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogoClick = () => {
    /* navegar programáticamente a la ruta deseada, es decir, cambiar la ruta de la aplicación mediante código, sin que el usuario haga clic directamente en un enlace (<a> o <NavLink>). En el caso de React Router, esto se hace utilizando el hook useNavigate. Es útil en situaciones donde el cambio de ruta debe ocurrir como resultado de un evento o lógica específica, no solo por un enlace. */
    navigate("/home");
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <button onClick={handleLogoClick}>
        <img src={logo_img} alt="logo" className="w-36" />
      </button>

      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        {navbarOption.map((optionMenu) => (
          <li key={optionMenu.name}>
            <NavLink
              to={optionMenu.pathTo}
              // end={optionMenu.pathTo === "/"}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 ${
                  isActive ? "text-gray-900 font-semibold" : "text-gray-700"
                }`
              }
            >
              {({ isActive }) => (
                // renderNavLinkContent(optionMenu.name, isActive)

                /* aquí se está colocando de forma directa los componentes necesarios sin la necesidad de que haya una función o componente aparte */
                <>
                  <p>{optionMenu.name}</p>
                  <hr
                    className={`w-2/4 border-none h-[1.5px] bg-[#C586A5] transition-all duration-300 ease-in-out ${
                      isActive
                        ? "opacity-100 scale-x-100"
                        : "opacity-0 scale-x-0"
                    }`}
                  />
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-6">
        <button>
          <FaMagnifyingGlass className="w-5 min-w-5 h-5 min-h-5" />
        </button>

        <button className="group relative">
          <FaUser className="w-5 min-w-5 h-5 min-h-5" />

          <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-2">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
              <button className="text-left hover:text-gray-900">
                My Profile
              </button>

              <button className="text-left hover:text-gray-900">Orders</button>

              <button className="text-left hover:text-gray-900">Logout</button>
            </div>
          </div>
        </button>

        <Link to="/cart" className="relative">
          <FaBagShopping className="w-5 min-w-5 h-5 min-h-5" />
          <p className="absolute right-[-6px] bottom-[-6px] w-4 text-center leading-4 bg-[#b36b8f] text-white aspect-square rounded-full text-[8px]">
            10
          </p>
        </Link>

        <button onClick={() => setIsVisibleMenu(true)} className="sm:hidden">
          <FaAlignRight className="w-5 min-w-5 h-5 min-h-5" />
        </button>
      </div>

      {/* siderbar menu for small screens */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          isVisibleMenu ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <button
            onClick={() => setIsVisibleMenu(false)}
            className="flex items-center gap-2 p-5"
          >
            <FaAngleLeft className="w-5 min-w-5 h-5 min-h-5" />
            <p>Back</p>
          </button>

          <hr className={"w-full border-none h-[1.5px] bg-gray-300 mb-2"} />

          <ul className="gap-5 text-sm text-gray-700">
            {navbarOption.map((optionMenu) => (
              <li key={optionMenu.name}>
                <NavLink
                  to={optionMenu.pathTo}
                  onClick={() =>
                    setTimeout(() => {
                      setIsVisibleMenu(false);
                    }, 500)
                  }
                  className={({ isActive }) =>
                    `flex flex-col items-center gap-1 ${
                      isActive ? "text-gray-900 font-semibold" : "text-gray-700"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <hr
                        className={`w-full border-none h-[1.5px] bg-[#b36b8f] transition-all duration-300 ease-in-out ${
                          isActive
                            ? "opacity-100 scale-x-100"
                            : "opacity-0 scale-x-0"
                        }`}
                      />

                      <p
                        className={`w-full text-base py-2 px-5 ${
                          isActive
                            ? "bg-[#b36b8f] text-white"
                            : "bg-transparent"
                        }`}
                      >
                        {optionMenu.name}
                      </p>

                      <hr
                        className={`w-full border-none h-[1.5px] bg-[#C586A5] transition-all duration-300 ease-in-out ${
                          isActive
                            ? "opacity-100 scale-x-100"
                            : "opacity-0 scale-x-0"
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
