import "./App.css";
import Addblog from "./Components/Addblog";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Allblogs from "./Components/Allblogs";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Blog from "./Components/Blog";
import Admin from "./Components/Admin";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
	return (
		<div className=''>
			<BrowserRouter>
				<Header></Header>
				<Routes>
					<Route exact path='/' element={<Allblogs />} />
					<Route exact path='/addblog' element={<Addblog />} />
					<Route exact path='/login' element={<Login />} />
					<Route exact path='/register' element={<Register />} />
					<Route exact path='/admin' element={<Admin />} />

					<Route exact path='/article/:id' element={<Blog />} />
				</Routes>
				<Footer></Footer>
			</BrowserRouter>
		</div>
	);
}

export default App;
