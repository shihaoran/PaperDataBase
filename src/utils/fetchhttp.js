/**
 * Created by shi on 2017/1/3.
 */
const IP="http://115.28.77.70:8080/";
const Ajax = require("robe-ajax")

export default function fetchhttp(url,value,before,callback) {
  before();
  console.log(JSON.stringify(value));
  fetch(IP+url,{
    method:'POST',
    mode: 'no-cors',
    header:{
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
    body:JSON.stringify(value)
  })
    .then(function(data){
      console.log(data);
      return data.json();
    })
    .then((responseText)=>{
      console.log(responseText);
      callback(responseText);
    })
    .catch((error)=>{
      console.warn(error);
    });
}