import { Route, Router, Routes } from "react-router-dom"
// import CustomButton from "./components/CustomButton"
import DefaultLayout from "./layout/DefaultLayout"
import UsersPage from "./pages/AccessControl/UsersPage"
import MainPage from "./pages/MainPage"

function App() {
  return (
    <Routes>
      <Route path='/' element={<DefaultLayout />}>
        <Route index element={<MainPage />}></Route>
        <Route path="/users" element={<UsersPage />}></Route>
      </Route>
    </Routes>
  )
}

export default App
