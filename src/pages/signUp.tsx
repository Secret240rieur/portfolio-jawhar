import { Formik, Form, Field } from 'formik';
import { collection } from "firebase/firestore";
import { auth, firestore } from "../App";
import { useAuthCreateUserWithEmailAndPassword } from '@react-query-firebase/auth';
import { Link } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useFirestoreCollectionMutation } from '@react-query-firebase/firestore';
import { useEffect, useState } from 'react';
import { SignUpGoogle } from './signUpGoogle';

export const SignUp = () => {
    //google auth
    const provider = new GoogleAuthProvider();
    //email auth
    const createEmailPass = useAuthCreateUserWithEmailAndPassword(auth);
    //store firebase
    const ref = collection(firestore, "SignUpInfo");
    const storeSignUpInfo = useFirestoreCollectionMutation(ref);


    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

    //localStorage
    const [isSignedIn, setSignedIn] = useState(JSON.parse(localStorage.getItem('is-signedIn')!) || false);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        localStorage.setItem('is-signedIn', JSON.stringify(isSignedIn))
    })

    return (
        <div id="flex justify-center flex-col">


            <div className="flex justify-center flex-col my-24 mx-auto w-1/2 bg-[#A2DFCB] min-w-fit p-20 rounded-[20px]">

                <h1 className="mb-2 font-bold text-3xl flex justify-center ">Sign Up Now</h1>
                <div className='w-[300px] mx-auto mt-[30px]'>                <SignUpGoogle />               </div>
                <div className="flex justify-center text-2xl form">


                    <Formik
                        initialValues={{ name: '', email: '', password: '' }}
                        validate={values => {
                            const errors: { email: string, name: string, password: string } = {
                                email: "",
                                name: "",
                                password: ''
                            };

                            if (!values.email) {
                                errors.email = 'Required';

                            }
                            else if (
                                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
                            ) {
                                errors.email = 'Invalid email address';
                            }
                            if (!values.name) {
                                errors.name = 'Required';

                            } if (!values.password) {
                                errors.password = 'Required';
                            }
                            document.getElementById('errorEmail')!.innerHTML = errors.email;
                            document.getElementById('errorPassword')!.innerHTML = errors.password;
                            document.getElementById('errorName')!.innerHTML = errors.name;
                            setHasError(!!errors.email.length || !!errors.name.length || !!errors.password.length);
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            setTimeout(() => {
                                setSubmitting(false);
                            }, 400);

                            if (!hasError) {
                                createEmailPass.mutate({
                                    email: values.email,
                                    password: values.password

                                });
                                storeSignUpInfo.mutate({
                                    name: values.name,
                                    email: values.email,
                                    password: values.password
                                })
                            }
                            setHasError(false);


                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form className="flex justify-center flex-col w-full">

                                <span className="mb-[50px]">


                                    <p>Name </p>
                                    <Field type="text" name="name" id="name" className="w-full" placeholder="Enter your name" />
                                    <span id='errorName'></span>

                                </span>
                                <span className="mb-[50px]">

                                    <p >Enter your email</p>
                                    <Field type="text" name="email" id="email" className="w-full" placeholder="Enter your email" />
                                    <span id='errorEmail'></span>
                                </span>
                                <span className="mb-[50px]">

                                    <p >Enter your password</p>
                                    <Field type="text" name="password" id="password" className="w-full" placeholder="Enter your password" />
                                    <span id='errorPassword'></span>
                                </span>

                                <button className="flex  mx-auto submit py-[10px] px-[20px] mt-[50px] rounded-[30px]" type="submit" disabled={isSubmitting} >
                                    SUBMIT
                                </button>
                                <span className='flex justify-center mt-[20px]'>

                                    <span>Already have an account?</span>
                                    <Link to='/'>Log in</Link>
                                </span>
                            </Form>
                        )}
                    </Formik>

                </div>


            </div>
        </div>)
}