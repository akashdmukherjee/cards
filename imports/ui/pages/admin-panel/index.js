import React from 'react';
import { Link } from 'react-router-dom';

const AdminPanel = () => (
  <div className="container">
    This is admin panel view - we need to secure it <Link to="/">Back to homepage</Link>
  </div>
);

export default AdminPanel;
