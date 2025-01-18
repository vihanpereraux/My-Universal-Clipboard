import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// firebase config
import { collection, addDoc, getDocs } from "firebase/firestore";
import { getFirebaseConfig } from "../config/FirebaseConfig";
const db = getFirebaseConfig();

// props
import { RegisterAuthProps, LoginErrorProps } from "../interfaces/props";

const Register: React.FC = () => {
    let detailsSnaphot = { devicename: "", username: "", password: "" }
    const [formDetails, setFormDetails] = useState<RegisterAuthProps>(detailsSnaphot);

    let errorSnapshot: LoginErrorProps = { isError: false, error: "no_error" }
    const [error, setError] = useState<LoginErrorProps>(errorSnapshot)

    const navigate = useNavigate()

    const handleDetails = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.id === "device_name") {
            detailsSnaphot.devicename = event.target.value;
            setFormDetails(detailsSnaphot);
        }
        else if (event.target.id === "username") {
            detailsSnaphot.username = event.target.value;
            setFormDetails(detailsSnaphot);
        }
        else {
            detailsSnaphot.password = event.target.value;
            setFormDetails(detailsSnaphot);
        }
    }

    const handleSubmit = async () => {
        // check existing records
        const querySnaphot = await getDocs(collection(db, "my_devices"));
        const items: any[] = querySnaphot.docs.map(doc => ({ id: doc.id, ...doc.data() }))


        console.log(items.some(item => (item.username === formDetails.username)))
        console.log(items.some(item => (item.devicename === formDetails.devicename)))

        const isUsernameFound = items.some(item => (item.username === formDetails.username))
        const isDevicenameFound = items.some(item => (item.devicename === formDetails.devicename))

        if (isUsernameFound || isDevicenameFound) {
            errorSnapshot.isError = true;
            errorSnapshot.error = "user already existing in the system";
            setError({ ...errorSnapshot });
            console.log('same user found');
        }
        else {
            console.log(formDetails)
            try {
                let newItem: RegisterAuthProps = formDetails
                await addDoc(collection(db, "my_devices"), { newItem })
                console.log(`Document is written to the db`)
                // 
                navigate('/')
            } catch (error) {
                console.log(`Error occured - ${error}`)
            }
        }
    }

    return (
        <>
            <input
                placeholder="Enter Device Name"
                type="text"
                name=""
                onChange={handleDetails}
                id="device_name" />

            <input
                placeholder="Enter Username"
                type="text"
                name=""
                onChange={handleDetails}
                id="username" />

            <input
                placeholder="Enter Password"
                type="password"
                name=""
                onChange={handleDetails}
                id="password" />

            <button onClick={handleSubmit}>Register</button>

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

export default Register