import React from 'react';
import 'antd/dist/antd.css';
import { Menu, Affix, Empty } from 'antd';
import '../style/mainPage.css';
import { Route, Link } from 'react-router-dom';

class mainPage extends React.Component {
  state = {
    current: 'blog',
  };

  handleClick = e => {
    this.setState({
      current: e.key,
    });
  };

  render() {
    return (
      <div >
        <Affix offsetTop='0'>
          <Menu  className='menu' theme='Light' onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
            <Menu.Item className='menuItem' key="blog">
              <Link to='/mainPage/blog'>博客</Link>
            </Menu.Item>
            <Menu.Item className='menuItem' key="mindmap" >
              <Link to='/personalPage' target='_brank'>个人简历</Link>
            </Menu.Item>
            <Menu.Item className='menuItem' key="resume">
              <Link to='/mainPage/resume'>Markdown</Link>
            </Menu.Item>
            <Menu.Item className='menuItem' key="message">
              <Link to='/mainPage/message'>欢迎留言</Link>
            </Menu.Item>
          </Menu>
        </Affix>
        <div className='content'>
            <Route exact path='/' component={require('./blog/index').default}/>
            <Route path='/mainPage/blog' component={require('./blog/index').default}/>
            <Route path='/mainPage/resume' component={require('./markdown/index').default}/>
        </div>
        
        <div className='ad' >
          <h3 >广告位置？</h3>
          <Empty />
        </div>
      </div>
    );
  }
}

export default mainPage;
          