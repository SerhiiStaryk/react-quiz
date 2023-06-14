import React, { Component } from 'react';
import Button from '../../components/UI/button/button';
import Input from '../../components/UI/input/input';
import Select from '../../components/UI/select/select';
import classes from './quiz-creator.module.css';
import { createControl, validate, validateForm } from '../../form/form-helper';
import Auxiliary from '../../hoc/auxiliary/auxiliary';

function createOptionControl(number) {
  return createControl({
    label: `Option ${number}`,
    errorMessage: 'The value can\'t be empty',
    id: number,
  }, { required: true })
}

function createFormControls() {
  return {
    question: createControl({
      label: 'Write question',
      errorMessage: 'The question can\'t be empty',
    }, { required: true }),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4),
  }
}

export default class QuizCreator extends Component {

  state = {
    quiz: [],
    isFormValid: false,
    rightAnswerId: 1,
    formControls: createFormControls(),
  }

  onSubmitHandler = e => {
    e.preventDefault();
  }

  addQuestionHandler = e => {
    e.preventDefault();

    const quiz = this.state.quiz.concat();
    const index = quiz.length + 1;

    const { question, option1, option2, option3, option4 } = this.state.formControls;

    const questionItem = {
      id: index,
      rightAnswerId: this.state.rightAnswerId,
      question: question.value,
      answers: [
        {
          text: option1.value,
          id: option1.id
        },
        {
          text: option2.value,
          id: option2.id
        },

        {
          text: option3.value,
          id: option3.id
        },
        {
          text: option4.value,
          id: option4.id
        },
      ]
    }

    quiz.push(questionItem)

    console.log(quiz)

    this.setState({
      quiz,
      isFormValid: false,
      rightAnswerId: 1,
      formControls: createFormControls(),
    })

    console.log(this.state)
  }

  createQuizHandler = e => {
    e.preventDefault();

    console.log(this.state.quiz)
  }

  changeHandler = (value, controlName) => {
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };

    control.touched = true;
    control.value = value;
    control.valid = validate(control.value, control.validation);

    formControls[controlName] = control;
    this.setState({
      formControls,
      isFormValid: validateForm(formControls)
    })
  }

  renderInputs = () => {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];

      return (
        <Auxiliary key={controlName + index}>
          <Input
            key={index}
            {...control}
            shouldValidate={!!control.validation
            }
            onChange={event => {
              this.changeHandler(event.target.value, controlName)
            }}
          />
          {index === 0 && <hr />}
        </Auxiliary>
      )
    })
  }

  selectChangeHandler = (event) => {
    this.setState({
      rightAnswerId: +event.target.value
    })
  }

  render() {
    const select = <Select
      label="select correct answer"
      value={this.state.rightAnswerId}
      onChange={this.selectChangeHandler}
      options={[
        { text: 1, value: 1 },
        { text: 2, value: 2 },
        { text: 3, value: 3 },
        { text: 4, value: 4 },
      ]}
    />

    return (
      <div className={classes.quizCreator}>
        <div>
          <h1>Create test</h1>

          <form onSubmit={this.onSubmitHandler}>

            {this.renderInputs()}
            {select}

            <Button
              type="primary"
              onClick={this.addQuestionHandler}
              disabled={!this.state.isFormValid}
            >
              add quiz
            </Button>

            <Button
              type='success'
              onClick={this.createQuizHandler}
              disabled={this.state.quiz.length === 0}
            >
              create test
            </Button>
          </form>
        </div>
      </div>
    )
  }
}