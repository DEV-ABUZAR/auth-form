import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/Reset.module.css'


function Reset() {
  const formik = useFormik({
    initialValues: {
      
      email: '',
      password :'',
      
    },
    validationSchema: Yup.object({
     
      email: Yup.string().email('Invalid email address')
        .required('Required'),
     
      password: Yup.string()
        .min(8, 'Must be at least 8 characters')
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
          "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
        )
        .required('Required'),
       
    }),
    validateOnChange: true,
    
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <>
    
    <div className={styles.main}>
    <h1 style={{textAlign: "center", fontSize: "2rem", color:'white'}}>Reset Password</h1>

    <Form onSubmit={formik.handleSubmit}> 
      
      <Form.Group className="mb-3" controlId="Login">
     
    
      <Form.Label style={{ color: "#333", fontWeight: "500", fontSize: "1.2rem", marginBottom: "0.5rem", color:'white' }}>Email</Form.Label>
        <Form.Control type="email" placeholder="Enter email"  name="email" value={formik.values.email} onChange={formik.handleChange} />
        <div  style={{ color: "red" }}>{formik.touched.email && formik.errors.email}</div>

        
      </Form.Group>

     
      
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </div>
    </>
   
  )
}

export default Reset;