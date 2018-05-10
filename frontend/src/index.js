import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import './index.css';
import App from './App';
import About from './About';
import registerServiceWorker from './registerServiceWorker';

import { Layout, Menu } from 'antd';
const { Header, Content, Footer, Sider } = Layout;

const NotFound = () => (
  <div>
    <b>404</b>
    <p>おっと，ここには何もありませんよ！</p>
    <Link to="./">トップに戻る</Link>
  </div>
);

ReactDOM.render(
  <BrowserRouter>
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
      >
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1">
            <Link to="/">Top</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/about">About</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: "#fff", padding: 0 }}>
          h4k0bu5
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div style={{ padding: 24, background: "#fff", minHeight: "calc(100vh - 157px)" }}>
            <Switch>
              <Route exact path="/" component={App} />
              <Route exact path="/:departure/:arrival" component={App} />
              <Route exact path="/about" component={About} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          &copy;2018 Isaac
        </Footer>
      </Layout>
    </Layout>
  </BrowserRouter>
  , document.getElementById('root'));
registerServiceWorker();
