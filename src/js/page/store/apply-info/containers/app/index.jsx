import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { Layout } from 'antd';
import { actions } from '../../actions';
import styles from './style.mod.less';
import InfoForm from '../../components/info';
import Header from 'app/components/header';
import Footer from 'app/components/footer';

const { Content } = Layout;
const cx = classNames.bind(styles);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      changeState, fetchDetail, detail,
      submitData, sendEmail, showModal
    } = this.props;
    return (
      <div>
        <Header showMenu={'apply'}/>
        <Content className={cx('app')}>
          <div className={cx('inbox')}>
            <InfoForm 
              changeState={changeState} 
              fetchDetail={fetchDetail}
              detail={detail}
              submitData={submitData}
              sendEmail={sendEmail}
              showModal={showModal}
            />
          </div>
        </Content>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = ({detail, showModal}) => ({
  detail, showModal
})

const mapDispatchToProps = (dispatch) => {
  return {
    changeState: data => {
      dispatch(actions.changeState(data));
    },
    fetchDetail: data => {
      dispatch(actions.fetchDetail(data));
    },
    submitData: data => {
      dispatch(actions.submitData(data));
    },
    sendEmail: data => {
      dispatch(actions.sendEmail(data));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
