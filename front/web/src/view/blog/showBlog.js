import React from 'react';
import axios from 'axios';
import qs from 'qs';  
import { Divider } from 'antd';
import '../../style/showBlog.css';

const toLocalDate =(date)=>{
  const data = new Date(date)
  return data.getFullYear()+'-'+(data.getMonth()+1)+'-'+data.getDate()+'  '+data.getHours()+':'+data.getMinutes()+':'+data.getSeconds();  
} 
class showBlogPage extends React.Component{
  constructor(props){
    super(props)
    this.state = {title:'',summary:'',author:'',created:'',content:''}
    let data = qs.stringify({
      id:this.props.match.params.blogId
    })
    axios({
      method:'post',
      url:'http://127.0.0.1:3005/getBlogById',
      data: data
    }).then(res=>{
      console.log(res)
      this.setState({
        title:res.data.title,
        summary:res.data.summary,
        author:res.data.author,
        content:res.data.content,
        created:toLocalDate(res.data.created)
      })
    })  
  }
  render(){
    return(
      <div className='main'>
        <h1 className='title'>{this.state.title}</h1>
        <h3 className='author'>作者：{this.state.author} </h3><h3 className='created'> 写于{this.state.created}</h3>
        <Divider />
        <div className = 'content' contentEditable='false' dangerouslySetInnerHTML={{__html:this.state.content}} ></div>
      </div>
    )
  }
}
export default showBlogPage;
