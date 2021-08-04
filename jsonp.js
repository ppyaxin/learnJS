//原生的实现方式,只能实现get请求
let script = document.createElement('script');

script.src = 'http://www.nealyang.cn/login?username=Nealyang&callback=callback';

document.body.appendChild(script);

function callback(res) {
  console.log(res);
}
