import http from 'k6/http';
import { sleep } from 'k6';
import { check } from 'k6';
import { SharedArray } from 'k6/data';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';

// Load the CSV file
const csvData = new SharedArray('users', function () {
    return papaparse.parse(open('parameterizationSample.csv'), { header: true }).data;
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

    // Construct params from CSV (if any)
    const params = {};
    for (let key in userData) {
        if (key.startsWith('paramKey')) {
            const paramValueKey = 'paramValue' + key.slice(-1);
            params[userData[key]] = userData[paramValueKey];
        }
    }

    // Convert params object to query string
    const queryString = new URLSearchParams(params).toString();

    // Make the POST request
    const url = `https://reqres.in/api/login?${queryString}`;
    const response2 = http.post(url, JSON.stringify(json_payload), { headers: headers });

    check(response2, { 'is post responsecode 200': (r) => r.status === 200 });

    console.log(`Response status: ${response2.status}`);
    console.log(`Response body: ${response2.body}`);
    sleep(1);
}
