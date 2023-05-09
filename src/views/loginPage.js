import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Button, Form } from "react-bootstrap";

const LoginPage = () => {
  const { loginUser } = useContext(AuthContext);
  const handleSubmit = e => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    username.length > 0 && loginUser(username, password);
  };

  return (
    <section>
      
      <Form onSubmit={handleSubmit} className="mt-4">
       <h1>Register</h1>
        <hr />
        <div>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label> User Name</Form.Label>
                <Form.Control type="text" id="username" placeholder="Enter Username"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label> User Name</Form.Label>
                <Form.Control
                 type="password" id="password" placeholder="Enter Password"
                />
                </Form.Group>
                <div className="float-right">
                <Button
                  variant="primary"
                  type="submit"
                  className="mx-2"
                >
                  Save
                </Button>

                </div>

              </div>
              </Form>
    </section>
  );
};

export default LoginPage;