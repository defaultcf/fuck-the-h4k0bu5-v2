import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import './App.css';

const { Header, Content, Footer, Sider } = Layout;

class App extends Component {
  render() {
    return (
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
              <p>Hello</p>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            &copy;2018 Isaac
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default App;
