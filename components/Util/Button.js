import React from 'react';

function Button(props) {
  const { label, color, onClick, disabled, extraClasses } = props
  const designColor = `border-${color}-500 bg-${color}-200 hover:bg-${color}-300`
  const disabledColor = 'bg-gray-200 border-gray-300 hover:bg-gray-300'

  return (
    <button
      className={`p-2 m-1 px-4 w-36 rounded-md border-2 transition-all ${disabled ? disabledColor : designColor} ${extraClasses}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}

export default Button;