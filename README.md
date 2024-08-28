# k6-InfluxDB-Grafana Integration

## Overview

This project demonstrates how to integrate k6, a load testing tool, with InfluxDB and Grafana for performance monitoring and visualization.<br> 
The k6 script provided simulates a user journey through a web application, while InfluxDB is used to store the test metrics, and Grafana is employed to visualize these metrics.


## Prerequisites
**Before you can run the tests, ensure you have the following tools installed:**

* 1. k6: Load testing tool for generating traffic and gathering performance metrics.
* 2. InfluxDB: Time-series database to store k6 metrics.
* 3. Grafana: Visualization tool to create dashboards and graphs based on InfluxDB data.
 
## Folder Structure

![Alt text](https://github.com/nirmala-c-m/k6-Influx-Grafana_Integration/blob/master/Screenshot%20from%202024-08-28%2016-31-17.png)
 
## Key k6 Features Used
* **Groups:** The user journey is divided into multiple groups for better metric collection and analysis.
* **Custom Metrics:** Custom Trend, Counter, and Gauge metrics are used to monitor specific actions.
* **Thresholds:** Performance thresholds are defined for each group to determine test success or failure.

## Example Command to Run k6 Test
**To run the k6 test, execute the following command:**
```
k6 run --out influxdb=http://localhost:8086/myk6db script.js
```
This command runs the k6 script and outputs the results to InfluxDB.
Ensure InfluxDB is running and replace http://localhost:8086/myk6db with your actual InfluxDB URL and database name.

## InfluxDB Configuration
**Ensure InfluxDB is running and correctly configured to receive data from k6. You can configure InfluxDB with the following steps:**

* 1. Install InfluxDB: Follow the installation instructions on the InfluxDB website.

* 2. Create a Database: Use the InfluxDB CLI to create a database for storing k6 metrics:
```
influx -execute 'CREATE DATABASE myk6db'
```

* 2. Start InfluxDB: Ensure the InfluxDB service is running:
```
influxd

```

## Grafana Dashboard Setup
* 1. **Install Grafana:**
     * Follow the installation instructions on the Grafana website.<br>
     https://grafana.com/docs/grafana/latest/setup-grafana/installation/
       <br>

       
* 2. **Add InfluxDB Data Source:**
     * Open Grafana and navigate to Configuration > Data Sources.
     * Add a new InfluxDB data source, pointing to your InfluxDB instance.
      <br>

      
* 3. **Create Dashboards:**
     * Use Grafana to create dashboards that visualize the k6 metrics stored in InfluxDB.
     * You can create graphs for various metrics like response times, error rates, and throughput.
<br>
By integrating k6 with InfluxDB and Grafana, you can effectively monitor and visualize the performance of your applications under load.<br>
The provided script and configuration should serve as a good starting point for your performance testing needs.
