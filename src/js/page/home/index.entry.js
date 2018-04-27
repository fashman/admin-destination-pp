/* eslint-disable */
import 'app/util/polyfills';
/* eslint-enable */

import React from 'react';
import ReactDOM from 'react-dom';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import './styles/index.less';
import JsCookie from 'js-cookie';
import App from './components/app';
import intl from 'react-intl-universal';

const lang = JsCookie.get('locale') || 'en_US';

// 设置 title
document.title = intl.get('pages.index.documentTitle');

function render() {
  ReactDOM.render(
    <div>
      {
        lang === 'en_US' ? (
          <LocaleProvider locale={enUS}>
            <App />
          </LocaleProvider>
        ) : <App />
      }
    </div>
    ,document.getElementById('app')
  );
}

render();