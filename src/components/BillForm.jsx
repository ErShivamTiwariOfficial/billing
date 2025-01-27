import React, { useState, useEffect, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Invoice from "./Invoice";
import BillLook from "./BillLook";
import InputGroup from "react-bootstrap/InputGroup";

const BillForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currency] = useState("₹");
  const [currentDate] = useState(new Date().toLocaleDateString());
  const [currentTime] = useState(new Date().toLocaleTimeString());
  const [invoiceNumber, setInvoiceNumber] = useState(1);
  // const [dateOfIssue, setDateOfIssue] = useState("");
  const [billTo, setBillTo] = useState("");
  const [billToNumber, setBillToNumber] = useState("");
  const [billToAddress, setBillToAddress] = useState("");
  const [billFrom, setBillFrom] = useState("");
  const [billFromNumber, setBillFromNumber] = useState("");
  const [billFromAddress, setBillFromAddress] = useState("");
  const [notes, setNotes] = useState(
    "Thank you for doing business with us. Have a great day!"
  );
  const [total, setTotal] = useState("0");
  const [subTotal, setSubTotal] = useState("0");
  const [gstRate, setGstRate] = useState("");
  const [gstAmount, setGstAmount] = useState("0");
  const [discountRate, setDiscountRate] = useState("0");
  const [discountAmount, setDiscountAmount] = useState("0");

  const [items, setItems] = useState([
    {
      id: (+new Date() + Math.floor(Math.random() * 999999)).toString(36),
      name: "",
      description: "",
      price: "",
      quantity: "",
    },
  ]);

  const handleCalculateTotal = useCallback(() => {
    let newSubTotal = items
      .reduce((acc, item) => {
        return acc + parseFloat(item.price) * parseFloat(item.quantity);
      }, 0)
      .toFixed(2);

    let newgstAmount = (newSubTotal * (gstRate / 100)).toFixed(2);
    let newdiscountAmount = (newSubTotal * (discountRate / 100)).toFixed(2);
    let newTotal = (
      newSubTotal -
      newdiscountAmount +
      parseFloat(newgstAmount)
    ).toFixed(2);

    setSubTotal(newSubTotal);
    setGstAmount(newgstAmount);
    setDiscountAmount(newdiscountAmount);
    setTotal(newTotal);
  }, [items, gstRate, discountRate]);

  useEffect(() => {
    handleCalculateTotal();
  }, [handleCalculateTotal]);

  const handleRowDel = (item) => {
    const updatedItems = items.filter((i) => i.id !== item.id);
    setItems(updatedItems);
  };

  const handleAddEvent = () => {
    const id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    const newItem = {
      id,
      name: "",
      price: "0",
      description: "",
      quantity: 0,
    };
    setItems([...items, newItem]);
  };

  const onItemizedItemEdit = (evt) => {
    const { id, name, value } = evt.target;

    console.log(id, name, value);

    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, [name]: value } : item
    );
    setItems(updatedItems);
  };

  const handleChange = (setter) => (event) => {
    setter(event.target.value);
    handleCalculateTotal();
  };

  const openModal = (event) => {
    event.preventDefault();
    handleCalculateTotal();
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };  function CurrentTime() {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
      const intervalId = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);
  
      return () => clearInterval(intervalId);
    }, []);
  
    const formattedTime = Form(currentTime, 'hh:mm:ss a'); // Example format: 03:45:22 PM
  
    return (
      <div>
        Current Time: {formattedTime}
      </div>
    );
  }

  return (
    <Form onSubmit={openModal}>
      <Row>
        <Col md={8} lg={9}>
          <Card className="p-4 p-xl-5 my-3 my-xl-4">
            <div className="d-flex flex-row align-items-start justify-content-between mb-3">
              <div className="d-flex flex-column">
                <div className="d-flex flex-column">
                  <div className="mb-2">
                    <span className="fw-bold">Current&nbsp;Date:&nbsp;</span>
                    <span className="current-date">{currentDate}</span>
                    <p></p>
                    <span className="fw-bold">Current&nbsp;Time:&nbsp;</span>
                    <span className="current-time">{currentTime}</span>
                  </div>
                </div>
                {/* <div className="d-flex flex-row align-items-center">
                  <span className="fw-bold d-block me-2">Due&nbsp;Date:</span>
                  <Form.Control
                    type="date"
                    value={dateOfIssue}
                    name="dateOfIssue"
                    onChange={handleChange(setDateOfIssue)}
                    style={{ maxWidth: "150px" }}
                    required
                  />
                </div> */}
              </div>
              <div className="d-flex flex-row align-items-center">
                <span className="fw-bold me-2">Invoice&nbsp;Number:&nbsp;</span>
                <Form.Control
                  type="text"
                  value={invoiceNumber}
                  name="invoiceNumber"
                  onChange={handleChange(setInvoiceNumber)}
                  min="1"
                  style={{ maxWidth: "70px" }}
                  required
                />
              </div>
            </div>
            <hr className="my-4" />
            <Row className="mb-5">
              <Col>
                <Form.Label className="fw-bold">Bill from:</Form.Label>
                <Form.Control
                  placeholder="Shop Name"
                  rows={3}
                  value={billFrom}
                  type="text"
                  name="billFrom"
                  className="my-2"
                  onChange={handleChange(setBillFrom)}
                  autoComplete="name"
                  required
                />
                  <Form.Control
                  placeholder="Shop Address"
                  value={billFromAddress}
                  type="text"
                  name="billFromAddress"
                  className="my-2"
                  autoComplete="address"
                  onChange={handleChange(setBillFromAddress)}
                  required
                />
                <Form.Control
                  placeholder="Mobile Number"
                  value={billFromNumber}
                  type="text" // Correct type
                  name="billFromNumber"
                  className="my-2"
                  onChange={handleChange(setBillFromNumber)}
                  autoComplete="tel" // Correct autocomplete
                  required
                  // pattern="[0-9]{10}" // Example validation (10 digits)
                  // title="Please enter a 10-digit mobile number"
                />
              </Col>
              <Col>
                <Form.Label className="fw-bold">Bill to:</Form.Label>
                <Form.Control
                  placeholder="Costumer Name"
                  rows={3}
                  value={billTo}
                  type="text"
                  name="billTo"
                  className="my-2"
                  onChange={handleChange(setBillTo)}
                  autoComplete="name"
                  required
                />
                 <Form.Control
                  placeholder="Costumer Address"
                  value={billToAddress}
                  type="text"
                  name="billToAddress"
                  className="my-2"
                  autoComplete="address"
                  onChange={handleChange(setBillToAddress)}
                  required
                />
                <Form.Control
                  placeholder="Mobile Number"
                  value={billToNumber}
                  type="text" // Correct type
                  name="billToNumber"
                  className="my-2"
                  onChange={handleChange(setBillToNumber)}
                  autoComplete="tel" // Correct autocomplete
                  required
                  // pattern="[0-9]{10}" // Example validation (10 digits)
                  // title="Please enter a 10-digit mobile number"
                />
              </Col>
            </Row>
            <Invoice
              onItemizedItemEdit={onItemizedItemEdit}
              onRowAdd={handleAddEvent}
              onRowDel={handleRowDel}
              currency={currency}
              items={items}
            />
            <Row className="mt-4 justify-content-end">
              <Col lg={6}>
                <div className="d-flex flex-row align-items-start justify-content-between">
                  <span className="fw-bold">Subtotal:</span>
                  <span>
                    {currency}
                    {subTotal}
                  </span>
                </div>
                <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                  <span className="fw-bold">Discount:</span>
                  <span>
                    <span className="small ">({discountRate || 0}%)</span>
                    {currency}
                    {discountAmount || 0}
                  </span>
                </div>
                <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                  <span className="fw-bold">GST:</span>
                  <span>
                    <span className="small ">({gstRate || 0}%)</span>
                    {currency}
                    {gstAmount || 0}
                  </span>
                </div>
                <hr />
                <div
                  className="d-flex flex-row align-items-start justify-content-between"
                  style={{ fontSize: "1.125rem" }}
                >
                  <span className="fw-bold">Total:</span>
                  <span className="fw-bold">
                    {currency}
                    {total || 0}
                  </span>
                </div>
              </Col>
            </Row>
            <hr className="my-4" />
            <Form.Label className="fw-bold">Notes:</Form.Label>
            <Form.Control
              placeholder="Thank you for doing business with us. Have a great day!"
              name="notes"
              value={notes}
              onChange={handleChange(setNotes)}
              as="textarea"
              className="my-2"
              rows={5}
            />
          </Card>
        </Col>
        <Col md={4} lg={3}>
          <div className="sticky-top pt-md-3 pt-xl-4">
            <BillLook
              showModal={isOpen}
              closeModal={closeModal}
              info={{
                currentDate,
                currentTime,
                invoiceNumber,
                billTo,
                billToNumber,
                billToAddress,
                billFrom,
                billFromNumber,
                billFromAddress,
                notes,
              }}
              items={items}
              currency={currency}
              subTotal={subTotal}
              gstAmount={gstAmount}
              discountAmount={discountAmount}
              total={total}
            />

            {/* <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Currency:</Form.Label>
              <Form.Select
                onChange={(e) => {
                  setCurrency(e.target.value);
                }}
                className="btn btn-light my-1"
                aria-label="Change Currency"
              >
                <option value="₹">INR (Indian Rupee)</option>
                <option value="$">USD (United States Dollar)</option>
                <option value="£">GBP (British Pound Sterling)</option>
                <option value="¥">JPY (Japanese Yen)</option>
                <option value="$">CAD (Canadian Dollar)</option>
                <option value="$">AUD (Australian Dollar)</option>
                <option value="$">SGD (Singapore Dollar)</option>
                <option value="¥">CNY (Chinese Renminbi)</option>
                <option value="₿">BTC (Bitcoin)</option>
              </Form.Select>
            </Form.Group> */}


            <Form.Group className="my-3">
              <Form.Label className="fw-bold">GST:</Form.Label>
              <InputGroup className="my-1 flex-nowrap">
                <Form.Control
                  name="gstRate"
                  type="text"
                  value={gstRate}
                  onChange={handleChange(setGstRate)}
                  className="bg-white border"
                  placeholder="0.0"
                  min="0.00"
                  step="0.01"
                  max="100.00"
                />
                <InputGroup.Text className="bg-light fw-bold text-secondary small">
                  %
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <Form.Group className="my-3">
              <Form.Label className="fw-bold">Discount Rate:</Form.Label>
              <InputGroup className="my-1 flex-nowrap">
                <Form.Control
                  name="discountRate"
                  type="text"
                  value={discountRate}
                  onChange={handleChange(setDiscountRate)}
                  className="bg-white border"
                  placeholder="0.0"
                  min="0.00"
                  step="0.01"
                  max="100.00"
                />
                <InputGroup.Text className="bg-light fw-bold text-secondary small">
                  %
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <hr className="mt-4 mb-3" />
            <Button
              variant="primary"
              type="submit"
              className="d-block w-100 btn-secondary"
            >
              Review Invoice
            </Button>
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default BillForm;
