import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './components/Header';
import Indonesia from './pages/Indonesia';
import Programming from './pages/Programming';
import Saved from './pages/Saved';
import Search from './pages/Search';



function App() {

  return (
    <>
    <Header />

        <Routes>
          <Route path="/" element={<Indonesia />} />
          <Route path="/programming" element={<Programming />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/search" element={<Search />} />
        </Routes>
    </>
  );
}

export default App;
