import './App.css';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Add from './Add';
import Delete from './Delete';
import Update from './Update';

function App() {
  return (
      <Router>
                <div className="container">
                   <div className="lnk">
                      <Link className='link' to="/Add">Add Cookbook</Link>
                      <Link className='link' to="/Delete">Delete Cookbook</Link>
                      <Link className='link' to="/Update">Update Cookbook</Link>
                      <Link className='link' to="/Filter">Filter Cookbook</Link>
                    </div>

                    <div className="results">
                
                      <Switch>
                        <Route exact path="/Add"> <Add /></Route>
                        <Route exact path="/Delete"><Delete /></Route>
                        <Route exact path="/Update:id"><Update /></Route>
                        <Route exact path="/Filter"><Update /></Route>
                    </Switch>
                
                    </div>
                </div>
      </Router>
  );
}

export default App;

