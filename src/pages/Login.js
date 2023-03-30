import Form from "react-bootstrap/Form";
import styles from "../styles/Login.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { createUser } from "@/components/RegisterSlice";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";
function Login() {
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      router.push("/");
    }
  }, [router]);
  const { email, loading, error } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
     
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
     
      email: Yup.string().email("Invalid email address").required("Required"),
     
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
      let user = {
        email: values.email,
        password: values.password,
      };
      localStorage.setItem("user", JSON.stringify(user));
      dispatch(createUser(user));
      router.push("/");
    },
    
  });
  return (
    <>
      <div className={styles.main}>
        <h1 style={{ textAlign: "center", fontSize: "2rem", color: "white" }}>
          Login Form
        </h1>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmaill">
            
           
          
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

          <Form.Group className="mb-3" controlId="formBasicPasswordd">
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
          <Link href='/Reset'><p>Forget Password?</p></Link>
          <p style={{ color: "white" }}>
            Don't have an account?{" "}
            <Link href="/RegistrationForm">
              <button
                style={{
                  backgroundColor: "rgb(52, 73, 94)",
                  borderRadius: "50px",
                  border: "none",
                  padding: "5px 20px 5px 20px",
                  color: "white",
                }}
              >
                Get Register
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
                login
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

export default Login;
