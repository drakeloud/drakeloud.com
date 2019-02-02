import "bootstrap/dist/css/bootstrap.css";

import React from "react";
import { Link } from "gatsby";
import { Nav, Navbar, NavItem, Container } from "react-bootstrap";

export default ({ children }: any) => (
    <div className="app">
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">DrakeLoud.com</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/about">About Me</Nav.Link>
                <Nav.Link href="/contact">Contact</Nav.Link>
                <Nav.Link href="/blog">Blog</Nav.Link>
            </Nav>
        </Navbar>
        <Container>{children}</Container>
    </div>
);
