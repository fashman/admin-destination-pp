/* eslint-disable */
import 'app/util/polyfills';
/* eslint-enable */

import React from 'react';
import ReactDOM from 'react-dom';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import createStore from './store/createStore';
import App from './containers/app';
import './styles/index.less';
import JsCookie from 'js-cookie';

const lang = JsCookie.get('locale') || 'en_US';
const sagaMiddleware = createSagaMiddleware();
const store = createStore(sagaMiddleware);
sagaMiddleware.run(rootSaga);

// 设置 title
if ( lang === 'en_US' ) {
  document.title = 'Destination++_Area manage_detail';
}

function render() {
  ReactDOM.render(
    <Provider store={store}>
      {
        lang === 'en_US' ? (
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
