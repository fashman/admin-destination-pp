// 编辑菜品类型弹层
import React, { Component } from 'react';
import { Modal, Form, Input, Tag, message } from 'antd';
import classNames from 'classnames/bind';
import styles from './style.mod.less';
import intl from 'react-intl-universal';

const cx = classNames.bind(styles);
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 11 },
  },
};

class DishType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    }
  }

  handleOk = () => {
    if ( /^\s*$/.test(this.state.name) ) {
      message.error(intl.get('pages.storeMenu.typeModal.error'), 3);
      return;
    }
    this.setState({ name: '' });
    this.props.addDishType(this.state.name);
  }

  handleDelete = (e, dishTypeId) => {
    e.preventDefault();
    this.props.deleteDishType(dishTypeId);
  }

  render() {
    const { dishType, dishTypeVisible, changeState } = this.props;
    return (
      <Modal
        title={intl.get('pages.storeMenu.typeModal.title')}
        visible={dishTypeVisible}
        onOk={this.handleOk}
        onCancel={()=>changeState({dishTypeVisible: false})}
        width="632"
        className={cx('edit-dishtype')}
      >
        <FormItem
          {...formItemLayout}
          label={intl.get('pages.storeMenu.typeModal.name')}
        >
          <Input 
            value={this.state.name} 
            onChange={(e)=>this.setState({name: e.target.value})}
          />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={intl.get('pages.storeMenu.typeModal.has')}
        >
        {
          dishType.typeList.filter(val=>val.dishTypeId > 0).map((val,index) =>(
            <Tag
              closable
              key={index}
              onClose={(e)=>this.handleDelete(e, val.dishTypeId)}
            >
              {val.dishTypeName}
            </Tag>
          ))
        }
        </FormItem>
      </Modal>
    )
  }
}

const EditDishType = Form.create()(DishType);

export default EditDishType;