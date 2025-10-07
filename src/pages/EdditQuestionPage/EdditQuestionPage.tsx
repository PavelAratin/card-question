// import cls from "./EdditQuestionPage.module.css";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { API_URL } from "../../constants";
import { useEffect, useState } from "react";
import { Loader } from "../../components/Loader/Loader";
import EditQuestion from "./EditQuestion/EditQuestion";
import { QuestionsType } from "../../types/types";

const EdditQuestionPage = () => {
  const { id } = useParams<{ id: string }>();
  const [question, setQuestion] = useState<QuestionsType | null>(null);

  const [fetchQuestion, isQuestionLoad] = useFetch(async (): Promise<void> => {
    const response = await fetch(`${API_URL}/react/${id}`);
    const data = await response.json();
    setQuestion(data);
  });

  useEffect(() => {
    fetchQuestion();
  }, []);
  return (
    <>
      {isQuestionLoad && <Loader></Loader>}
      {question && <EditQuestion initialState={question}></EditQuestion>}
    </>
  );
};

export default EdditQuestionPage;
