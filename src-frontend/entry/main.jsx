import '../style/global.css';
import React, { lazy } from 'react';
import * as ReactDOM from 'react-dom/client';

let SocketApp = lazy(() => import('../components/Socket/Socket').then(r => {
    return {
        default: r.SocketApp
    }
}));

function MyApp() {
    return <div className="">
        <div className="">
            <SocketApp></SocketApp>
        </div>
    </div>
}

ReactDOM.createRoot(document.getElementById('root')).render(<MyApp />);