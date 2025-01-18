import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// firebase config
import { getDocs, collection } from "firebase/firestore";
import { getFirebaseConfig } from '../config/FirebaseConfig'
const db = getFirebaseConfig();

// props
import {
    LoginAuthProps,
    LoginErrorProps
} from "../interfaces/props";

const Login: React.FC = () => {
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
                console.log("d")
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
            <input
                placeholder="Enter Username"
                type="text"
                name=""
                id="username"
                required={true}
                onChange={handleDetails} />

            <input
                placeholder="Enter Password"
                type="password"
                name=""
                id="password"
                onChange={handleDetails} />

            <button onClick={handleSubmit}>Login</button>

            {error.isError ? (
                <>
                    <div>
                        <small style={{ color: 'red' }}>{error.error}</small>
                    </div>
                </>
            ) :
                null
            }

        </>
    )
}

export default Login