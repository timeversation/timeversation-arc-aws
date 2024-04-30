/**
 * @license 2024 and Wong Lok
 * main.jsx
 *
 * Copyright (c) 2024 Wong Lok.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '../style/global.css';
import React, { lazy } from 'react';
import * as ReactDOM from 'react-dom/client';

const SocketApp = lazy(() => import('../components/SocketApp/SocketApp').then(r => {
    return {
        default: r.SocketApp
    }
}));

// function MyApp() {
//     return <div className="">
//         <SocketApp></SocketApp>
//     </div>
// }

ReactDOM.createRoot(document.getElementById('root')).render(<SocketApp></SocketApp>);

//