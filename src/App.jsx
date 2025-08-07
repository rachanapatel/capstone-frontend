import { useState } from 'react'
import './App.css'
import Header from './scenes/global/Header';
import Sidebar from './scenes/global/Sidebar';
import { Routes, Route } from "react-router-dom";
import Dashboard from './scenes/dashboard';
import Team from './scenes/team';


function App() {
  const [isSidebar, setIsSidebar] = useState(true);  

  return (
    // <>
    // <Header></Header>
    // {/* <Header/> */}
    // <Sidebar isSidebar={isSidebar} />
    // <Routes>
    //   <Route path="/dash" element={<Dashboard />} />
    //   <Route path="/team" element={<Team />} />
    //   <Route path="/calendar" element={<Dashboard />} />
    // </Routes>
    // </>
    <div className="app">
      <Header />
      <div className="app-layout">
        {isSidebar && <Sidebar isSidebar={isSidebar} />}
        <main className="main-content">
          <Routes>
            <Route path="/dash" element={<Dashboard />} />
            <Route path="/team" element={<Team />} />
            <Route path="/calendar" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App


