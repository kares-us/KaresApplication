import React from 'react';

function Checkbox(props) {
  const { checked, onChange } = props

  return (
    <div
      className={`flex-shrink-0 w-6 h-6 border border-black rounded-md cursor-pointer ${checked ? 'bg-blue-400' : 'bg-transparent'}`}
      onClick={() => onChange(!checked)}
    />
  );
}

export default Checkbox;