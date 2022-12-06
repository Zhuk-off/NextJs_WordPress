interface ICheckboxFieldProps {
  handleOnChange: any;
  checked: boolean;
  name: string;
  label: string;
  placeholder?: string;
  containerClassNames: string;
}

const CheckboxField = ({
  handleOnChange = () => null,
  checked = false,
  name = '',
  label = '',
  placeholder = '',
  containerClassNames = '',
}: ICheckboxFieldProps) => {
  return (
    <div className={containerClassNames}>
      <label
        className="text-md flex cursor-pointer items-center leading-7 text-gray-700"
        htmlFor={name}
      >
        <input
          onChange={handleOnChange}
          placeholder={placeholder}
          type="checkbox"
          checked={checked}
          name={name}
          id={name}
        />
        <span className="ml-2">{label || ''}</span>
      </label>
    </div>
  );
};

export default CheckboxField;
