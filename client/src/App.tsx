import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Home } from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import { UserInfo } from './pages/UserInfo';
import { SignUp } from './pages/SignUp';
import { SignIn } from './pages/SignIn';
import { LoginContextProvider } from './contexts/LoginContext';
import ProductOverview from './pages/ProductOverview';
import { Adverts } from './pages/Adverts';
import { SelectedTabContextProvider } from './contexts/SelectedTabContext';
import { About } from './pages/About';
import { ContactUs } from './pages/ContactUs';
import { NotFound } from './pages/NotFound';

function App() {
  return (
    <LoginContextProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/userInfo"
          element={
            <SelectedTabContextProvider>
              <UserInfo />
            </SelectedTabContextProvider>
          }
        />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/about" element={<About />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/productoverview/:id" element={<ProductOverview />} />
        <Route path="/adverts" element={<Adverts />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </LoginContextProvider>
  );
}

export default App;
