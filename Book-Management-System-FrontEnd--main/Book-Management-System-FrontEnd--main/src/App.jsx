import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import AddBook from "./components/AddBooks";
import AllBooks from "./components/AllBooks";
import EditBookDetail from "./components/EditBookDetail";
import Contactus from "./components/Contactus";
import Services from "./components/Services";
import Signup from "./components/Authentication/Signup";
import Login from "./components/Authentication/Login";
import AllUser from "./components/UserDetail/AllUser";
import IssueReturnPanel from "./components/circulation/IssueReturnPanel";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header></Header>
      <div style={{marginTop : "60px"}}>
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-book" element={<AddBook />} />
          <Route path="/book-list" element={<AllBooks />} />
          <Route path="/contact-us" element={<Contactus />} />
          <Route path="/services" element={<Services />} />
          <Route path="/edit-books/:id" element={<EditBookDetail />} />
          <Route path="/issue-return" element={<IssueReturnPanel />} />
           <Route path="/signup" element={<Signup />} />
           <Route path="/login" element={<Login />} />
             <Route path="/all-users" element={<AllUser />} />
        </Routes>
      </div>
        <Footer></Footer>
      </BrowserRouter>
    </>
  );
}

export default App;
