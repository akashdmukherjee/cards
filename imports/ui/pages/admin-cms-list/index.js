import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Card from 'antd/lib/card';
import Button from 'antd/lib/button';
import Popconfirm from 'antd/lib/popconfirm';

const AdminCMSList = ({ cmsList, history, requestCMSDelete }) => (
  <Card
    title="CMS Pages list"
    extra={<Button type="primary" onClick={() => history.push('/admin/cms/add')}>Add new</Button>}
    className="admin-cms-card-header"
  >
    {cmsList.length ? cmsList.map(item => (
      <div key={item._id} className="admin-cms-list-row">
        <div className="admin-cms-list-title">
          {item.title}
        </div>
        <Button className="admin-cms-list-actions" type="primary" size="small" icon="search" onClick={() => history.push(`/page/${item.slug}`)}>Go to page</Button>
        <Popconfirm title="Are you sure delete this page?" placement="left" onConfirm={() => requestCMSDelete(item._id)}>
          <Button className="admin-cms-list-actions" type="danger" size="small" icon="close-circle-o">Delete</Button>
        </Popconfirm>
      </div>
    )) : <div>List is empty</div>}
  </Card>
);

AdminCMSList.propTypes = {
  cmsList: PropTypes.array,
  history: PropTypes.object.isRequired,
  requestCMSDelete: PropTypes.func.isRequired,
};

AdminCMSList.defaultProps = {
  cmsList: [],
};

export default withRouter(AdminCMSList);
