import http from 'k6/http';
import {sleep} from 'k6';
import {check} from 'k6';
import {SharedArray} from 'k6/data';
import {group} from 'k6';

import {findBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

var response1, response2, response3;
var sleep_time = 3;
const csvData = new SharedArray('users', function () {return papaparse.parse(open('sample.csv'), { header: true }).data; });

export const options = {

   vus: 3,
   iterations: 3,
   duration: '10s',
   summaryTrendStats: ["min","avg","max","p(90)"],
   blockHostnames: ['*.io'],
   thresholds:  {
      http_req_duration: ['p(90) < 100'],
     'group_duration{group:::T01_Transaction1}':['max>=0'],
     'group_duration{group:::T02_Transaction2}':['max>=0'],
     'group_duration{group:::T03_Transaction3}':['max>=0'],
    },
   summaryTimeUnit: 's', 
   stages: [
		{ duration: '60s', target: 10 }, // traffic ramp-up from 1 to 10 users over 1 minute.
		{ duration: '2m', target: 10 }, // stay at 10 users for 2 minutes
		{ duration: '60s', target: 0 }, // ramp-down to 0 users
	],
 };

export default function()
{

   var p_username = csvData[0]['email'];
   var p_password = csvData[0]['password'];
   
   group("T01_Transaction1", function(){
   response1  = http.get('https://randomuser.me/api');
   });

   const C_Name  = response1.json().results[0].name.first;
   const C_Title = findBetween(response1.body,"\"title\":\"","\",\"first");
   
   check(response1,{'is responsecode 200': (r)=> r.status === 200,'Text verified': (r)=> r.body.includes('title'),}); 
   
   sleep(sleep_time);

   group("T02_Transaction2", function(){
    response2 = http.post('https://reqres.in/api/login',{"email": ""+p_username+"","password": ""+p_password+""},{headers: { },});
   });
   
   check(response2,{'is post responsecode 200': (r)=> r.status === 200,}); 
   

   sleep(sleep_time);

   group("T03_Transaction3", function(){
   response3  = http.get('https://api.agify.io?name='+C_Name);
   });

   sleep(sleep_time)
   
}

export function handleSummary(data) {
   return {
     "result.html": htmlReport(data),
     stdout: textSummary(data, { indent: " ", enableColors: true }),
   };
}
