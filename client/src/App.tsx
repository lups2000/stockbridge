import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { LoginContextProvider } from './contexts/LoginContext';
import Wrapper from './Wrapper';

function App() {
  return (
    <LoginContextProvider>
      <Wrapper />
    </LoginContextProvider>
  );
}

export default App;
