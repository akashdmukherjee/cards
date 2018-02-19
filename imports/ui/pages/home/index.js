import React from 'react';
import Card from 'antd/lib/card';
import MetaTags from '../../components/meta-tags';
import metaData from './meta.json';

const Home = () => (
  <div className="home-page">
    <MetaTags meta={metaData} />
    <div className="container">
      <Card title="Home Page">
        Nothing here for now!
      </Card>
    </div>
  </div>
);

export default Home;
