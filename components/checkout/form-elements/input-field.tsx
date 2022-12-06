import { ChangeEventHandler } from 'react';
import { IInputField } from '../../../interfaces/order.interface';
import Error from '../error';
import Abbr from './abbr';


const InputField = ({
  handleOnChange = () => null,
  inputValue = '',
  name = '',
  type = 'text',
  label = '',
  errors = {},
  placeholder = '',
  required = false,
  containerClassNames = '',
  isShipping,
}: IInputField) => {
  const inputId = `${name}-${isShipping ? 'shipping' : ''}`;

  return (
    <div className={containerClassNames}>
      <label htmlFor={inputId} className="text-sm leading-7 text-gray-700">
        {label || ''}
        <Abbr required={required} />
      </label>
      <input
        type={type}
        onChange={handleOnChange}
        value={inputValue}
        placeholder={placeholder}
        name={name}
        className="w-full rounded border border-gray-500 bg-gray-100 bg-opacity-50 py-1 px-3 text-base leading-8 text-gray-800 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200"
        id={inputId}
      />
      <Error errors={errors} fieldName={name} />
    </div>
  );
};

export default InputField;
