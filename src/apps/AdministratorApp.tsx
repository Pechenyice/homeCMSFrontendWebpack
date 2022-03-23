import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CommonBaseRoutesInfo } from 'components';
import { Profile } from 'pages';

const AdministratorApp = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div>administrator mode</div>}>
          <Route path="profile" element={<Profile />} />
          <Route path="/login" element={<div>test</div>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AdministratorApp;
