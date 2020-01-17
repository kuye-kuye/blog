import React from 'react';
import marked from 'marked';
import highlight from 'highlight.js';

marked.setOptions({
  highlight (code) {
    return highlight.highlightAuto(code).value
  }
})

const resume = `
#  <center><font face="楷体" size="6"> 简历 </font></center>
<html>
    <table style="border:1px solid white;" >
        <tr style="border:0px;height:15px;padding:0px">
            <td width ="45%" style="border:1px;background-color:white;height:15px;padding-top:-5px">
                <li> <font face="楷体" size="3">姓名: 王全龙</font>
            </td>
            <td width="40%" style="border:0px;background-color:white;height:15px ">
                <li> <font face="楷体" size="3">年龄：23</font>
            </td>
            <td width = "200px" style="border:0px;" rowspan="4">
                <img margin-right:50px float="right" width = "100px" hight="150px" src="https://img-blog.csdnimg.cn/20200108223920936.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQwODYzMzI4,size_16,color_FFFFFF,t_70" />
            </td>
        </tr>
        <tr style="border:0px;padding-top:-10px;height:15px;padding:0px">
            <td width ="45%" style="border:0px;background-color:white;height:15px ">
                <li> <font face="楷体" size="3">学历：本科</font>
            </td>
            <td width="40%" style="border:0px;background-color:white;height:15px ">
                <li> <font face="楷体" size="3">毕业院校: 河南农业大学</font>
            </td>
        </tr>
        <tr style="border:0px ;height:15px;padding:0px">
            <td width ="45%" style="border:0px;background-color:white;height:15px ">
                <li><font face="楷体" size="3">联系电话：13598057031</font>
            </td>
            <td width="40%" style="border:0px;background-color:white;height:15px ">
                <li><font face="楷体" size="3">邮箱: rex.wql@qq.com</font>
            </td>
        </tr>
        <tr style="border:0px ;height:15px;padding:0px">
            <td colspan="2"style="border:0px;background-color:white;height:15px ">
                <li><font face="楷体" size="3">求职意向：node开发工程师、go开发工程师、全栈开发工程师<font>
            </td>
        </tr>
    </table>
</html>

#### <font face="楷体">工作经验</font>

<font face="楷体" size="2">公司：上海群之脉信息科技有限公司</font>&nbsp;&nbsp;&nbsp;&nbsp;  <font face="楷体" size="2">2019/4-至今</font>

<font face="楷体" size="2">职位：</font> SRE（运维/开发）

<font face="楷体" size="2">工作内容：</font> 

1.<font face="楷体" size="2">运维部分：给客户的项目开通各种阿里云服务器资源，部署项目代码，解决客户在部署和运行所遇到的问题，以及项目运行期间的服务器监控和维护</font> 

2.<font face="楷体" size="2">开发部分：使用 \`node\` 和 \`golang\` 语言编写前后端，将所有项目共性的需求提取出来写成不同的服务，运行在\`docker\`容器中，并入公司的微服务架构中，尽可能的实现部署运维管理全部自动化。

3.<font face="楷体" size="2">其他部分：帮助非技术同事处理一些电脑问题

<font face="楷体" size="3">工作成果：</font> 

<font face="楷体" size="2">将各种云服务资源的开通，配置，日志管理，消费详情，月报表生成等集成为不同的服务 \`service\`,编写对应的前端页面，添加到公司现有的微服务架构里。使得客户只需要填写我们提供的\`execl\`表格，即可完成服务器资源自动开通与配置（类似阿里云自身提供的资源编排功能）</font>

 #### <font face="楷体">自我介绍：</font>
 1.<font face="楷体" size="2">善于自我管理与约束，具有良好的时间管理和任务规划能力，所有任务全部准时完成</font>
 
 2.<font face="楷体" size="2">乐于刨根问底，敢于迎难而上，在使用 \`ejsExcel\` 时遇到问题，在休息时间仔细分析其源码，发现并修复了其中的一个 \`bug\`</font>
 
 3.<font face="楷体" size="2">喜欢学习新的技术，分享自己的学习与踩坑过程，以文章博客记录自己成长。（以前的博客写在CSDN上，后来在有道云笔记上写随笔，最近利用周末闲暇时间使用\`node\`和\`go\`语言开发和搭建自己的个人博客，部分功能已经实践，还有部分功能以页面尚待完善）
 
#### <font face="楷体" size="3">个人能力：</font>
<font face="楷体" size="2">node : 熟练使用 \`React\` 和 \`Antd\` 编写前端页面和组件，熟练使用 \`koa\` 框架，有良好的\`ES6\`语法规范</font>
<font face="楷体" size="2">go : 可以能够利用\`go\`原生的包进行 web 后台开发，暂时未深入接触 \`go\` 的框架</font>
<font face="楷体" size="2">java: 熟练掌握\`java\`语言基础和\`java web\`开发，熟练掌握面向对象编程，数据结构，曾在\`lintCode\`平台刷过算法，等级目前黄金</font>
<font face="楷体" size="2">数据库: 熟悉\`mysql\`的简单\`CURD\`操作，非关系型数据库，熟悉\`Elasticsearch\`,个人博客使用的便是\`Elasticsearch\`</font>
<font face="楷体" size="2">other: 了解微服务架构，\`grpc\`,\`docker\`,非常熟悉阿里云的操作流程，熟练使用\`markdown\`进行文档的编写和记录。</font>

`

class personalPage extends React.Component{
  render(){
    return(
      <div className='main'>
        <div className = 'content' contentEditable='false' dangerouslySetInnerHTML={{__html:marked(resume,{breaks: true})}} ></div>
      </div>
    )
  }
}
export default personalPage;
