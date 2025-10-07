import React from "react";
import cls from "./Select.module.css";
import { OptionType } from "../../types/types";

interface SelectProps {
  name?: string | undefined;
  value?: string | undefined;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options?: OptionType[];
  id?: string | undefined;
  defaultValue?: string | undefined;
}

export const Select = (props: SelectProps) => {
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
