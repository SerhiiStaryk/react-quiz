import classes from './answers-list.module.css';
import AnswerItem from './answer-item/answer-item';

const AnswersList = props => {
  return (
    <ul className={classes.answersList}>
      {props.answers.map((item, index) => (
        <AnswerItem
          key={index}
          answer={item}
          onAnswerClick={props.onAnswerClick}
        />
      ))}
    </ul>
  )
}

export default AnswersList