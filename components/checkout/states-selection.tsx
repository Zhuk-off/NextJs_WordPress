import { memo } from 'react';
import cx from 'classnames';

import Abbr from './form-elements/abbr';
import Error from './error';
import { IDefaultCustomerInfo } from '../../interfaces/order.interface';

interface IStateSelection {
  handleOnChange: any;
  input: IDefaultCustomerInfo;
  states: any;
  isFetchingStates: boolean;
  isShipping: boolean;
}

const StateSelection = ({
  handleOnChange = () => null,
  input = {},
  states = [],
  isFetchingStates = false,
  isShipping = true,
}: IStateSelection) => {
  const { state, errors } = input || {};

  const inputId = `state-${isShipping ? 'shipping' : 'billing'}`;

  if (isFetchingStates) {
    // Show loading component.
    return (
      <div className="mb-3">
        <label className="text-sm leading-7 text-gray-700">
          Штат/Округ
          <Abbr required />
        </label>
        <div className="relative w-full border-none">
          <select
            disabled
            value=""
            name="state"
            className="inline-block w-full appearance-none rounded border border-gray-500 bg-gray-100 bg-opacity-50 py-3 pl-3 pr-8 leading-tight text-gray-500 opacity-50"
          >
            <option value="">Loading...</option>
          </select>
        </div>
      </div>
    );
  }

  if (!states.length) {
    return null;
  }

  return (
    <div className="mb-3">
      <label className="text-sm leading-7 text-gray-600" htmlFor={inputId}>
        Штат/Округ
        <Abbr required />
      </label>
      <div className="relative w-full border-none">
        <select
          disabled={isFetchingStates}
          onChange={handleOnChange}
          value={state}
          name="state"
          className={cx(
            'inline-block w-full appearance-none rounded border border-gray-400 bg-gray-100 bg-opacity-50 py-3 pl-3 pr-8 leading-tight text-gray-500',
            { 'opacity-50': isFetchingStates }
          )}
          id={inputId}
        >
          <option value="">Выберите штат/округ...</option>
          {states.map((state, index) => (
            <option
              key={state?.stateCode ?? index}
              value={state?.stateName ?? ''}
            >
              {state?.stateName}
            </option>
          ))}
        </select>
      </div>
      <Error errors={errors} fieldName={'state'} />
    </div>
  );
};

export default memo(StateSelection);
