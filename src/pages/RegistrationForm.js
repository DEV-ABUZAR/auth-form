import Form from "react-bootstrap/Form";
import styles from "../styles/RegistrationForm.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { createUser } from "@/components/RegisterSlice";
import { useSelector } from "react-redux";
function BasicExample() {
  const { email, loading, error } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      username: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(10, "Must be 10 characters or less")
        .matches(/^[a-zA-Z]+$/, "Name must only contain letters")

        .required("Required"),
      lastName: Yup.string()
        .max(20, "Must be 20 characters or less")
        .matches(/^[a-zA-Z]+$/, "Name must only contain letters")

        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      username: Yup.string()
        .matches(/^[^\d]+$/, "Must not contain numbers")
        .required("Required"),
      password: Yup.string()
        .min(5, "Must be at least 5 characters")
        // .matches(
        //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        //   "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
        // )
        .required("Required"),
    }),
    validateOnChange: true,

    onSubmit: (values) => {
      const user = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        username: values.username,
      };
      localStorage.setItem("user", JSON.stringify(user));
      dispatch(createUser(user));
    },
  });
  return (
    <>
      <div className={styles.main}>
        <h1 style={{ textAlign: "center", fontSize: "2rem", color: "white" }}>
          Registration Form
        </h1>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <div className={styles.names}>
              <Form.Label
                style={{
                  color: "#333",
                  fontWeight: "500",
                  fontSize: "1.2rem",
                  marginBottom: "0.5rem",
                  color: "white",
                }}
              >
                First Name
              </Form.Label>

              <Form.Control
                type="text"
                placeholder="Enter First Name"
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange}
              />
              <div style={{ color: "red" }}>
                {formik.touched.firstName && formik.errors.firstName}
              </div>
              <Form.Label
                style={{
                  color: "#333",
                  fontWeight: "500",
                  fontSize: "1.2rem",
                  marginBottom: "0.5rem",
                  color: "white",
                }}
              >
                Last Name
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Last Name"
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
              />
              <div style={{ color: "red" }}>
                {formik.touched.lastName && formik.errors.lastName}
              </div>
            </div>
            <Form.Label
              style={{
                color: "#333",
                fontWeight: "500",
                fontSize: "1.2rem",
                marginBottom: "0.5rem",
                color: "white",
              }}
            >
              User Name
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter User Name"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
            />
            <div style={{ color: "red" }}>
              {formik.touched.username && formik.errors.username}
            </div>

            <Form.Label
              style={{
                color: "#333",
                fontWeight: "500",
                fontSize: "1.2rem",
                marginBottom: "0.5rem",
                color: "white",
              }}
            >
              Email
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            <div style={{ color: "red" }}>
              {formik.touched.email && formik.errors.email}
            </div>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label
              style={{
                color: "#333",
                fontWeight: "500",
                fontSize: "1.2rem",
                marginBottom: "0.5rem",
                color: "white",
              }}
            >
              Password
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            <div style={{ color: "red" }}>
              {formik.touched.password && formik.errors.password}
            </div>
          </Form.Group>
          <p style={{ color: "white" }}>
            Already have an account?{" "}
            <Link href="/Login">
              <button
                style={{
                  backgroundColor: "rgb(52, 73, 94)",
                  borderRadius: "50px",
                  border: "none",
                  padding: "5px 20px 5px 20px",
                  color: "white",
                }}
              >
                Login
              </button>
            </Link>
          </p>

          <div className="mb-3 mt-2">
            {loading ? (
              <div>
                <button type="submit" className="btn btn-primary w-100 ">
                  <div className="spinner-grow" role="status"></div>
                </button>
              </div>
            ) : (
              <button type="submit" className="btn btn-primary w-100 ">
                Register
              </button>
            )}
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {email && <p style={{ color: "green" }}>Successfull</p>}
        </Form>
      </div>
    </>
  );
}

export default BasicExample;
