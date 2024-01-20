import { Routes, Route } from "react-router-dom";
import Navbar from './navbar';
import Home from "./home"
import Cv from "./cv";
import Table from "./table";
import About from './about';
import GeneralConditions from './general_conditions';
import ScrollToTop from './scrollToTop';
import Contact from './contact';
import Certificats from './certificats';
import { SignUp } from "./signUp";

export const Router = () => {
    return (

        <ScrollToTop>
            <Routes>
                <Route path='/' element={<Navbar />}>
                    <Route index element={<Home />} />
                    <Route path='cv' element={<Cv />} />
                    <Route path='table' element={<Table />} />
                    <Route path='about' element={<About />} />
                    <Route path='general_conditions' element={<GeneralConditions />} />
                    <Route path='contact' element={<Contact />} />
                    <Route path='certificats' element={<Certificats />} />
                    <Route path="signUp" element={<SignUp/>}/>
                </Route>
            </Routes>
        </ScrollToTop>

    )
}