import { h, render } from 'preact';
import "./style/index.css";

function init() {
    const App = require('./components/app').default;
    render(<App />, document.getElementById('app') as Element);
}

if (module.hot) {
    // require('preact/devtools');
    module.hot.accept('./components/app', () => requestAnimationFrame(init));
}

init();