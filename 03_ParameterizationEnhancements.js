import http from 'k6/http';
import {sleep} from 'k6';
import {check} from 'k6';
import {SharedArray} from 'k6/data';

import {findBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';


var response1, response2, response3;
var sleep_time = 3;
const csvData = new SharedArray('users', function () {return papaparse.parse(open('sample.csv'), { header: true }).data; });

export default function()
{

   var p_username = csvData[0]['email'];
   var p_password = csvData[0]['password'];
    
   response1  = http.get('https://randomuser.me/api');
  
   const C_Name  = response1.json().results[0].name.first;
   const C_Title = findBetween(response1.body,"\"title\":\"","\",\"first");
   
   console.log('Title value is '+C_Title);

   check(response1,{'is responsecode 200': (r)=> r.status === 200,}); 
   check(response1,{'Text verified': (r)=> r.body.includes('title'),}); 
   check(response1,{'is size valid': (r)=> r.body.length > 20,}); 
   
   sleep(sleep_time);

   response2 = http.post('https://reqres.in/api/login',{"email": ""+p_username+"","password": ""+p_password+""},{headers: { },});
   check(response2,{'is post responsecode 200': (r)=> r.status === 200,}); 
   

   sleep(sleep_time);

   response3  = http.get('https://api.agify.io?name='+C_Name);
   
   sleep(sleep_time)
   
}

