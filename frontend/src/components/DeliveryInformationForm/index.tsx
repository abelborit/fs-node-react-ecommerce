import { Form, Formik, FormikErrors } from "formik";
import { InputComponent } from "../InputComponent";
import { ChangeEvent } from "react";
import { useFormDeliveryContext } from "../../context/formDeliveryContext/FormDeliveryContext";
import { validationSchemaRules } from "./validationSchemaRules";
import {
  FormDeliveryInterface,
  initialFormDelivery,
} from "../../constants/initialFormDelivery";
import { inputGroupsForm } from "./inputGroupsForm";

interface HandleChangeManualInterface {
  event: ChangeEvent<HTMLInputElement>;

  setFieldTouched: (
    field: string,
    isTouched?: boolean
  ) => void | Promise<void | FormikErrors<FormDeliveryInterface>>;

  setFieldValue: (
    field: string,
    value: string
  ) => Promise<void | FormikErrors<FormDeliveryInterface>>;
}

// const classWrapperInput =
//   "flex flex-col sm:flex-row justify-evenly gap-6 w-full";

export const DeliveryInformationForm = () => {
  const { handleFormValidity, setFormState } = useFormDeliveryContext();

  const handleChangeManual = ({
    event,
    setFieldTouched,
    setFieldValue,
  }: HandleChangeManualInterface) => {
    // setFieldTouched viene del objeto formik, sirve para "tocar" el campo dependiendo del name
    // setFieldValue viene del objeto formik, sirve para asignar el valor a un campo dependiendo del name
    setFieldTouched(event.target.name, true);
    setFieldValue(event.target.name, event.target.value);

    /* FORMA 1: */
    /* Actualizar los valores en el contexto cada vez que un campo cambia */
    // setFormState((prevValues) => ({
    //   ...prevValues,
    //   formDeliveryValues: {
    //     ...prevValues.formDeliveryValues,
    //     [event.target.name]: event.target.value,
    //   },
    // }));
  };

  return (
    <>
      {/* Estos componentes utilizan en el fondo una configuración del context, es decir se crea un context provider el cual proporciona la información que viene del useFormik, y los props que se muestran en la URL son los props que le estamos colocando nosotros (initialValues, onSubmit, validationSchema) y son los que le tenemos que enviar al contexto para que ese contexto distribuya todo ese objeto a lo largo de todos sus hijos. Según la URL se puden pasar los hijos ya sea como funciones o como componente. Se puede aplicar lo mismo que muestra la URL y crear el contexto y su configuración pero lo haremos de una forma un poco más sencilla evitando crear el contexto para proporcionar la información de nuestro formulario y recien usar los componentes de Formik. (https://formik.org/docs/tutorial#leveraging-react-context) */}

      {/* Formik es un componente porque retorna un JSX.Element. Lo que se está haciendo aquí es que en vez de usar el hook de useFormik se está colocando directamente en el objeto de Formik y eso nos ayuda a ya no usar todo el hook de useFormik y su código, aunque relativamente es el mismo código, solo que el componente Formik ya lo trabaja internamente */}
      <Formik
        initialValues={initialFormDelivery}
        onSubmit={(values) => {
          console.log("onSubmit", values);
        }}
        validationSchema={validationSchemaRules}
        validate={(values) => {
          // console.log(values);

          /* FORMA 2: */
          /* Actualizar los valores en el contexto cada vez que un campo cambia */
          setFormState({ formDeliveryValues: values });
        }}
      >
        {/* trabajarlo así usando una función pasada como un children dentro de un HOC me da la facilidad que pueda tener todo el objeto de Formik ahí en la expresión formik */}
        {/* NOTA: si se usa MUI entonces no se podría usar el Field y ErrorMessage, se debería desestructurar de la función el handleBlur, el getFieldProps, etc, y colocarlo según las necesidades en los componentes de MUI */}
        {(formik) => {
          const isFieldsWithoutErrors = Object.keys(formik.errors).length === 0;
          const isFieldsNotEmpty = Object.values(formik.values).every(
            (value) => value !== ""
          );

          const isFormValid = isFieldsWithoutErrors && isFieldsNotEmpty;

          /* se coloca un "setTimeout" para que de tiempo de renderizar primero el componente y luego recién actualizar el estado del contexto porque si no dará un warning similar a -- Warning: Cannot update a component (`FormDeliveryProvider`) while rendering a different component (`Formik`). To locate the bad setState() call inside `Formik`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render Error Component Stack -- */
          /* NOTA: no es la mejor solución pero al menos funciona por ahora. Se está colocando 50 milisegundos porque ya al colocar el "setTimeout", así sea en 0, se sabe que se verá afectado el event loop */
          setTimeout(() => {
            handleFormValidity(isFormValid);
          }, 50);

          return (
            /* al usar el Form de los componentes de Formik ya no es necesario usar el onSubmit porque el Form ya sabe lo que tiene que hacer al mandar el formulario */
            // <Form className="flex flex-col gap-4 py-6 px-6 bg-gray-100 rounded-lg w-full sm:max-w-[550px]">
            //   {/* Grupo 1: First Name, Last Name */}
            //   <div className={classWrapperInput}>
            //     <InputComponent
            //       label="First Name"
            //       name="firstName"
            //       type="text"
            //       placeholder="Ana Rouse"
            //       onChange={(event: ChangeEvent<HTMLInputElement>) =>
            //         handleChangeManual({
            //           event,
            //           setFieldTouched: formik.setFieldTouched,
            //           setFieldValue: formik.setFieldValue,
            //         })
            //       }
            //     />

            //     <InputComponent
            //       label="Last Name"
            //       name="lastName"
            //       type="text"
            //       placeholder="Bart Zhon"
            //       onChange={(event: ChangeEvent<HTMLInputElement>) =>
            //         handleChangeManual({
            //           event,
            //           setFieldTouched: formik.setFieldTouched,
            //           setFieldValue: formik.setFieldValue,
            //         })
            //       }
            //     />
            //   </div>

            //   {/* Grupo 2: Email */}
            //   <div className={classWrapperInput}>
            //     <InputComponent
            //       label="Email"
            //       name="email"
            //       type="email"
            //       placeholder="email@example.com"
            //       onChange={(event: ChangeEvent<HTMLInputElement>) =>
            //         handleChangeManual({
            //           event,
            //           setFieldTouched: formik.setFieldTouched,
            //           setFieldValue: formik.setFieldValue,
            //         })
            //       }
            //     />
            //   </div>

            //   {/* Grupo 3: Street */}
            //   <div className={classWrapperInput}>
            //     <InputComponent
            //       label="Street"
            //       name="street"
            //       type="text"
            //       placeholder="Urb. Dot 504 - UX"
            //       onChange={(event: ChangeEvent<HTMLInputElement>) =>
            //         handleChangeManual({
            //           event,
            //           setFieldTouched: formik.setFieldTouched,
            //           setFieldValue: formik.setFieldValue,
            //         })
            //       }
            //     />
            //   </div>

            //   {/* Grupo 4: City, State */}
            //   <div className={classWrapperInput}>
            //     <InputComponent
            //       label="City"
            //       name="city"
            //       type="text"
            //       placeholder="USA"
            //       onChange={(event: ChangeEvent<HTMLInputElement>) =>
            //         handleChangeManual({
            //           event,
            //           setFieldTouched: formik.setFieldTouched,
            //           setFieldValue: formik.setFieldValue,
            //         })
            //       }
            //     />

            //     <InputComponent
            //       label="State"
            //       name="state"
            //       type="text"
            //       placeholder="California"
            //       onChange={(event: ChangeEvent<HTMLInputElement>) =>
            //         handleChangeManual({
            //           event,
            //           setFieldTouched: formik.setFieldTouched,
            //           setFieldValue: formik.setFieldValue,
            //         })
            //       }
            //     />
            //   </div>

            //   {/* Grupo 5: Zipcode, Country */}
            //   <div className={classWrapperInput}>
            //     <InputComponent
            //       label="Zipcode"
            //       name="zipcode"
            //       type="text"
            //       placeholder="90001"
            //       onChange={(event: ChangeEvent<HTMLInputElement>) =>
            //         handleChangeManual({
            //           event,
            //           setFieldTouched: formik.setFieldTouched,
            //           setFieldValue: formik.setFieldValue,
            //         })
            //       }
            //     />

            //     <InputComponent
            //       label="Country"
            //       name="country"
            //       type="text"
            //       placeholder="LA - Los Ángeles"
            //       onChange={(event: ChangeEvent<HTMLInputElement>) =>
            //         handleChangeManual({
            //           event,
            //           setFieldTouched: formik.setFieldTouched,
            //           setFieldValue: formik.setFieldValue,
            //         })
            //       }
            //     />
            //   </div>

            //   {/* Grupo 6: Phone */}
            //   <div className={classWrapperInput}>
            //     <InputComponent
            //       label="Phone"
            //       name="phone"
            //       type="tel"
            //       placeholder="850465234"
            //       onChange={(event: ChangeEvent<HTMLInputElement>) =>
            //         handleChangeManual({
            //           event,
            //           setFieldTouched: formik.setFieldTouched,
            //           setFieldValue: formik.setFieldValue,
            //         })
            //       }
            //     />
            //   </div>
            // </Form>

            /* realizando el mapeo */
            <Form className="flex flex-col gap-4 py-6 px-6 bg-gray-100 rounded-lg w-full sm:max-w-[550px]">
              {inputGroupsForm.map((group, index) => (
                <div
                  key={index + "-" + group[0].name}
                  className="flex flex-col sm:flex-row justify-evenly gap-6 w-full"
                >
                  {group.map((field) => (
                    <InputComponent
                      key={field.name}
                      label={field.label}
                      name={field.name}
                      type={field.type}
                      placeholder={field.placeholder}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleChangeManual({
                          event,
                          setFieldTouched: formik.setFieldTouched,
                          setFieldValue: formik.setFieldValue,
                        })
                      }
                    />
                  ))}
                </div>
              ))}
            </Form>
          );
        }}
      </Formik>
    </>
  );
};
