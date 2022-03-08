import styles from "../styles/Home.module.css";
import { Form } from "react-bootstrap";
import logo from "../public/logo.jpg"

const SignIn = () => {
  return (
    <div className={styles.SignIn}>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Email Address </Form.Label>
          <Form.Control type="email" placeholder="name@example.com" />
        </Form.Group>
      </Form>
      <div>
        <img src={logo} />
      </div>
    </div>
  );
};

export default SignIn;
