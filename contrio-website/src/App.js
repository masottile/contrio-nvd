import React from 'react';
import Homepage from './pages/Homepage/Homepage';
import ContractsPage from './pages/ContractsPage';
import ProjectsPage from './pages/ProjectsPage';
import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import NavigationBar from './components/NavigationBar'

Amplify.configure(awsExports);

function App() {
  // const [user, setUser] = useState(null);

  return (
    <div className="App">
        <Router>
          <NavigationBar />
          <Routes>
            <Route path='/contracts' element={<ContractsPage />} />
            <Route path='/projects' element={<ProjectsPage />} />
            <Route exact path='/' element={<Homepage />} />
          </Routes>
        </Router>
    </div>
  );
}

export default withAuthenticator(App);
