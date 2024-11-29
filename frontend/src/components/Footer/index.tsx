import { Link } from "react-router-dom";
import { logo_img } from "../../assets";

export const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-20 text-sm">
        <div>
          <img src={logo_img} alt="logo" className="mb-5 w-32" />
          <p className="w-full md:w-2/3 text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Repudiandae dicta voluptas inventore obcaecati fugiat quidem,
            laudantium iusto nobis non, quam sunt sapiente maiores facere neque
            expedita quod id harum aperiam.
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            {/* aquí se podría hacer un arreglo como en el Navbar para tener las opciones y también coloca un Link component para que cada li component me redirija a esa url, no se hace así ahora porque no se tiene una url para "Delivery" ni para "Privacy Policy" */}
            <li>
              <Link to="/home" className="hover:text-[#C586A5]">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-[#C586A5]">
                About us
              </Link>
            </li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCHE</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>0-000-000-0000</li>
            <li>email@enterprise.com</li>
            <li>Redes Sociales 1</li>
            <li>Redes Sociales 2</li>
          </ul>
        </div>
      </div>

      <div>
        <div>
          <hr />

          <p className="py-5 text-sm text-center">
            Copyright 2024@ greatstack.dev - All Right Reserved.
          </p>
        </div>
      </div>
    </div>
  );
};
