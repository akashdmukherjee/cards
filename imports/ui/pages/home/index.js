import React from 'react';
import PropTypes from 'prop-types';
import Card from 'antd/lib/card';
import List from 'antd/lib/list';
import Button from 'antd/lib/button';
import Tag from 'antd/lib/tag';
import MetaTags from '../../components/meta-tags';
import metaData from './meta.json';

const Home = ({ cmsList, loading }) => (
  <div className="home-page">
    <MetaTags meta={metaData} />
    <div className="container">
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={cmsList || []}
        loading={loading}
        renderItem={item => (
          <List.Item>
            <Card title={item.title}>
              <div>{item.description}</div>
              <div>{item.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}</div>
              <Button type="primary" href={`/page/${item.slug}`}>Go to page!</Button>
            </Card>
          </List.Item>
        )}
      />
    </div>
  </div>
);

Home.propTypes = {
  cmsList: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Home;
