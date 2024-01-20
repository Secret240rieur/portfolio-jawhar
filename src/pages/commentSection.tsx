import { useAuthUser } from "@react-query-firebase/auth";
import {
  useFirestoreCollectionMutation,
  useFirestoreQuery,
} from "@react-query-firebase/firestore";
import classNames from "classnames";
import { reload } from "firebase/auth";
import { collection, query } from "firebase/firestore";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { disconnect } from "process";
import { useContext, useEffect, useState } from "react";
import * as Yup from "yup";
import { auth, EmailContext, firestore } from "../App";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import { userIcon } from "./UserIcon";
import { IoMdSend } from "react-icons/io";

export const CommentSection = () => {
  const user = useAuthUser(["user"], auth);
  console.log(JSON.stringify(user.data));
  const email = useContext(EmailContext);
  const date1 = new Date(2022, 2, 19, 15, 57, 25);
  dayjs.extend(LocalizedFormat);
  const reloadPage = () => {
    window.location.reload();
  };
  const commentSchema = Yup.object().shape({
    comment: Yup.string().required("Ce champ est requis"),
  });

  const refUpload = collection(firestore, "comments");
  const storeComments = useFirestoreCollectionMutation(refUpload);
  if (storeComments.isSuccess) reloadPage();

  //access comments
  const refDownload = query(collection(firestore, "comments"));
  const downloadQuery = useFirestoreQuery(["comments"], refDownload);
  var counter = 0;
  downloadQuery.data?.docs.map(() => counter++);

  const logged = JSON.parse(localStorage.getItem("is-signedIn")!);
  console.log(logged);

  const abc = 10;
  return (
    <div className="flex flex-col justify-center my-[100px] mx-[20px] text-[20px]">
      <h1 className="font-bold border-black border-b-[3px] mb-[20px] pb-[10px]">
        {counter} Comments
      </h1>
      <div className="w-full">
        <Formik
          initialValues={{ comment: "" }}
          onSubmit={(values) => {
            storeComments.mutate({
              name: user.data?.email,
              comment: values.comment,
              date: Date(),
            });
          }}
          validationSchema={commentSchema}
        >
          {({ errors }) => (
            <Form>
              <div className="flex items-center bg-white p-4 rounded-[20px]">
                {/* <div className="flex justify-between w-full"> */}
                {userIcon(email, "[40px]", "[40px]")}
                <Field
                  name="comment"
                  className={inputStyle({
                    isSignedIn: !!email,
                    error: errors.comment,
                  })}
                  disabled={!email}
                  placeholder="you need to be connected to write a comment "
                />
                {/* </div> */}

                <button
                  type="submit"
                  className="flex-none items-center text-[black] font-bold hover:text-teal-900 hover:bg-teal-300 bg-[aquamarine] p-[10px] rounded-[30px]"
                >
                  {/* send */}
                  <IoMdSend />
                </button>
              </div>
              <p>{errors.comment}</p>
            </Form>
          )}
        </Formik>
        <div>
          {downloadQuery.data?.docs.map((value, i) => (
            <div key={i} className="flex flex-col ml-[40px]">
              <div className="flex ">
                {userIcon(value.data().name, "[40px]", "[40px]")}
                <p className="font-bold text-sm mx-[10px] my-auto">
                  {value.data().name}
                </p>
                <p className="text-xs flex justify-center my-auto">
                  {dayjs(value.data().date).format("L")}
                </p>
              </div>
              <p className="text-sm ml-[70px]">{value.data().comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const inputStyle = ({
  error,
  isSignedIn,
}: {
  error?: string;
  isSignedIn: boolean;
}) =>
  classNames("flex flex-grow mx-3", {
    "border-2 border-red-300": error,
    "bg-gray-600": !isSignedIn,
  });
