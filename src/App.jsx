import { useState } from 'react'
import './App.css'
import Header from './scenes/global/Header';
import Sidebar from './scenes/global/Sidebar';
import { Routes, Route } from "react-router-dom";
import Dashboard from './scenes/dashboard';
import Team from './scenes/team';


function App() {
  const [count, setCount] = useState(0)
  const [isSidebar, setIsSidebar] = useState(true);  

  return (
    <>
    <Header></Header>
    {/* <Header/> */}
    <Sidebar isSidebar={isSidebar} />
    <Routes>
      <Route path="/dash" element={<Dashboard />} />
      <Route path="/team" element={<Team />} />
      {/* <Route path="/contacts" element={<Contacts />} /> */}
      {/* <Route path="/form" element={<Form />} /> */}
      <Route path="/calendar" element={<Dashboard />} />
    </Routes>

      {/* <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div> */}

    </>
  )
}

export default App


// import { useState } from "react";
// import { Routes, Route } from "react-router-dom";
// import Header from "./scenes/global/Header";
// import Sidebar from "./scenes/global/Sidebar";
// import Dashboard from "./scenes/dashboard";
// import Team from "./scenes/team";
// // import Invoices from "./scenes/invoices";
// // import Contacts from "./scenes/contacts";
// // import Form from "./scenes/form";
// import { CssBaseline, ThemeProvider } from "@mui/material";
// import { ColorModeContext, useMode } from "./theme";
// // import Calendar from "./scenes/calendar/calendar";

// function App() {
//   const [theme, colorMode] = useMode();
//   const [isSidebar, setIsSidebar] = useState(true);

//   return (
//     <ColorModeContext.Provider value={colorMode}>
//       <ThemeProvider theme={theme}>
//         <CssBaseline />
//         <div className="app">
//           <Sidebar isSidebar={isSidebar} />
//           <main className="content">
//             <Header setIsSidebar={setIsSidebar} />
//             <Routes>
//               <Route path="/" element={<Dashboard />} />
//               <Route path="/team" element={<Team />} />
//               {/* <Route path="/contacts" element={<Contacts />} /> */}
//               {/* <Route path="/invoices" element={<Invoices />} /> */}
//               {/* <Route path="/form" element={<Form />} /> */}
//               <Route path="/dashboard" element={<Calendar />} />
//             </Routes>
//           </main>
//         </div>
//       </ThemeProvider>
//     </ColorModeContext.Provider>
//   );
// }

// export default App;