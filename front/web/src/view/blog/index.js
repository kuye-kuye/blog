import React from 'react';
import 'antd/dist/antd.css';
import axios from 'axios';
import qs from 'qs';
import { List, Avatar, Icon , Card, DatePicker,Input,Spin} from 'antd';
import '../../style/blogPage.css';
const { RangePicker } = DatePicker;
const { Search } = Input;

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

class blogPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {startTime:null,endTime:null,loading:true,showData:''}
    this.onChange = this.onChange.bind(this)
    this.Search = this.Search.bind(this)
    let data = []     //将以获取的数据至空，避免重复获取数据
    axios.get('http://127.0.0.1:3005/mainPage/blog/getBlogs').then(res=>{
      if(res.data !==null){
        for (const resultData of res.data){
          const url = '/showBlog/'+resultData.Id
          data.push({
            href:url,
            author:resultData.author,
            title:resultData.title,
            description:resultData.summary,
            content:resultData.content,
          })
        }
      }
      this.setState({showData:data,loading:false})
    })
  }

  onChange(date, dateString) {
    this.setState({startTime:dateString[0],endTime:dateString[1]})
  }

  Search(value){
    let data = qs.stringify({
      startTime:this.state.startTime,
      endTime:this.state.endTime,
      condtions:value
    })
    console.log(data)
    this.setState({loading:true})
    let resData = []
    axios({
      method:'post',
      url:'http://127.0.0.1:3005/getBlogByConditions',
      data:data
    }).then(res=>{
      if(res.data !== null){
        for (const resultData of res.data){
          console.log(resultData)
          const url = '/showBlog/'+resultData.Id
          resData.push({
            href:url,
            author:resultData.author,
            title:resultData.title,
            description:resultData.summary,
            content:resultData.content,
          })
        }
      }
      this.setState({showData:resData,loading:false})
    })
  }

  render(){
    return(
      <div className = 'blogPage'>
        <div className = 'blogContent'>
          <Spin spinning={this.state.loading}>
          <List className = 'list'
            itemLayout="vertical"
            size="small"
            pagination={{
              onChange: page => {
                console.log(page);
              },
              pageSize: 10,
            }}
            dataSource={this.state.showData}
            renderItem={item => (
              <List.Item
                key={item.title}
                actions={[
                  <IconText type="star-o" text="0" key="list-vertical-star-o" />,
                  <IconText type="like-o" text="0" key="list-vertical-like-o" />,
                  <IconText type="message" text="0" key="list-vertical-message" />,
                ]}
                extra={
                  <img
                    width={100}
                    alt="logo"
                    src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                  />
                }
              >
              <List.Item.Meta
                avatar={<Avatar>{item.author}</Avatar>}
                title={<a href={item.href} target="_black">{item.title}</a>}
                description={item.description}
              />
                {item.summary}
              </List.Item>
            )}
          />
          </Spin>
        </div>
        <div className='blogTool'>
          <Card className= 'info'>
          <p>笔名:   枯叶</p>
          <p>访问数量：   </p>
          <p>个性签名：</p>
          </Card>
          <RangePicker className='rangepick' onChange={this.onChange} />
          <Search
            placeholder="搜索博客"
            onSearch={this.Search}
          />
        </div>
      </div>  
    )
  } 
}
export default blogPage;