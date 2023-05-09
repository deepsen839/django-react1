import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Button, Form } from "react-bootstrap";
function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const { registerUser } = useContext(AuthContext);

  const handleSubmit = async e => {
    e.preventDefault();
    registerUser(username, password, password2);
  };

  return (
    <section>
       <Form onSubmit={handleSubmit} className="mt-4">
       <h1>Register</h1>
        <hr />
        <div>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label> User Name</Form.Label>
                <Form.Control
                  type="text"
                  id="username"
                  onChange={e => setUsername(e.target.value)}
                  placeholder="Username"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label> Password </Form.Label>
                <Form.Control
                 type="password"
                 id="password"
                 onChange={e => setPassword(e.target.value)}
                 placeholder="Password"
                 required
                />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Confirm Password </Form.Label>
                <Form.Control
                 type="password"
                 id="confirm-password"
                 onChange={e => setPassword2(e.target.value)}
                 placeholder="Confirm Password"
                 required
                />
                </Form.Group>
                <p>{password2 !== password ? "Passwords do not match" : ""}</p>
                <div className="float-right">
                <Button
                  variant="primary"
                  type="submit"
                  onClick={handleSubmit}
                  className="mx-2"
                >
                  Save
                </Button>
                </div>
              
                </div>
                </Form>
    </section>
  );
}

export default Register;