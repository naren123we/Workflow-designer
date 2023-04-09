
import './App.css';
import { BrowserRouter ,Routes,Route } from 'react-router-dom';
import Rootlayout from './layout/Rootlayout';
import Listpage from './pages/Listpage';
import Designer from './pages/Designer';

function App() {
  return (
 <BrowserRouter>
 <Routes>
  <Route path='/' element={<Rootlayout/>}>
<Route path='/' element={<Listpage />}/>
<Route path=':id' element={<Designer />} />

  </Route>
 </Routes>
 </BrowserRouter>
  );
}

export default App;
