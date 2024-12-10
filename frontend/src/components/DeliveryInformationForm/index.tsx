import { InputComponent } from "../InputComponent";

const classWrapperInput =
  "flex flex-col sm:flex-row justify-evenly gap-6 w-full";

export const DeliveryInformationForm = () => {
  return (
    <form className="flex flex-col gap-4 py-6 px-6 bg-gray-100 rounded-lg w-full sm:max-w-[550px]">
      {/* Grupo 1: First Name, Last Name */}
      <div className={classWrapperInput}>
        <InputComponent
          labelText="First Name"
          inputName="firstName"
          inputType="text"
          placeholderInput="Ana Rouse"
        />

        <InputComponent
          labelText="Last Name"
          inputName="lastName"
          inputType="text"
          placeholderInput="Bart Zhon"
        />
      </div>

      {/* Grupo 2: Email */}
      <div className={classWrapperInput}>
        <InputComponent
          labelText="Email"
          inputName="email"
          inputType="email"
          placeholderInput="email@example.com"
        />
      </div>

      {/* Grupo 3: Street */}
      <div className={classWrapperInput}>
        <InputComponent
          labelText="Street"
          inputName="street"
          inputType="text"
          placeholderInput="Urb. Dot 504 - UX"
        />
      </div>

      {/* Grupo 4: City, State */}
      <div className={classWrapperInput}>
        <InputComponent
          labelText="City"
          inputName="city"
          inputType="text"
          placeholderInput="USA"
        />

        <InputComponent
          labelText="State"
          inputName="state"
          inputType="text"
          placeholderInput="California"
        />
      </div>

      {/* Grupo 5: Zipcode, Country */}
      <div className={classWrapperInput}>
        <InputComponent
          labelText="Zipcode"
          inputName="zipcode"
          inputType="text"
          placeholderInput="90001"
        />

        <InputComponent
          labelText="Country"
          inputName="country"
          inputType="text"
          placeholderInput="LA - Los Ángeles"
        />
      </div>

      {/* Grupo 6: Phone */}
      <div className={classWrapperInput}>
        <InputComponent
          labelText="Phone"
          inputName="phone"
          inputType="tel"
          placeholderInput="(555) 555-1234"
        />
      </div>
    </form>
  );
};
