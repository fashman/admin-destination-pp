import React, { Component } from 'react';
import { Input, Row, Col } from 'antd';
import intl from 'react-intl-universal';

class DishTaste extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasteArr: this.props.value || ''
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        tasteArr: nextProps.value
      });
    }
  }

  handleChange = (tasteArr) => {
    if (!('value' in this.props)) {
      this.setState({ tasteArr });
    }
    this.triggerChange({ tasteArr });
  }

  triggerChange = (changedValue) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(changedValue.tasteArr);
    }
  }

  render() {
    const { tasteArr } = this.state;
    return (
      <Row gutter={8}>
        <Col span={24}>
          <Input placeholder={intl.get('pages.storeInfoBase.taste')} style={{height: 40,width: 620}} value={tasteArr} onChange={this.handleChange}/>
        </Col>
      </Row>
    );
  }
}

module.exports = DishTaste;
