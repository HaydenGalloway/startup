import React, { useState, useEffect } from 'react';
import { Players } from './players';
import { GameNotifier } from './gameNotifier';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { Row, Col } from 'react-bootstrap';
import './myList.css';

const MyList = (props) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState('');
  const [link, setLink] = useState('');
  const { userName } = props; // Get the userName prop
  const [itemName, setItemName] = useState('');

  useEffect(() => {
    fetch('/api/items', { credentials: 'include' })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Failed to fetch items');
      })
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const addItem = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemName }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to add item');
      }
      const item = await response.json();
      setItems([...items, item]);
      setItemName('');
      GameNotifier.sendAddItemEvent(userName, itemName);
    } catch (error) {
      console.error(error);
    }
  };

  const removeItem = async (itemId) => {
    try {
      const response = await fetch(`/api/items/${itemId}`, {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json'}
      });
  
      if (!response.ok) {
        throw new Error("Failed to remove item");
      } else {
        // If the item was removed successfully, update the items list in the local state
        setItems(items.filter(item => item._id !== itemId));
      }
    } catch (error) {
      console.error(error);
    }
  }
  

  return (
    <div className="full-height">
      <Players userName={props.userName} />
      <Container>
        <h2>My List</h2>
        <Form onSubmit={addItem}>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Item</Form.Label>
                <Form.Control
                  type="text"
                  value={item}
                  onChange={(e) => setItem(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Link</Form.Label>
                <Form.Control
                  type="text"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Button className="button-space" type="submit">Add Item</Button>
          <br />
        </Form>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Table className='text-white'>
            <thead>
              <tr>
                <th>Item</th>
                <th>Link</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id}>
                  <td>{item.item}</td>
                  <td>{item.link}</td>
                  <td>
                    <Button variant="danger" onClick={() => removeItem(item._id)}>
                      &minus;
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    </div>
  );
};

export { MyList };
