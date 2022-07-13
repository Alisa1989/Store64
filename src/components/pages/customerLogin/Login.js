import { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { connect } from "react-redux";
import { addCustomer } from "./../../../state/actions/customerActions";
import { getCart } from "../../../state/actions/cartActions";

const Login = (props) => {
  const [formState, setFormState] = useState({
    email: "JD92@yahoo.com",
    password: "password"
  });

  const [errors, setErrors] = useState({
    email: "",
    password: ""
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

  const login = (e) => {
    e.preventDefault();

    axios
    // .post("http://localhost:4000/customers/login",  formState, {withCredentials: true})
    .post("https://store64-backend.herokuapp.com/customers/login",  formState, {withCredentials: true})
    // .then(res => {setPost(res.data);
      .then((res) => {

        console.log(res.data);

        let jwt = res.data.token
        var decodedToken = jwt_decode(jwt);
        
        sessionStorage.setItem('customerID', decodedToken.customerID);
        sessionStorage.setItem('token', jwt);
        props.getCart(sessionStorage.getItem("customerID"));
        // props.addCustomer(res.data.customer);
        setFormState({
            email: "",
            password: "",
        });
    })
    .catch((err) => console.log(err.response));
};

  const inputChange = (e) => {
    e.persist();
    console.log("input changed!", e.target.value);
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
  });

  useEffect(() => {
    formSchema.isValid(formState).then((isValid) => {
      setButtonDisabled(!isValid);
    });
  }, [formState, formSchema]);

  return (
    <form onSubmit={login}>
      <h1> Log In </h1>
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
      <button className="btn btn-blue" disabled={buttonDisabled}>Submit</button>
      {/* <pre>{JSON.stringify(post, null, 2)}</pre> */}
    </form>
  );
};



const mapStateToProps = (state) => {
    return {
      state: state,
    };
  };
  
  const mapDispatchToProps = {
    addCustomer,
    getCart
  };
  
export default connect(mapStateToProps, mapDispatchToProps)(Login);