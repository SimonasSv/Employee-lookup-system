import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './bulma.css';
import List from "./components/List.js";
import Add from "./components/Add.js";
import Edit from "./components/Edit.js";
 
function App() {
  return (
    <Router>
    <div className="container">
      <div className="columns">
        <div className="column is-half is-offset-one-quarter">
          <Routes>
            <Route exact path="/" element={<List/>}/>
            <Route exact path="/add" element={<Add/>}/>
            <Route exact path="/edit/:id" element={<Edit/>}/>
          </Routes>
        </div>
      </div>
    </div>
    </Router>
  );
}
 
export default App;