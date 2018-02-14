import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'antd/lib/button';
import MetaTags from '../../components/meta-tags';
import metaData from './meta.json';

const Home = () => (
  <div>
    <MetaTags meta={metaData} />
    <div className="container">
      Home Page <Button>Test</Button>
      <div>
        <Link to="/signin">Sign In</Link>
      </div>
      <div>
        <Link to="/signup">Sign Up</Link>
      </div>
      <div>
        <Link to="/admin">Admin</Link>
      </div>
    </div>
  </div>
);

export default Home;
