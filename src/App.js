import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { lazy } from 'react';
import BaseScreen from './screen/BaseScreen';
import HomeScreen from './screen/HomeScreen';

const ErrorScreen = lazy(() => import('./screen/ErrorScreen'));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<BaseScreen />}>
          <Route index element={<HomeScreen />}/>
          <Route path='*' element={<ErrorScreen />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
