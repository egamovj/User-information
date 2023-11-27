
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../main.css'

const Loader = () => {
  return (
    <div className="loader">
      <div className="loaderr"></div>
    </div>
  );
};

const Card = ({ name, username, email, address, phone, website}) => {
  return (
    <div className="card_wrapper">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
          <h3 className="card-subtitle mb-2 text-muted">{username}</h3>
          <div className="main-col flex-column py-2 mb-2">
            <div className="d-flex">
              <p className="m-0 me-1">Email:</p>
              <a href={`mailto:${email}`} className="ms-0 card-link">
                {email}
              </a>
            </div>
            <div className="d-flex">
              <p className="m-0 me-1">Website:</p>
              <a href={website} className="ms-0 card-link">
                {website}
              </a>
            </div>
            <div className="d-flex">
              <p className="m-0 me-1">Address:</p>
              <a href={`${address.city},${address.street}`} className="ms-0 card-link">
                {`${address.city}, ${address.street}`}
              </a>
            </div>
            <div className="d-flex">
              <p className="m-0 me-1">Phone:</p>
              <a href={`tel:${phone}`} className="ms-0 card-link">
                {phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
          throw new Error('Url is error');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="wave"></div>
      <div className="wave"></div>
      <div className="wave"></div>

      <div className="container">
        {loading && <Loader />}
        <h1 className="title">Users Information</h1>
        <div className="card__row row">
          {data.map((user) => (
            <Card key={user.id} {...user} />
          ))}
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  address: PropTypes.shape({
    city: PropTypes.string.isRequired,
    street: PropTypes.string.isRequired,
  }).isRequired,
  phone: PropTypes.string.isRequired,
  website: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default App;
