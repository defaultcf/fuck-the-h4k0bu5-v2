import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { Layout, Menu } from 'antd';
const { Header, Content, Footer, Sider } = Layout;

ReactDOM.render(
  <BrowserRouter>
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
      >
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1">
            <span className="nav-text">Top</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: "#fff", padding: 0 }}>Fuck the h4k0bu5</Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div style={{ padding: 24, background: "#fff", minHeight: "calc(100vh - 157px)" }}>
            <Route exact path="/" component={App} />
            <Route path="/:departure/:arrival" component={App} />
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
