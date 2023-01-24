import React, { useRef, useState } from 'react';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import CheckButton from "react-validation/build/button";
import AuthService from '../services/auth.service';
import { isEmail } from "validator";


const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const validEmail = (value) => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                This is not a valid email.
            </div>
        );
    }
};

const vusername = (value) => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                The username must be between 3 and 20 characters.
            </div>
        );
    }
};

const vpassword = (value) => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                The password must be between 6 and 40 characters.
            </div>
        );
    }
};

const RegisterPage = () => {

    const form = useRef();
    const checkBtn = useRef();
    const [username, setUsername] = useState("");
    const [emailID, setEmailID] = useState("");
    const [roles, setRole] = useState("");
    const [password, setPassword] = useState("");
    const [succesful, setSuccesful] = useState(false);
    const [message, setMessage] = useState("");
    const roleList = [
        { id: "user", roleLabel: "User" },
        { id: "moderator", roleLabel: "Moderator" },
        { id: "admin", roleLabel: "Admin" }
    ]

    const onUsernameChange = (e) => setUsername(e.target.value);
    const onEmailChange = (e) => setEmailID(e.target.value);
    const onRoleChange = (e) => {
        console.log("OnRoleChange value", e.target.value)
        if (e.target.value === "moderator") {
            let arr = ["user"]
            arr.unshift(e.target.value);
            console.log("ARRRR",arr)
            setRole([...arr]);
        }
        else {
            setRole([e.target.value]);
        }
    }
    const onPasswordChange = (e) => setPassword(e.target.value);

    const handleRegister = (e) => {
        e.preventDefault();
        setMessage("");
        setSuccesful(false);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            AuthService.register(username, emailID, roles, password).then(
                (response) => {
                    setMessage(response.data.message);
                    setSuccesful(true);
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    setMessage(resMessage);
                    setSuccesful(false);
                }
            );
        }
    }

    return (
        <div className="col-md-12">
            <div className="card card-container">
                <img
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className="profile-img-card"
                />
                <Form ref={form} onSubmit={handleRegister}>
                    {!succesful && (<div>
                        <div className='form-group'>
                            <label htmlFor='username'>Username</label>
                            <Input
                                type="text"
                                className="form-control"
                                name="username"
                                value={username}
                                onChange={onUsernameChange}
                                validations={[required, vusername]}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='emailID'>Email</label>
                            <Input
                                type="text"
                                className="form-control"
                                name="emailID"
                                value={emailID}
                                onChange={onEmailChange}
                                validations={[required, validEmail]}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='roles'>Role</label>
                            <Select
                                className="form-control"
                                name="roles"
                                // value={roles}
                                onChange={onRoleChange}
                                validations={[required]}
                            >
                                <option value="" style={{display : "none"}}></option>
                                {roleList.map((role)=>{
                                    return <option value = {role.id}>{role.roleLabel}</option>
                                })}
                                {/* <option value="user">User</option>
                                <option value="moderator">Moderator</option>
                                <option value="admin">Admin</option> */}
                            </Select>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='password'>Password</label>
                            <Input
                                type="password"
                                className="form-control"
                                name="password"
                                value={password}
                                onChange={onPasswordChange}
                                validations={[required, vpassword]}
                            />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary btn-block">Sign Up</button>
                        </div>
                    </div>)}
                    {message && (
                        <div className="form-group">
                            <div
                                className={succesful ? "alert alert-success" : "alert alert-danger"}
                                role="alert"
                            >
                                {message}
                            </div>
                        </div>
                    )}
                    <CheckButton style={{ display: "none" }} ref={checkBtn} />
                </Form>
            </div >
        </div >
    )
}

export default RegisterPage