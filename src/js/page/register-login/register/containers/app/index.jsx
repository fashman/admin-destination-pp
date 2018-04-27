import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { Layout, Alert } from 'antd';
import { actions } from '../../actions';
import styles from './style.mod.less';
import StepA from '../../components/stepa';
import StepB from '../../components/stepb';
import Step from 'app/components/step';
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

  componentWillMount() {
    
  }

  render() {
    const { 
      step, stepa, stepb, createUser, isloading,
      changeState, saveSubmit,fetchDetail, checkUserAndCode
    } = this.props;
    return (
      <div className={cx('content-wrap')}>
        <Header />
        <Content className={cx('app')}>
          <div className={cx('inbox')}>
            <Step current={Math.ceil(step)} />
            {
              step === 0 ? (
                <StepA 
                  stepa={stepa} 
                  changeState={changeState}
                  checkUserAndCode={checkUserAndCode}
                  createUser={createUser}
                  isloading={isloading}
                />
              ) : step === 1 ? (
                <StepB 
                  stepa={stepa} stepb={stepb} 
                  saveSubmit={saveSubmit} 
                  changeState={changeState}
                  fetchDetail={fetchDetail}
                  isloading={isloading}
                />
              ) : step === 1.5 ? (
                <Alert
                  message={<span>{intl.get('pages.storeCreate.success')}</span>}
                  description={intl.get('pages.storeCreate.successDesc')}
                  type="success"
                  showIcon
                  style={{width: '80%', margin: '0 auto'}}
                />
              ): null
            }
          </div>
        </Content>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = ({step, stepa, stepb, isloading}) => ({
  step, stepa, stepb, isloading
})

const mapDispatchToProps = (dispatch) => {
  return {
    changeState: data => {
      dispatch(actions.changeState(data));
    },
    saveSubmit: data => {
      dispatch(actions.saveSubmit(data));
    },
    fetchDetail: data => {
      dispatch(actions.fetchDetail(data));
    },
    checkUserAndCode: data => {
      dispatch(actions.checkUserAndCode(data));
    },
    createUser: data => {
      dispatch(actions.createUser(data));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
