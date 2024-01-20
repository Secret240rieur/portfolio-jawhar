import { Outlet, Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useContext, useEffect, useRef, useState } from "react";
import "./navbar.css";
import { auth, EmailContext } from "../App";
import { useAuthSignInWithEmailAndPassword, useAuthSignOut } from "@react-query-firebase/auth";
import { Field, Form, Formik, FormikHelpers, FormikValues } from "formik";
import { SignUpGoogle } from "./signUpGoogle";


const Navbar = () => {
    const email = useContext(EmailContext)

    const navRef = useRef<HTMLElement>(null);

    let action = false;
    const reloadPage = () => {
        window.location.reload()
        action = false;
    }

    const showNavbar = () => {
        navRef.current?.classList.toggle("responsive_nav");
        hideElement();
    }

    const mutation = useAuthSignInWithEmailAndPassword(auth, {
        onError(error) {
            console.log(error)

        },
        onSuccess() {
            console.log('logged')
            localStorage.setItem('is-signedIn', JSON.stringify(true));
            setSignedIn(true);
        }
    });

    //localStorage
    const [isSignedIn, setSignedIn] = useState(JSON.parse(localStorage.getItem('is-signedIn')!) || false);


    console.log('signed out: ' + !isSignedIn);
    if (action) reloadPage();


    const [visible, setVisible] = useState(false);  // visibility state

    const showElement = () => {
        visible ? setVisible(false) : setVisible(true);
    }
    const hideElement = () => setVisible(false);
    const logOut = useAuthSignOut(auth);
    const signOut = () => {
        localStorage.setItem('is-signedIn', JSON.stringify(false));
        logOut.mutate();

    }


    return (
        <>
            <header>
                <h3 style={{ "color": "aquamarine" }}>MyWebsite</h3>
                <nav ref={navRef}>
                    <Link to="/" onClick={showNavbar}>Home</Link>
                    <Link to="/cv" onClick={showNavbar}>Cv</Link>
                    <Link to="/table" onClick={showNavbar}>Study</Link>
                    <Link to="/contact" onClick={showNavbar}>Contact</Link>
                    <button title="closeNavbar" className="nav-btn nav-close-btn" onClick={showNavbar}>
                        <FaTimes />
                    </button>
                </nav>
                <div className="flex">
                    {!email && <button onClick={showElement} className="flex items-center text-[black] font-bold hover:text-teal-900 hover:bg-teal-300 bg-[aquamarine] px-[20px] rounded-[30px]">Login</button>}
                    {email && <button type="submit" onClick={signOut} className="flex items-center text-[black] font-bold hover:text-teal-900 hover:bg-teal-300 bg-[aquamarine] px-[20px] rounded-[30px]">Logout</button>}
                    <div className="absolute w-fit right-[10px] top-[73px]">
                        {!email && visible && <nav className=" opacity-80">
                            <div className="border-b-[#A2DFCB] w-0 h-0 border-x-[10px] border-b-[20px] border-x-transparent border-y-transparent absolute right-[100px] -mt-3"></div>
                            <div className="bg-[#A2DFCB] w-[400px] p-[30px] flex flex-col rounded-[20px] mt-[20px]">
                                <h1 className="font-bold mb-[20px]">Login</h1>
                                <SignUpGoogle />
                                <p className="mx-auto mt-[30px]">or</p>
                                <Formik
                                    initialValues={{ email: '', password: '' }}
                                    validate={values => {
                                        const errors: { email: string, password: string } = {
                                            email: "",
                                            password: ""
                                        };
                                        if (!values.email) {
                                            errors.email = 'Required';
                                        } if (!values.password) {
                                            errors.password = 'Required';
                                        }
                                        document.getElementById('errorEmail')!.innerHTML = errors.email;
                                        document.getElementById('errorPassword')!.innerHTML = errors.password;

                                    }}
                                    onSubmit={(values) => {

                                        mutation.mutate({ email: values.email, password: values.password });

                                    }}
                                >
                                    {() => (
                                        <Form>
                                            <Field name='email' className="w-full" placeholder="Login/Email" />
                                            <span id="errorEmail"></span>
                                            <Field name='password' placeholder="Password" className="w-full" />
                                            <span id="errorPassword"></span>
                                            <button className="flex flex-row-reverse font-bold mt-[10px]">Forgot Password?</button>
                                            <div className="flex flex-row justify-center w-fit  items-center mx-auto">
                                                <button type='submit' className="flex font-bold mx-auto bg-[aquamarine] py-[10px] px-[20px] mt-[50px] rounded-[30px] mr-[10px]  hover:text-teal-900 hover:bg-teal-300" disabled={mutation.isLoading} >
                                                    Sign In
                                                </button>
                                                <button onClick={hideElement} className="flex font-bold mx-auto bg-[aquamarine] py-[10px] px-[20px] mt-[50px] rounded-[30px]  hover:text-teal-900 hover:bg-teal-300" >
                                                    Cancel
                                                </button>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                                {mutation.isError && <span className="mx-auto mt-[20px]">Unable to login - check your password or email</span>}
                                <div className="flex border-t-[3px] border-black pt-[20px] mt-[20px] w-full justify-center">
                                    <span>Dont have an account? </span>
                                    <Link onClick={hideElement} to='/signUp' className='m-0 ml-[10px] text-black hover:text-black'>Create one now</Link>
                                </div>


                            </div>
                        </nav>}
                    </div>
                    <button className="nav-btn" onClick={showNavbar}>
                        <FaBars />
                    </button>
                </div>
            </header>



            <Outlet />
        </>
    )
};
export default Navbar;