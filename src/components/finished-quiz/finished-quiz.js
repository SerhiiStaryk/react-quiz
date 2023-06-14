import { Link } from 'react-router-dom';
import Button from '../UI/button/button';
import classes from './finished-quiz.module.css';

const FinishedQuiz = props => {
  let successCount = Object.keys(props.results).reduce((total, key) => {
    if (props.results[key] === 'success') total++
    return total
  }, 0)

  return (
    <div className={classes.finishedQuiz}>
      <ul>
        {
          props.quiz.map((quizItem, index) => {
            const cls = [
              'fa',
              props.results[quizItem.id] === 'fail' ? 'fa-times' : 'fa-check',
              classes[props.results[quizItem.id]]
            ]
            return (
              <li
                key={index}
              >
                <strong>{index + 1}</strong>. &nbsp;
                {quizItem.question}
                <i className={cls.join(' ')} />
              </li>
            )
          })
        }
      </ul>

      <p>Success {successCount} out of {props.quiz.length}</p>

      <div>
        <Button
          onClick={props.onRetry}
          type="primary"
        >
          Repeat
        </Button>

        <Link to={'/'}>
          <Button
            type="success"
          >
            List of quizes
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default FinishedQuiz;