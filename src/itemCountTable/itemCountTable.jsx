import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';

import './itemCountTable.css';

const ItemCountTable = () => {
  const [itemCounts, setItemCounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/item-counts', { credentials: 'include' })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Failed to fetch item counts');
      })
      .then((data) => {
        setItemCounts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="full-height">
      <Container>
        <h2 className="text-light">Item Counts</h2>
        {loading ? (
          <p className="text-light">Loading...</p>
        ) : (
          <>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Number of Items</th>
                </tr>
              </thead>
              <tbody>
                {itemCounts.map((count, index) => (
                  <tr key={index}>
                    <td>{count.email}</td>
                    <td>{count.count}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            {itemCounts.length === 0 && <p className="text-light">Somebody has to add things to their list.</p>}
          </>
        )}
      </Container>
    </div>
  );
};

export { ItemCountTable };
