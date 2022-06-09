"use strict";

import Head from "next/head";
import styles from "../../styles/Home.module.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home(api) {
  // State for Suggestions Modal
  const [show, setShow] = useState(false);
  const modalClose = () => setShow(false);
  const modalShow = () => setShow(true);

  // Misc Functions
  function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  // Popup Handler
  async function handlePopup() {
    let res = await fetch(`http://localhost/api/v2?method=GET`);
    let api = await res.json();
    console.log(`[API REQUEST]`, api)
    toast(
        `🥺 You took an L because ${
          api[randomNumber(0, api.length - 1)]
        }.`,
        {
          position: "top-center",
          style: {
            background: "black",
            borderColor: "#728cd4",
            color: "white",
          },
        }
      );
  }

  // Return UI
  return (
    <div className={styles.container}>
      <Head>
        <title>L Bozo</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <span style={{ color: "#728cd4" }}>L Generator</span>
        </h1>

        <p className={styles.description}>
          Because everyone deserves to take an L.
        </p>

        <div className={styles.grid}>
          <button
            className={styles.card}
            style={{ borderColor: "#728cd4", color: "white" }}
            onClick={handlePopup}
          >
            Click Me!
          </button>
          <button
            className={styles.card}
            style={{ borderColor: "black", color: "white" }}
            onClick={modalShow}
          >
            Suggest L
          </button>
        </div>
      </main>

      <footer style={{ textAlign: "center" }}>
        <p>
          Created by <a href="https://github.com/dylanjamesdev"> Dylan James</a>
        </p>
      </footer>

      <Modal
        show={show}
        onHide={modalClose}
        backdrop="static"
        keyboard={false}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Submit an L</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          Woohoo, thanks for contributing!
          <Form action="/api/v2?method=POST" method="post">
            <Form.Group className="mb-3">
              <Form.Label>
                <br></br>Enter your L below, it should fit the format of{" "}
                <b>"You took an L because [your submission]"</b>.
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                id="suggestion"
                name="suggestion"
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <ToastContainer />
    </div>
  );  
}

