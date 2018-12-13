import React from 'react';
import {routerRedux,Route,Switch,Redirect} from 'dva/router';

//各个组件
import Wrap from './page/wrap'
import Home from './page/home';
import Shop from './page/shop';
import Account from './page/account';
import Menu from './page/menu';
import More from './page/more';
import ShopFilter from './page/shop/shopFilter';
const {ConnectedRouter} = routerRedux;
function RouterConfig({ history }) {
  return (
    <ConnectedRouter history={history}>
     <Wrap>
    <Switch>
    <Route path="/home" component={Home}/>
    <Route path="/shop" exact component={Shop}/>
    <Route path="/shop/shopfilter" component={ShopFilter}/>
    <Route path="/account" component={Account}/>
    <Route path="/menu" component={Menu}/>
    <Route path="/more" component={More}/>
    <Redirect to="/home"/>
    </Switch>
    </Wrap>
    </ConnectedRouter>
  );
}

export default RouterConfig;
