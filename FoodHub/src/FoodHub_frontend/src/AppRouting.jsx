import { BrowserRouter, Route, Routes } from "react-router-dom";
import PublicHeader from "./components/PublicHeader";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";

const App = () => {


  return(
    <>
      <BrowserRouter>
        <PublicHeader/>
        <Routes>
          <Route path="/" index element={<HomePage/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );

}

export default App;