// 切换选项卡
import React, { Component } from 'react';
import classNames from 'classnames/bind';
import { Button, Dropdown, Icon, Menu } from 'antd';
import styles from './style.mod.less';
import intl from 'react-intl-universal';

const cx = classNames.bind(styles);
const ButtonGroup = Button.Group;

export default class Tabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cur: 0
    }
  }

  handleClick = ( cur, dishTypeId ) => {
    this.setState({ cur });
    if ( dishTypeId === 0 ) {
      this.props.fetchMenuList({ dishTypeId });
    } else {
      this.props.fetchDishList({ dishTypeId });
    }
    this.props.changeState({loading: true, curDishType: dishTypeId});
  }

  handleMenuClick = ( key ) => {
    this.props.changeState({ [key.key]: true });
  }

  render() {
    const { data } = this.props;
    const menu = (
      <Menu onClick={this.handleMenuClick} style={{textAlign: 'center'}}>
        <Menu.Item key="dishVisible">{intl.get('pages.storeMenu.addItem')}</Menu.Item>
        <Menu.Item key="menuVisible">{intl.get('pages.storeMenu.addMenu')}</Menu.Item>
      </Menu>
    );
    return (
      <div className={cx('tabs')}>
        <div className={cx('tabs-btns')}>
          <h3>{intl.get('pages.storeMenu.title')}</h3>
          <Dropdown overlay={menu}>
            <Button type="primary">+ {intl.get('pages.storeMenu.add')}<Icon type="down" /></Button>
          </Dropdown>
        </div>
        <ButtonGroup className={cx('tabs-list')}>
          {
            data.dishTypes && data.dishTypes.map((val, index) => (
              <Button 
                type={this.state.cur === index ? 'primary' : 'default'} 
                key={index}
                onClick={() => this.handleClick(index, val.dishTypeId)}
              >
                {val.dishTypeName}
              </Button>
            ))
          }
        </ButtonGroup>
      </div>
    )
  }
}