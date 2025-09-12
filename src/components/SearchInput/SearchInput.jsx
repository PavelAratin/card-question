import { SearchIcon } from "../icons";
import cls from "./searchInput.module.css";

export const SearchInput = ({ value, onChange }) => {
  return (
    <div className={cls.inputContainer}>
      <label htmlFor="inputId">
        <SearchIcon className={cls.searchIcon}></SearchIcon>
      </label>
      <input
        className={cls.input}
        type="text"
        id="inputId"
        placeholder="search.."
        value={value}
        onChange={onChange}></input>
    </div>
  );
};
