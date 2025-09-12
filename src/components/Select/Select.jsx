import React from "react";
import cls from "./Select.module.css";

export const Select = (props) => {
  return (
    <select
      name={props.name}
      className={cls.select}
      value={props.value}
      onChange={props.onChange}>
      {props.options?.map((option, index) => {
        return (
          <React.Fragment key={index}>
            <option value={option.value} disabled={option.disabled}>
              {option.text}
            </option>
            {index === 0 ? <hr /> : ""}
          </React.Fragment>
        );
      })}
    </select>
  );
};
