interface InputComponentProps {
  labelText: string;
  inputName: string;
  inputType?: string;
  placeholderInput: string;
}

export const InputComponent = ({
  labelText,
  inputName,
  inputType = "text",
  placeholderInput,
}: InputComponentProps) => {
  return (
    <div className="w-full">
      <label
        htmlFor={inputName}
        className="block text-sm font-medium text-gray-700"
      >
        {labelText}
      </label>

      <input
        type={inputType}
        id={inputName}
        name={inputName}
        placeholder={placeholderInput}
        className="mt-1 block w-full rounded-md shadow-sm p-2 sm:text-sm outline-none"
        required
      />
    </div>
  );
};
