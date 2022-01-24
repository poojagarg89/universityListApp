import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './components/loginForm/LoginForm';
import RegisterForm from './components/loginForm/RegisterForm';
import ErrorHandleComponent from './components/errorHandleComponent/ErrorHandleComponent';
import Home from './components/home/Home';
import { Provider } from 'react-redux';
import Store from './store/Store';
import SubscriptionComponent from './components/subscription/SubscriptionComponent';

function App() {
  const urlPath = window.location.pathname;
  let isFlag = 0;
  if (urlPath === '/register' || urlPath === '/login' || urlPath === '/' || urlPath === '/subscription') {
    isFlag = 1;
  }
  return (
    <div className="App">
      <Provider store={Store}>
        <BrowserRouter>
          {isFlag === 1 ? (
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/subscription" element={<SubscriptionComponent />} />
            </Routes>
          ) : (
            <Routes>
              <Route path={urlPath} element={<ErrorHandleComponent />} />
            </Routes>
          )}
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
