import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// firebase config
import { getDocs, collection } from "firebase/firestore";
import { getFirebaseConfig } from '../config/FirebaseConfig'
const db = getFirebaseConfig();

// props
import { LoginAuthProps } from "../interfaces/props";

const Login: React.FC = () => {
    const navigate = useNavigate();

    let detailsSnaphot = { username: "", password: "" }
    const [formDetails, setFormDetails] = useState<LoginAuthProps>(detailsSnaphot)

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
        detailsSnaphot.username.length > 0
            && detailsSnaphot.password.length > 0 ?
            console.log(formDetails)
            :
            console.log("missing")

        const querySnaphot = await getDocs(collection(db, "my_devices"));
        const items = querySnaphot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

        checkUser(items)
    }

    // login handler
    const checkUser = (items: any[]) => {
        if (items.map((item) => { item.username === formDetails.username })) {
            // user found
            items.map((user) => {
                if (user.username === formDetails.username
                    && user.password === formDetails.password) {
                    localStorage.setItem('isAuthorized', JSON.stringify(true))
                    console.log(`Found user is - ${formDetails.username} ${formDetails.password}`)
                }
            })
        }
        // redirecting to the home page
        navigate('/');
    }

    return (
        <>
            <input
                placeholder="Enter Username"
                type="text"
                name=""
                id="username"
                onChange={handleDetails} />

            <input
                placeholder="Enter Password"
                type="password"
                name=""
                id="password"
                onChange={handleDetails} />

            <button onClick={handleSubmit}>Login</button>
        </>
    )
}

export default Login