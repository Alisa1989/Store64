import { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";

const SignUp = () => {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    address: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    address: "",
  });

  const validateChange = (e) => {
    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then((valid) => {
        setErrors({ ...errors, [e.target.name]: "" });
      })
      .catch((err) => {
        setErrors({ ...errors, [e.target.name]: err.errors[0] });
      });
  };

  const [buttonDisabled, setButtonDisabled] = useState(true);
//   const [post, setPost] = useState([]);

  const formSubmit = (e) => {
    e.preventDefault();
    console.log("form submitted!");
    // axios.post("http://localhost:4000/customers", formState)
    axios.post("https://store64-backend.herokuapp.com/customers", formState)
    // .then(res => {setPost(res.data);
    .then(res => {console.log(res.data);
    setFormState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        address: "",
    })
})
    .catch((err) => console.log(err.response));
  };

  const inputChange = (e) => {
    e.persist();
    // console.log("input changed!", e.target.value);
    const newFormData = {
      ...formState,
      [e.target.name]: e.target.value,
    };
    validateChange(e);
    setFormState(newFormData);
  };

  const formSchema = yup.object().shape({
    email: yup.string().email("must be a valid email").required(),
    password: yup
      .string()
      .required("password is required")
      .min(8, "password must be at least 8 characters"),
    firstName: yup.string().required("first name is required"),
    lastName: yup.string().required("last name is required"),
    dateOfBirth: yup.string().required("date of birth is required"),
    address: yup.string().required("address is required"),
  });

  useEffect(() => {
    formSchema.isValid(formState).then((isValid) => {
      setButtonDisabled(!isValid);
    });
  }, [formState, formSchema]);

  return (
    <form onSubmit={formSubmit}>
      <h1> Sign Up </h1>
      <label htmlFor="email">
        email
        <input
          id="email"
          type="text"
          name="email"
          placeholder="Input Email"
          value={formState.email ?? ""}
          onChange={inputChange}
        />
        {errors.email.length > 0 ? (
          <p className="error">{errors.email}</p>
        ) : null}
      </label>
      <label htmlFor="password">
        password
        <input
          id="password"
          type="password"
          name="password"
          placeholder="Input Password"
          value={formState.password ?? ""}
          onChange={inputChange}
        />
        {errors.password.length > 0 ? (
          <p className="error">{errors.password}</p>
        ) : null}
      </label>
      <label htmlFor="firstName">
        first name
        <input
          id="firstName"
          type="text"
          name="firstName"
          placeholder="Input first name"
          value={formState.firstName ?? ""}
          onChange={inputChange}
        />
        {errors.firstName.length > 0 ? (
          <p className="error">{errors.firstName}</p>
        ) : null}
      </label>
      <label htmlFor="lastName">
        last name
        <input
          id="lastName"
          type="text"
          name="lastName"
          placeholder="Input last name"
          value={formState.lastName ?? ""}
          onChange={inputChange}
        />
        {errors.lastName.length > 0 ? (
          <p className="error">{errors.lastName}</p>
        ) : null}
      </label>
      <label htmlFor="dateOfBirth">
        date of birth
        <input
          id="dateOfBirth"
          type="text"
          name="dateOfBirth"
          placeholder="Input date of birth"
          value={formState.dateOfBirth ?? ""}
          onChange={inputChange}
        />
        {errors.dateOfBirth.length > 0 ? (
          <p className="error">{errors.dateOfBirth}</p>
        ) : null}
      </label>
      <label htmlFor="address">
        address
        <input
          id="address"
          type="text"
          name="address"
          placeholder="Input address"
          value={formState.address ?? ""}
          onChange={inputChange}
        />
        {errors.address.length > 0 ? (
          <p className="error">{errors.address}</p>
        ) : null}
      </label>
      <button className="btn btn-blue" disabled={buttonDisabled}>Submit</button>
      {/* <pre>{JSON.stringify(post, null, 2)}</pre> */}
    </form>
  );
};

export default SignUp;
