import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// firebase config
import { getDocs, collection } from "firebase/firestore";
import { getFirebaseConfig } from '../config/FirebaseConfig'
const db = getFirebaseConfig();

// props
import {
    LoginAuthProps,
    LoginErrorProps,
    AuthPageProps
} from "../interfaces/props";

// stylesheet
import Styles from './Auth.module.css';

const Login: React.FC<AuthPageProps> = ({ action }) => {
    const navigate = useNavigate();

    let detailsSnaphot = { username: "", password: "" }
    const [formDetails, setFormDetails] = useState<LoginAuthProps>(detailsSnaphot)
    let errorSnapshot: LoginErrorProps = { isError: false, error: "no_error" }
    const [error, setError] = useState<LoginErrorProps>(errorSnapshot)

    const handleDetails = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.id === "username") {
            detailsSnaphot.username = event.target.value;
            setFormDetails(detailsSnaphot);
        }
        else {
            detailsSnaphot.password = event.target.value;
            setFormDetails(detailsSnaphot);
        }
    }
    // submit handler
    const handleSubmit = async () => {
        if (detailsSnaphot.username.length > 0
            && detailsSnaphot.password.length > 0) {
            try {
                const querySnaphot = await getDocs(collection(db, "my_devices"));
                const items = querySnaphot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
                checkUser(items)
            } catch (error) {
                console.log(`Error occured - ${error}`)
            }
        }
        else {
            // validation handle 
            errorSnapshot.isError = true;
            errorSnapshot.error = "missing_details";
            setError({ ...errorSnapshot });
        }
    }

    // login handler
    const checkUser = (items: any[]) => {
        if (items.some(item => item.username === formDetails.username)) {
            // user found on username
            if (items.some(item => item.password === formDetails.password)) {
                localStorage.setItem('isAuthorized', JSON.stringify(true));
                localStorage.setItem('currentUser', JSON.stringify(formDetails.username));
                navigate('/');
            }
            else {
                // validation handle
                errorSnapshot.isError = true;
                errorSnapshot.error = "invalid password";
                setError({ ...errorSnapshot });
            }
        }
        else {
            // validation handle
            errorSnapshot.isError = true;
            errorSnapshot.error = "invalid username";
            setError({ ...errorSnapshot });
        }
    }

    return (
        <>
            <div className={Styles._form_wrapper}>
                <div className={Styles._form_element}>
                    <h3>[ {action} ]</h3>

                    <input
                        className={Styles._input}
                        placeholder="Enter Username"
                        type="text"
                        name=""
                        id="username"
                        required={true}
                        onChange={handleDetails} />

                    <br />

                    <input
                        className={Styles._input}
                        placeholder="Enter Password"
                        type="password"
                        name=""
                        id="password"
                        onChange={handleDetails} />

                    <br />

                    {localStorage.getItem('isAuthorized') === null ||
                        JSON.parse(localStorage.getItem('isAuthorized') as string) === false
                        ?
                        (
                            <button
                                disabled={false}
                                onClick={handleSubmit}>Login</button>
                        ) :
                        <button
                            disabled={true}
                            onClick={handleSubmit}>Login</button>
                    }

                    {error.isError ? (
                        <>
                            <div>
                                <small style={{ color: 'red' }}>{error.error}</small>
                            </div>
                        </>
                    ) :
                        null
                    }
                </div>
            </div>
        </>
    )
}

export default Login