import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// ===================== MASTER CSS =====================
import './css/jasny-bootstrap.css';
// import './css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// import 'bootstrap/dist/css/bootstrap.min.css';

// ===================== ICONS CSS =====================
import './css/icon/fugue.css';
import './css/icon/elusive.css';
import './css/icon/font-awesome.css';

// ===================== SITE CSS =====================
import './css/default.css';
// import './css/default.responsive.css';

// ===================== PLUGINS CSS =====================
import './css/plugins/uniform.default.css';
import './css/plugins/jquery.snippet.css';

// ===================== JQUERY UI CSS =====================
import './css/jui/jquery.ui.css';

// ===================== Bootstrap UI CSS =====================
import './css/bootstrap3/bootstrap-switch.css';

// ===================== PLUGINS CSS =====================
import './css/plugins/jquery.fullcalendar.css';
import './css/plugins/jquery.fullcalendar.print.css';
import './css/plugins/jquery.fullcalendar.custom.css';

// ===================== JQGRID UI CSS =====================
import './css/ui.jqgrid.css';

ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
);