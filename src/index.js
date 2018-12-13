import dva from 'dva';
import createHashHistory from 'history/createHashHistory';
import Shop from './models/shop.js';
// 1. Initialize
const app = dva({
    history:createHashHistory()
});

app.model(Shop);
// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
