import React, { memo, useState } from "react";
import "./input.css";

function TextInput({
  visible,
  value,
  type,
  label,
  mask,
  id,
  definition,
  sourceList,
  setValue,
}) {
  const [error, setError] = useState(false);
  if (!visible) return null;
  const validate = (e) => {
    setError(!!mask && !mask.test(e.target.value));
  };
  return (
    <span className={`input input--haruki ${value && "input--filled"}`}>
      {type === "select" ? (
        <select id={id} onChange={(e) => setValue(e.target.value)}>
          {sourceList.map((s) => {
            const label = typeof s === "object" ? s.name : s;
            const value = typeof s === "object" ? s.code : s;
            return <option key={value} label={label} value={value} />;
          })}
        </select>
      ) : (
        <input
          id={id}
          type={type}
          // placeholder={definition}
          onChange={(e) => setValue(e.target.value)}
          onBlur={validate}
          className="input__field input__field--haruki"
        />
      )}
      <label htmlFor={id} className="input__label input__label--haruki">
        <span className="input__label-content input__label-content--haruki">
          {label}
        </span>
      </label>
      {error && <p>Invalid</p>}
    </span>
  );
}

export default memo(TextInput);
