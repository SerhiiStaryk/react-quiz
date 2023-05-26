import React from 'react'
import classes from './active-quiz.module.css';
import AnswersList from './answers-list/answers-list';

const ActiveQuiz = (props) => {
  return (
    <div className={classes.activeQuiz}>
      <p className={classes.question}>
        <span>
          <strong>4.</strong>&nbsp;
          {props.question}
        </span>
        <small>4 out of 12</small>
      </p>

      <AnswersList
        answers={props.answers}
        onAnswerClick={props.onAnswerClick}
      />
    </div>
  )
}

export default ActiveQuiz
