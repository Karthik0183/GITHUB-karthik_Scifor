
import { BrowserRouter,Link,Route,Routes } from 'react-router-dom';
import './App.css';
  function Home(){
                return <h1>Home Page</h1>
                
            }
            function About(){
                 return <h1>About Page</h1>
            }
            function Contact(){
                 return <h1>Contact Page</h1>
            }
            function Navbar(){
                return(
                    <nav>
                        <Link to="/">Home</Link>
                        <Link to="/about">About</Link>
                        <Link to="/contact">Contact</Link>
                    </nav>
                )
            }
            function App(){
                return(
                    <BrowserRouter>
                        <Navbar/>
                        <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/about" element={<About/>}/>
                        <Route path="/contact" element={<Contact/>}/>
                        </Routes>
                    </BrowserRouter>    
                    )
            }

export default App;
