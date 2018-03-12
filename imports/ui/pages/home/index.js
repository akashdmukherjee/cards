import React from 'react';
import PropTypes from 'prop-types';
import Card from 'antd/lib/card';
import List from 'antd/lib/list';
import Tag from 'antd/lib/tag';
import Icon from 'antd/lib/icon';
import MetaTags from '../../components/meta-tags';
import imageUrlHelper from '../../utils/image-url-helper';
import metaData from './meta.json';

const Home = ({ cmsList, loading }) => {
  const handleCardClick = (slug) => {
    if (window) {
      window.location = `/page/${slug}`;
    }
  };
  return (
    <div className="home-page">
      <MetaTags meta={metaData} />
      <div className="container">
        <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={cmsList || []}
          loading={loading}
          renderItem={item => (
            <List.Item className="home-page-item">
              <Card
                hoverable
                onClick={() => handleCardClick(item.slug)}
                bodyStyle={{ padding: 0, position: 'relative' }}
              >
                <div className={`home-item-name-icon ${item.image ? 'absolute' : ''}`}>
                  <div className="home-page-item-name">Name</div>
                  <div className="home-page-item-icon"><Icon type="picture" /></div>
                </div>
                {item.image && (
                  <div className="home-page-item-image-container">
                    <img
                      src={imageUrlHelper(
                        item.image.version,
                        item.image.publicId,
                        item.image.format,
                        'w_300,c_limit',
                      )}
                      alt={item.title}
                    />
                  </div>
                )}
                <div className="home-page-item-content">
                  <div className="home-page-item-title">{item.title}</div>
                  <div className="home-page-item-description">{item.description}</div>
                  <div>{item.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}</div>
                </div>
              </Card>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

Home.propTypes = {
  cmsList: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Home;
