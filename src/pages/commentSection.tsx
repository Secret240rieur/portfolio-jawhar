import { useAuthUser } from "@react-query-firebase/auth";
import { useFirestoreCollectionMutation, useFirestoreQuery } from "@react-query-firebase/firestore";
import classNames from "classnames";
import { reload } from "firebase/auth";
import { collection, query } from "firebase/firestore";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { disconnect } from "process";
import { useContext, useEffect, useState } from "react";
import * as Yup from "yup";
import { auth, EmailContext, firestore } from "../App";

export const CommentSection = () => {
    const user = useAuthUser(["user"], auth);
    console.log(JSON.stringify(user.data))
    const email = useContext(EmailContext)




    const reloadPage = () => {
        window.location.reload()
    }
    const commentSchema = Yup.object().shape({
        comment: Yup.string().required('Ce champ est requis')
    })

    const refUpload = collection(firestore, "comments");
    const storeComments = useFirestoreCollectionMutation(refUpload);
    if (storeComments.isSuccess) reloadPage();


    //access comments
    const refDownload = query(collection(firestore, "comments"));
    const downloadQuery = useFirestoreQuery(['comments'], refDownload);
    var counter = 0;
    downloadQuery.data?.docs.map(() => (counter++));
    const userIcon = (email: string | null | undefined) => {
        return <div className={`flex flex-none items-center justify-center w-[50px]  h-[50px] rounded-full bg-gray-300`}>
            <span className="font-bold text-[30px]">{email ? email?.charAt(0).toUpperCase() :
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>


            }</span>

        </div>
    }
    const logged = JSON.parse(localStorage.getItem('is-signedIn')!);
    console.log(logged)

    const abc = 10;
    return (
        <div className="flex flex-col justify-center my-[100px] mx-[20px] text-[20px]">
            <h1 className="font-bold border-black border-b-[3px] mb-[20px] pb-[10px]">{counter} Comments</h1>
            <div className="w-full">
                <Formik
                    initialValues={{ comment: '' }}
                    onSubmit={(values) => {
                        storeComments.mutate({
                            name: user.data?.email,
                            comment: values.comment,
                            date: Date(),
                        }
                        )

                    }}
                    validationSchema={commentSchema}

                >
                    {({ errors }) => (
                        <Form  >
                            <div className="flex items-center justify-between bg-white p-4 rounded-[20px]">
                                {userIcon(email)}
                                <Field name="comment" className={inputStyle({
                                    isSignedIn: !!email,
                                    error: errors.comment
                                })}
                                    disabled={!email}
                                    placeholder='you need to be connected to write a comment ' />

                                <button type="submit" className="flex-none items-center text-[black] font-bold hover:text-teal-900 hover:bg-teal-300 bg-[aquamarine] px-[20px] rounded-[30px]">
                                    send
                                </button>
                            </div>
                            <p>{errors.comment}</p>
                        </Form>
                    )}
                </Formik>
                <div>
                    {
                        downloadQuery.data?.docs.map((value, i) => (
                            <div key={i} className='flex flex-col ml-[40px]'>
                                <div className="flex ">
                                    {userIcon(value.data().name)}
                                    <p className="font-bold mx-[10px] my-auto">{value.data().name}</p>
                                    <p className="text-[20px] flex justify-center my-auto">{value.data().date}</p>
                                </div>
                                <p className="ml-[70px]">{value.data().comment}</p>
                            </div>

                        ))
                    }
                </div>
            </div>
        </div>
    )
}

const inputStyle = ({ error, isSignedIn }: { error?: string, isSignedIn: boolean }) => classNames("flex flex-grow mx-8", {
    "border-2 border-red-300": error, "bg-gray-600": !isSignedIn
})