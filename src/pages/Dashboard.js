import { useEffect } from "react";
import { useRouter } from "next/router";
import React from 'react';
import { Container, Row, Col, Button, Navbar, Nav } from 'react-bootstrap';
const Dashboard = () => {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/Login");
    }
  }, [router]);
  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("Login");
  };
  

  return (
    <div>
    


    <Container fluid>
      <Row>
        <Col md={2} className="bg-light">
          <Navbar className="flex-column" expand="md" variant="light">
            <Navbar.Brand > MentorG8</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="flex-column">
                <Nav.Link href="#">Dashboard</Nav.Link>
                <Nav.Link href="#">user</Nav.Link>
                <Nav.Link href="#">catagory</Nav.Link>
                <Nav.Link href="#">blog</Nav.Link>
                <Nav.Link href="#">video</Nav.Link>
                <Nav.Link href="#">podcast</Nav.Link>
                <Nav.Link href="#">episod</Nav.Link>


              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Col>
       
      </Row>
    </Container>


      <button onClick={handleLogout}> log out</button>
    </div>
  );
};

export default Dashboard;
