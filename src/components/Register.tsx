import React, { useState } from "react";

// firebase config
import { collection, addDoc } from "firebase/firestore";
import { getFirebaseConfig } from "../config/FirebaseConfig";
const db = getFirebaseConfig();

// props
import { RegisterAuthProps } from "../interfaces/props";

const Register: React.FC = () => {

    let detailsSnaphot = { devicename: "", username: "", password: "" }
    const [formDetails, setFormDetails] = useState<RegisterAuthProps>(detailsSnaphot)

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
        let newItem: RegisterAuthProps = formDetails
        try {
            await addDoc(collection(db, "my_devices"), { ...newItem })
            console.log(`Document is written to the db`)
        } catch (error) {
            console.log(`Error occured - ${error}`)
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

        </>
    )
}

export default Register