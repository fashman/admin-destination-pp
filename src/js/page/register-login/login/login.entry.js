/* eslint-disable */
import 'app/util/polyfills';
/* eslint-enable */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import createStore from './store/createStore';
import App from './containers/app';
import './styles/index.less';
import JsCookie from 'js-cookie';
import intl from 'react-intl-universal';

const currentLocale =  JsCookie.get('locale') || 'en_US';
const sagaMiddleware = createSagaMiddleware();
const store = createStore(sagaMiddleware);
sagaMiddleware.run(rootSaga);

// 设置 title
document.title = intl.get('pages.login.documentTitle');

function render() {
  ReactDOM.render(
    <Provider store={store}>
      {
        currentLocale === 'en_US' ? (
          <LocaleProvider locale={enUS}>
            <App />
          </LocaleProvider>
        ) : <App />
      }
    </Provider>,
    document.getElementById('app')
  );
}

render();

store.subscribe(render);
