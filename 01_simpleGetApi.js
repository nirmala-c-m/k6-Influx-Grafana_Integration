import http from 'k6/http';

var response;

export default function()
{
   response  = http.get('https://randomuser.me/api');
   console.log('Response Body is : '+response.body);
   console.log('Status Code is   : '+response.status);
   console.log('Response Size is : '+response.body.length);
   // let jsonResponse = JSON.parse(response.body);
   // let firstName = jsonResponse.results[0].name.first;
   response.json().results[0].name.first;
   console.log('First Name is: ' + firstName);
   
}