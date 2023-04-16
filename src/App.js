import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import BaseScreen from './screen/BaseScreen';
import HomeScreen from './screen/HomeScreen';
import LoadingScreen from './screen/LoadingScreen';

const OrganizationScreen = lazy(() => import('./screen/OrganizationScreen'));
const BuildingScreen = lazy(() => import('./screen/BuildingScreen'));
const RoomScreen = lazy(() => import('./screen/RoomScreen'));
const ErrorScreen = lazy(() => import('./screen/ErrorScreen'));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<BaseScreen />}>
          <Route index element={<HomeScreen />}/>
          <Route path='organization/:id' element={
            <Suspense fallback={<LoadingScreen />}>
              <OrganizationScreen />
            </Suspense>
          }/>
          <Route path='building/:id' element={
            <Suspense fallback={<LoadingScreen />}>
              <BuildingScreen />
            </Suspense>
          }/>
          <Route path='room/:id' element={
            <Suspense fallback={<LoadingScreen />}>
              <RoomScreen />
            </Suspense>
          }/>
          <Route path='*' element={
            <Suspense fallback={<LoadingScreen />}>
              <ErrorScreen />
            </Suspense>
          }/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
