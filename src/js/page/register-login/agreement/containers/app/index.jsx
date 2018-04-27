import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { Layout, Alert, Button } from 'antd';
import { actions } from '../../actions';
import styles from './style.mod.less';
import StepC from '../../components/stepc';
import Header from 'app/components/header';
import Footer from 'app/components/footer';
import intl from 'react-intl-universal';

const { Content } = Layout;
const cx = classNames.bind(styles);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { step, isloading, shopCode, name, content, changeState, acceptSubmit } = this.props;
    const data = {step, isloading, shopCode, name, content};
    return (
      <div className={cx('content-wrap')}>
        <Header />
        <Content className={cx('app')}>
          <div className={cx('inbox')}>
            {
              step === 2 ? (
                <StepC 
                  {...data}
                  changeState={changeState} 
                  acceptSubmit={acceptSubmit}
                />
              ) : step === 3 ? (
                <Alert
                  message={<span>{intl.get('pages.register.success.title')}</span>}
                  description={(
                    <div>
                      <p><span dangerouslySetInnerHTML={{__html: intl.get('pages.register.success.tips', {code: shopCode})}}></span></p>
                      <a href="//www.ipptraveltech.com/login"><Button type="primary">{intl.get('pages.register.success.login')}</Button></a>
                    </div>
                  )}
                  type="success"
                  showIcon
                  style={{width: '80%', margin: '200px auto 0'}}
                />
              ) : null
            }
          </div>
        </Content>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = ({step, isloading, shopCode, name, content}) => ({
  step, isloading, shopCode, name, content
})

const mapDispatchToProps = (dispatch) => {
  return {
    changeState: data => {
      dispatch(actions.changeState(data));
    },
    acceptSubmit: data => {
      dispatch(actions.acceptSubmit(data));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
