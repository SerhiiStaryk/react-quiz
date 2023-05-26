import React, { Component } from 'react';
import classes from './quiz.module.css';
import ActiveQuiz from '../../components/active-quiz/active-quiz';

class Quiz extends Component {
  state = {
    activeQuestion: 0,
    quiz: [
      {
        question: 'What is color sky?',
        answers: [
          { text: 'red', id: 1 },
          { text: 'black', id: 2 },
          { text: 'blue', id: 3 },
          { text: 'green', id: 4 },
        ],
        rightAnswerId: 3
      }
    ]
  }

  onAnswerClickHandler = (answerId) => {
    console.log('answerId', answerId)
  }
  render() {
    return (
      <div className={classes.quiz}>
        <div className={classes.quizWrapper}>
          <h1>Give answers on all questions</h1>
          <ActiveQuiz
            question={this.state.quiz[0].question}
            answers={this.state.quiz[0].answers}
            onAnswerClick={this.onAnswerClickHandler}
            quizLength={this.state.quiz.length}
            answerNumber={this.state.activeQuestion + 1}
          />
        </div>
      </div>
    )
  }
}

export default Quiz;
