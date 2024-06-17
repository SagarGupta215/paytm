import "./App.css"
import { Routes, Route } from "react-router-dom"
import { Dashboard } from "./pages/Dashboard"
import { Signin } from "./pages/Signin"
import { Signup } from "./pages/Signup"
import { SendMoney } from "./pages/SendMoney"


export default function App() {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<Signup/>} />
        <Route path="/signin" element={<Signin/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/send" element={<SendMoney/>} />
      </Routes>
    </>
  )
}