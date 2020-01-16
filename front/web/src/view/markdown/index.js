import React from 'react';
import marked from 'marked';
import highlight from 'highlight.js';
import 'antd/dist/antd.css';
import { Input,Button ,Modal,message} from 'antd';
import axios from 'axios';
import qs from 'qs'
import '../../style/markdown/markdownEditor.css';

marked.setOptions({
  highlight (code) {
    return highlight.highlightAuto(code).value
  }
})
class markdownEditor extends React.Component {
  constructor(props){
    super(props)
    this.state={
      visible:false,
      title:'default',
      author:'default',
      summary:'',
      previewContent:'<h1 id="markdown-herea">markdown here</h1>'}
  }

  changTitle = ({ target: { value } })=>{
    this.setState({title:{value}.value})
  }
  changSummary = ({ target: { value } })=>{
    this.setState({summary:{value}.value})
  }
  changAuthor = ({ target: { value } })=>{
    this.setState({author:{value}.value})
  }
  onContentChange = (e)=>{
    this.setState({
      previewContent: marked(e.target.innerText, {breaks: true})
    })
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleCancel =() =>{
    this.setState({
      visible:false
    })
  }
  onSubmit =()=>{
    let data =qs.stringify({
      author:this.state.author ,
      title:this.state.title,
      summary:this.state.summary,
      content:this.state.previewContent,
      //tages:''
    })
    axios({
      method:'post',
      url:'http://127.0.0.1:3005/mainPage/markdown/writeBlog',
      data: data
    }).then(res=>{
      message.info('文章发布成功');
      this.setState({
        visible:false,
        title:'default',
        author:'default',
        summary:'',
        previewContent:'<h1 id="markdown-herea">markdown here</h1>'})
    },err=>{
      message.info('文章发布失败');
      console.log(err)
    })
    this.setState({
      visible:false
    })
  }
  render(){
    const defaultShow = '# markdown here'
    return(
      <div className='maindiv'>
        <div className='header'>
          <Input className='headerInput' onChange ={this.changTitle} placeholder="title" />
          <Input className='author' onChange ={this.changAuthor} placeholder="author" />
          <Input className='summary' onChange ={this.changSummary} placeholder="summary" />
        </div>
        <Button className='submit' onClick = {this.showModal} >发布</Button>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.onSubmit}
          onCancel={this.handleCancel}
        >
          <p>请确定已填写文章标题、作者、概述</p>
          <p>若无填写，文章仍可发布</p>
          <p>但是此类文章，很快会被自动删除</p>
        </Modal>
        <div className='content'>
          <div>
            <div className='inputdiv' dangerouslySetInnerHTML={{__html:defaultShow}} contentEditable='plaintext-only' onInput={this.onContentChange}></div>
          </div>
          <div>
            <div className='showdiv' dangerouslySetInnerHTML={{__html:this.state.previewContent}} >
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default markdownEditor;