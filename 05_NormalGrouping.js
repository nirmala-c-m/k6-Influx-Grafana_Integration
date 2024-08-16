import http from 'k6/http';
import { sleep, group } from 'k6';
import { check } from 'k6';
import { SharedArray } from 'k6/data';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';

// Load the CSV file
const csvData = new SharedArray('users', function () {
    return papaparse.parse(open('parameterizationSample.csv'), { header: true, skipEmptyLines: true }).data;
});

export default function () {
    const userData = csvData[0];

    const p_username = userData['email'];
    const p_password = userData['password'];

  
    const json_payload = JSON.parse(userData['json_payload']);

    // Construct headers from CSV
    const headers = {};
    const headersList = userData['headers'].split(';');
    headersList.forEach(header => {
        const [key, value] = header.split(':');
        headers[key.trim()] = value.trim();
    });

    group('API Tests', function () {
        group('Login', function () {
            const loginRes = http.post('https://reqres.in/api/login', {
                email: p_username,
                password: p_password,
            }, { headers: headers });
            check(loginRes, { 'login successful': (r) => r.status === 200 });
            console.log('Login Response: ', loginRes.body);
            sleep(1);
        });

        group('Post Payload', function () {
            const postRes = http.post('https://reqres.in/api/some-endpoint', JSON.stringify(json_payload), { headers: headers });
            check(postRes, { 'post successful': (r) => r.status === 200 });
            console.log('Post Payload Response: ', postRes.body);
            sleep(1);
        });

        group('Get User Details', function () {
            const userRes = http.get('https://reqres.in/api/users/2');
            check(userRes, { 'get user details successful': (r) => r.status === 200 });
            console.log('User Details Response: ', userRes.body);
            sleep(1);
        });

        group('Logout', function () {
            const logoutRes = http.post('https://reqres.in/api/logout');
            check(logoutRes, { 'logout successful': (r) => r.status === 200 });
            console.log('Logout Response: ', logoutRes.body);
            sleep(1);
        });
    });
}
