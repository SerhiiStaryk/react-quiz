import React from 'react'
import classes from './active-quiz.module.css';
import AnswersList from './answers-list/answers-list';

const ActiveQuiz = (props) => {
  return (
    <div className={classes.activeQuiz}>
      <p className={classes.question}>
        <span>
          <strong>{props.answerNumber}.</strong>&nbsp;
          {props.question}
        </span>
        <small>{props.answerNumber} out of {props.quizLength}</small>
      </p>

      <AnswersList
        answers={props.answers}
        onAnswerClick={props.onAnswerClick}
        state={props.state}
      />
    </div>
  )
}

export default ActiveQuiz
