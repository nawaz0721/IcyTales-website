import React from "react";

function Button({ text, css, icon, click }) {
  return (
    <button className={css}>
      {icon}
      {text}
      {click}
    </button>
  );
}

export default Button;
