import { Route, Routes } from 'react-router-dom';
import Quiz from './containers/quiz/quiz';
import Layout from './hoc/Layout/Layout';
import QuizCreator from './containers/quiz-creator/quiz-creator';
import Auth from './containers/auth/auth';
import QuizList from './containers/quiz-list/quiz-list';


const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path='/auth' Component={Auth} />
        <Route path='/quiz-creator' Component={QuizCreator} />
        <Route path='/quiz/:id' Component={Quiz} />
        <Route path='/' Component={QuizList} exact />
      </Routes>
    </Layout>
  );
}

export default App;
