import cls from "./HomePage.module.css";
import { useState, useEffect, useMemo, useRef } from "react";
import {
  API_URL,
  OPTIONS_COUNT_VALUE,
  OPTIONS_SORT_VALUE,
} from "../../constants";
import { QuestionCardList } from "../../components/QuestionCardList/QuestionCardList";
import { Loader } from "../../components/Loader";
import { useFetch } from "../../hooks/useFetch";
import { SearchInput } from "../../components/SearchInput";
// import { Button } from "../../components/Button";
import { Select } from "../../components/Select/Select";
import { Paginations } from "../../components/Paginations";

const DEFAULT_PER_PAGE = 10;

export const HomePage = () => {
  const [searchParams, setSearchParams] = useState(
    `?_page=1&_per_page=${DEFAULT_PER_PAGE}`
  );
  const [questions, setQuestions] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [sortSelectValue, setSortSelectValue] = useState("");
  const [countSelectValue, setCountSelectValue] = useState("");
  const controlsContainerRef = useRef();

  const [getQuestion, isLoading, error] = useFetch(async (url) => {
    const response = await fetch(`${API_URL}/${url}`);
    const questionsData = await response.json();
    setQuestions(questionsData);
    return questionsData;
  });

  // const getActivePageNumber = () => {
  //   return questions.next === null ? questions.last : questions.next - 1;
  // };

  const cards = useMemo(() => {
    if (questions?.data) {
      if (searchValue.trim()) {
        return questions.data.filter((data) => {
          return data.question
            .toLowerCase()
            .includes(searchValue.trim().toLowerCase());
        });
      } else {
        return questions.data;
      }
    }
    return [];
  }, [questions, searchValue]);

  const pagination = useMemo(() => {
    const totalCardsCount = questions?.pages || 0;
    return Array(totalCardsCount)
      .fill(0)
      .map((_, index) => {
        return index + 1;
      });
  }, [questions]);

  useEffect(() => {
    getQuestion(`react${searchParams}`);
  }, [searchParams]);

  const onSearchHandler = (e) => {
    setSearchValue(e.target.value);
  };
  const onSortSelectChangeHandler = (e) => {
    setSortSelectValue(e.target.value);
    setSearchParams(`?_page=1&_per_page=${countSelectValue}&${e.target.value}`);
  };
  const paginationHandler = (e) => {
    if (e.target.tagName === "BUTTON") {
      setSearchParams(
        `?_page=${e.target.textContent}&_per_page=${countSelectValue}&${sortSelectValue}`
      );
      controlsContainerRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  };
  const onCountSelectValueHandler = (e) => {
    setCountSelectValue(e.target.value);
    setSearchParams(`?_page=1&_per_page=${e.target.value}&${sortSelectValue}`);
  };

  return (
    <>
      <div className={cls.controlsContainer} ref={controlsContainerRef}>
        <SearchInput
          value={searchValue}
          onChange={onSearchHandler}></SearchInput>
        <Select
          value={sortSelectValue}
          onChange={onSortSelectChangeHandler}
          options={OPTIONS_SORT_VALUE}></Select>
        <Select
          value={countSelectValue}
          onChange={onCountSelectValueHandler}
          options={OPTIONS_COUNT_VALUE}></Select>
      </div>
      {isLoading && <Loader></Loader>}
      {error && <p>{error}</p>}
      <QuestionCardList cards={cards}></QuestionCardList>
      {cards.length === 0 ? (
        <p className={cls.noCardsInfo}>No Cards...</p>
      ) : (
        pagination.length > 1 && (
          <Paginations
            onClick={paginationHandler}
            pagination={pagination}
            questions={questions}></Paginations>
          // <div className={cls.paginationContainer} onClick={paginationHandler}>
          //   {pagination.map((value) => {
          //     return (
          //       <Button key={value} isActive={value === getActivePageNumber()}>
          //         {value}
          //       </Button>
          //     );
          //   })}
          // </div>
        )
      )}
    </>
  );
};
