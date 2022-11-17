## About
CSV reader is a full-stack web application with Python Flask REST API and  React frontend. The backend API accepts a customer CSV file and assigns segments to each customer record by making calls to EA Prizm API. 

## Check out the user flow


https://user-images.githubusercontent.com/28469448/202488691-37c49a13-c104-40f7-b7d6-0cf746567d6b.mp4




## Primary Backend Features:
This app uses GRequests, instead of making requests one row at a time, which allows Requests with Gevent to make asynchronous HTTP Requests easily. As a result, the rate of fetching and assigning segment codes to customer records has been improved from 48 seconds to 8 seconds. 

## Primary Frontend Features:
The frontend uses MaterialUI's data grid to enhance the power and flexibility of customers' table. It makes it easy for users to perform functionalities such as sorting and pagination. Especially for the given records, it becomes very straightforward to check the most frequent customers, their favourite store, and the smallest amount spent in a store. 

The frontend also includes a pie chart showing the distribution of customer segments reflected in the record. This feature can be further expanded to display more visualized insights. 

## Test:
The backend has been tested with Python unittest module. Due to the size of the project, tests are kept in one file, tests.py. To run the test: python -m tunittest tests.py
