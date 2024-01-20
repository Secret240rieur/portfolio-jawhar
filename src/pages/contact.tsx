import React, { useState } from "react";
import "./contact.css";
import Navbardown from "./navbardown";
import { Formik, Form, Field } from "formik";
import { CustomCommentBox } from "./comment";
import { useFirestoreCollectionMutation } from "@react-query-firebase/firestore";
import { collection } from "firebase/firestore";
import { firestore } from "../App";
import { Wrapper, Status } from "@googlemaps/react-wrapper";

const Contact = () => {
  const ref = collection(firestore, "contacts");
  const mutation = useFirestoreCollectionMutation(ref);
  const render = (status: Status) => {
    return <h1>{status}</h1>;
  };
  const [hasError, setHasError] = useState(false);

  return (
    <div>
      {/* <h1 className="text-center font-bold my-24">Connect with me</h1> */}
      <div className="flex justify-center border-2 border-black">
        <div className=" flex justify-center flex-col my-24 mx-2 w-1/2 bg-[#A2DFCB] min-w-fit p-20 rounded-[20px]">
          <h1 className="mb-2 font-bold text-3xl ">GET IN TOUCH</h1>
          <div
            style={{ fontSize: "3svw" }}
            className="flex justify-center form"
          >
            <Formik
              initialValues={{ name: "", email: "", phone: "", comment: "" }}
              validate={(values) => {
                const errors: { email: string; name: string; phone: string } = {
                  email: "",
                  name: "",
                  phone: "",
                };
                if (!values.email) {
                  errors.email = "Required";
                  setHasError(true);
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
                    values.email
                  )
                ) {
                  errors.email = "Invalid email address";
                  setHasError(true);
                }
                if (!values.name) {
                  errors.name = "Required";
                  setHasError(true);
                }
                if (!values.phone) {
                  errors.phone = "Required";
                  setHasError(true);
                }
                document.getElementById("errorEmail")!.innerHTML = errors.email;
                document.getElementById("errorPhone")!.innerHTML = errors.phone;
                document.getElementById("errorName")!.innerHTML = errors.name;
              }}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  setSubmitting(false);
                }, 400);
                if (!hasError) {
                  mutation.mutate({
                    name: values.name,
                    email: values.email,
                    phone: values.phone,
                    comment: values.comment,
                  });
                  values.name = "";
                  values.email = "";
                  values.phone = "";
                  values.comment = "";
                }
                setHasError(false);
              }}
            >
              {({ isSubmitting }) => (
                <Form className="flex justify-center flex-col w-full">
                  <span className="flex flex-wrap gap-5 justify-between mb-[50px]">
                    <span className="flex flex-col">
                      <p>Tell us your name </p>
                      <Field
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Enter your name"
                      />
                      <span id="errorName"></span>
                    </span>
                    <span className="flex flex-col">
                      <p>Your phone number</p>
                      <Field
                        type="tel"
                        name="phone"
                        id="phone"
                        placeholder="Enter your phone number"
                      />
                      <span id="errorPhone"></span>
                    </span>
                  </span>
                  <span className="mb-[50px]">
                    <p>Enter your email</p>
                    <Field
                      type="text"
                      name="email"
                      id="email"
                      className="w-full"
                      placeholder="Enter your email"
                    />
                    <span id="errorEmail"></span>
                  </span>
                  <span className="InfoPerso">
                    <p>Message </p>
                    <div className="flex justify-center">
                      <CustomCommentBox name="comment" />
                    </div>
                  </span>

                  <button
                    className="flex  mx-auto submit py-[10px] px-[20px] mt-[50px] rounded-[30px]"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    SUBMIT
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      {/* <div className="map">
        <p>
          2000 Rue Sainte-CatherineO, <br />
          Montréal, QC H3H 2T3
        </p>
      </div> */}

      <Navbardown />
    </div>
  );
};

export default Contact;
