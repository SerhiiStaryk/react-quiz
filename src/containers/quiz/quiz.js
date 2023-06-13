import React, { Component } from 'react';
import classes from './quiz.module.css';
import ActiveQuiz from '../../components/active-quiz/active-quiz';
import FinishedQuiz from '../../components/finished-quiz/finished-quiz';

class Quiz extends Component {
  state = {
    results: {},
    isFinished: false,
    activeQuestion: 0,
    quiz: [
      {
        question: 'How old are you?',
        id: 1,
        answers: [
          { text: 'I have 27 years old', id: 1 },
          { text: 'I have 27 years', id: 2 },
          { text: 'I am fine', id: 3 },
          { text: 'I am 27 years old', id: 4 },
        ],
        rightAnswerId: 4,
      },
      {
        question: 'He went to the Stadium .....?',
        id: 2,
        answers: [
          { text: 'with taxi', id: 1 },
          { text: 'by taxi', id: 2 },
          { text: 'on taxi', id: 3 },
          { text: 'in taxi', id: 4 },
        ],
        rightAnswerId: 3,
      },
      {
        question: 'How long have you been living in London?',
        id: 3,
        answers: [
          { text: 'for 7 years', id: 1 },
          { text: 'at least 7 years', id: 2 },
          { text: 'since 7 years', id: 3 },
          { text: '7 years ago', id: 4 },
        ],
        rightAnswerId: 1,
      },
      // {
      //   question: 'We haven\'t got .....money.',
      //   id: 4,
      //   answers: [
      //     { text: 'a lot', id: 1 },
      //     { text: 'some', id: 2 },
      //     { text: 'any', id: 3 },
      //     { text: 'many', id: 4 },
      //   ],
      //   rightAnswerId: 3,
      // },
      // {
      //   question: 'Peter ..... fly to San Francisco tomorrow.',
      //   id: 5,
      //   answers: [
      //     { text: 'to going', id: 1 },
      //     { text: 'goes to', id: 2 },
      //     { text: 'is going to', id: 3 },
      //     { text: 'go to', id: 4 },
      //   ],
      //   rightAnswerId: 3,
      // },
      // {
      //   question: 'He plays soccer .....',
      //   id: 6,
      //   answers: [
      //     { text: 'on Wednesdays', id: 1 },
      //     { text: 'in Wednesdays', id: 2 },
      //     { text: 'at Wednesdays', id: 3 },
      //     { text: 'by Wednesdays', id: 4 },
      //   ],
      //   rightAnswerId: 1,
      // },
      // {
      //   question: '.... some more coffee',
      //   id: 7,
      //   answers: [
      //     { text: 'Do you', id: 1 },
      //     { text: 'Do you like', id: 2 },
      //     { text: 'You\'d like', id: 3 },
      //     { text: 'Would you like?', id: 4 },
      //   ],
      //   rightAnswerId: 4,
      // },
      // {
      //   question: 'I wanted a green shirt but they only had .....',
      //   id: 8,
      //   answers: [
      //     { text: 'a one white', id: 1 },
      //     { text: 'one white', id: 2 },
      //     { text: 'a white', id: 3 },
      //     { text: 'a white one', id: 4 },
      //   ],
      //   rightAnswerId: 4,
      // },
      // {
      //   question: 'He ..... never been to America.',
      //   id: 9,
      //   answers: [
      //     { text: 'does', id: 1 },
      //     { text: 'has', id: 2 },
      //     {
      //       text: 'haven\'t', id: 3
      //     },
      //     { text: 'hadn\'t', id: 4 },
      //   ],
      //   rightAnswerId: 2,
      // },
      // {
      //   question: 'The house was empty. There ..... there.',
      //   id: 10,
      //   answers: [
      //     { text: 'wasn\'t nobody', id: 1 },
      //     { text: 'was anybody', id: 2 },
      //     { text: 'was somebody', id: 3 },
      //     { text: 'was nobody', id: 4 },
      //   ],
      //   rightAnswerId: 4,
      // }
    ],
    answerState: null
  }

  onAnswerClickHandler = (answerId) => {
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0]
      if (this.state.answerState[key] === 'success') {
        return;
      }
    }
    const question = this.state.quiz[this.state.activeQuestion];
    const results = this.state.results;

    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) {
        results[question.id] = 'success';
      }
      this.setState({
        answerState: { [answerId]: 'success' },
        results,
      });
      const timeout = window.setTimeout(() => {
        if (this.isQuizFinished()) {
          this.setState({ isFinished: true });
        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null,
          })
        }
        window.clearTimeout(timeout)
      }, 1000)
    } else {
      results[question.id] = 'fail';

      this.setState({
        answerState: { [answerId]: 'fail' },
        results,
      });
    }
  }

  isQuizFinished() {
    return this.state.activeQuestion + 1 === this.state.quiz.length
  }

  retryHandler = () => {
    this.setState({
      activeQuestion: 0,
      answerState: null,
      isFinished: false,
      results: {}
    })

    console.log(this.state)
  }

  render() {
    return (
      <div className={classes.quiz}>
        <div className={classes.quizWrapper}>
          <h1>Give answers on all questions</h1>

          {
            this.state.isFinished
              ? <FinishedQuiz
                results={this.state.results}
                quiz={this.state.quiz}
                onRetry={this.retryHandler}
              />
              : <ActiveQuiz
                question={this.state.quiz[this.state.activeQuestion].question}
                answers={this.state.quiz[this.state.activeQuestion].answers}
                onAnswerClick={this.onAnswerClickHandler}
                quizLength={this.state.quiz.length}
                answerNumber={this.state.activeQuestion + 1}
                state={this.state.answerState}
              />
          }

        </div>
      </div>
    )
  }
}

export default Quiz;
