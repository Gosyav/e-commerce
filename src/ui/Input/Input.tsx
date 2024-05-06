import React from 'react';

type Props = {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  labelText: string;
  placeholder: string;
  error: string | undefined;
};

// eslint-disable-next-line react/display-name
export const Input: React.FC<Props> = React.memo(
  ({ value, onChange, labelText, error, placeholder }) => {
    return (
      <label className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <p className="font-medium">{labelText}</p>

          {error && <p className="text-sm text-color-eight">{error}</p>}
        </div>

        <input
          className="rounded border-2 px-2 py-2 focus:outline-none"
          type="text"
          onChange={onChange}
          value={value}
          placeholder={placeholder}
        />
      </label>
    );
  },
);
