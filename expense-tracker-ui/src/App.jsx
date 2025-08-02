import { BrowserRouter, Route, Routes } from "react-router-dom"
import { NavigationBar } from "./components/NavigationBar"
import { Dashboard } from "./components/Dashboard"
import { IncomeForm } from "./components/IncomeForm"
import { ExpenseForm } from "./components/ExpenseForm"
import { IncomeList } from "./components/IncomeList"
import { ExpenseList } from "./components/ExpenseList"
import { ToastContainer } from "react-toastify"
import { UserRegistration } from "./components/UserRegistration"
import { RenderNavigationBar } from "./components/RenderNavigationBar"
import { UserLogin } from "./components/UserLogin"
import { PrivateRoute } from "./components/PrivateRoute"
import Aboutus from "./components/AboutUs"
import Footer from "./components/Footer"
import ContactUs from "./components/Contact"

function App() {
  return (
    <>
    {/* <BrowserRouter>
    <Routes>
     <Route path="/aboutus" element={<Aboutus />} />
     
    </Routes>
    </BrowserRouter> */}
     
    <BrowserRouter>
      <RenderNavigationBar />
      <Routes>
        <Route path="/" element={<UserRegistration />} />
        <Route path="/login" element={<UserLogin />} />
        <Route element={<PrivateRoute/>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/income-form" element={<IncomeForm />} />
          <Route path="/expense-form" element={<ExpenseForm />} />
          <Route path="/income-list" element={<IncomeList />} />
          <Route path="/expense-list" element={<ExpenseList />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/contactus" element={<ContactUs />} />
          
        </Route>

      </Routes>
      <ToastContainer />
      
      <Footer/>
    </BrowserRouter>
    </>
  )
}

export default App
