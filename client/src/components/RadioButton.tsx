import React, { useState } from 'react';

type RadioButtonProps = {
  options: string[];
};
const RadioButton: React.FC<RadioButtonProps> = (props) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSelectedOption(event.target.value);
  };

  return (
    <>
      {props?.options?.map((props, index) => (
        <React.Fragment key={`RadioButtonOption${index}`}>
          <label className="flex flex-row gap-3 items-center">
            <input
              type="radio"
              value={props}
              checked={selectedOption === props}
              onChange={handleOptionChange}
            />
            {props}
          </label>
        </React.Fragment>
      ))}
    </>
  );
};

export default RadioButton;
