//init 
import http from 'k6/http';
import {sleep} from 'k6';

var response1, response2;
var sleep_time = 3;


//Setup
export function setup()
{
   console.log('Start_Time : '+new Date().toLocaleString());
}

//vus
export default function()
{

   response1  = http.get('https://randomuser.me/api');

   console.log('Status Code is   : '+response1.status);
   //console.log('Response Body is : '+response1.body);

   sleep(sleep_time);

   response2 = http.post('https://reqres.in/api/login',{"email": "eve.holt@reqres.in","password": "cityslicka"},{headers: { },});
   console.log('Status Code is   : '+response2.status);
   //console.log('Response Body is : '+response2.body);

   
}

export function teardown()
{
  console.log('End_Time : '+new Date().toLocaleString());
}