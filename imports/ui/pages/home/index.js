import React from 'react';
import Button from 'antd/lib/button';
import MetaTags from '../../components/meta-tags';
import metaData from './meta.json';

const Home = () => (
  <div>
    <MetaTags meta={metaData} />
    <div className="container">
      Home Page <Button>Test</Button>
    </div>
  </div>
);

export default Home;
