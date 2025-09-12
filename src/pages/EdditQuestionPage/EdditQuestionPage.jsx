// import cls from "./EdditQuestionPage.module.css";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { API_URL } from "../../constants";
import { useEffect, useState } from "react";
import { Loader } from "../../components/Loader/Loader";
import EditQuestion from "./EditQuestion/EditQuestion";

const EdditQuestionPage = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [fetchQuestion, isQuestionLoad] = useFetch(async () => {
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
