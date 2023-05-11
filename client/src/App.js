import { Route, Routes } from 'react-router-dom';
import Main from './pages/Main/Main';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main></Main>}></Route>
    </Routes>
  );
}

export default App;
