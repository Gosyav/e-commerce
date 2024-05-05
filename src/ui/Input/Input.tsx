import React from 'react';

type Props = {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  labelText: string;
};

// eslint-disable-next-line react/display-name
export const Input: React.FC<Props> = React.memo(
  ({ value, onChange, labelText }) => {
    return (
      <label className="flex flex-col gap-2">
        <p className="font-medium">{labelText}</p>
        <input className="py-2 px-2 border-2 rounded focus:outline-none" type="text" onChange={onChange} value={value} />
      </label>
    );
  },
);
