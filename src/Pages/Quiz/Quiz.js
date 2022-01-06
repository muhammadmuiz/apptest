import { CircularProgress } from "@material-ui/core";
import { useEffect, useState } from "react";
import Question from "../../components/Question/Question";
import "./Quiz.css";

const Quiz = ({ quiz_name, question, marks, setmarks, setquestion }) => {
  const [options, setOptions] = useState();
  const [currentQuestion, setcurrentQuestion] = useState(0);

  useEffect(() => {
    setOptions(
      question &&
        handleShuffle([
          question[currentQuestion]?.correct_answer,
          ...question[currentQuestion]?.incorrect_answers,
        ])
    );
  }, [currentQuestion, question]);

  const handleShuffle = (options) => {
    return options.sort(() => Math.random() - 0.5);
  };

  const DeleteQuiz = (id) => {
    try {
      axios.delete(`http://localhost:3000/teacher/quiz/${id}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div classquiz_name="quiz">
      <span classquiz_name="quizInfo">Hi there, {quiz_name}</span>
      {question ? (
        <>
          <div classquiz_name="quizDetails">
            <span>{question[currentQuestion].category}</span>
            <span>mark : {marks}</span>
          </div>
          <Question
            currentQuestion={currentQuestion}
            setcurrentQuestion={setcurrentQuestion}
            question={question}
            options={options}
            correct={question[currentQuestion]?.correct_answer}
            marks={marks}
            setmarks={setmarks}
            setquestion={setquestion}
          />
        </>
      ) : (
        <CircularProgress
          style={{ margin: 100 }}
          color="inherit"
          size={165}
          thickness={1}
        />
      )}
    </div>
  );
};

export default Quiz;
