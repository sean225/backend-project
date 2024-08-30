# YouTube Subscribers API

This is a Node.js application that provides RESTful APIs to retrieve YouTube subscribers data. The application has three API endpoints that can be accessed via HTTP requests.

## API Endpoints

### 1. GET `/subscribers`
This endpoint returns a list of YouTube subscribers with their subscriber count.

- **Request URL:** `http://localhost:3000/subscribers`
- **Request Method:** `GET`

### 2. GET `/subscribers/names`
This endpoint returns a list of YouTube subscribers with their name and subscribed channel.

- **Request URL:** `http://localhost:3000/subscribers/names`
- **Request Method:** `GET`

### 3. GET `/subscribers/:id`
This endpoint returns the details of a specific YouTube subscriber by their ID.

- **Request URL:** `http://localhost:3000/subscribers/:id`
- **Request Method:** `GET`

## API Schema Documentation

### Introduction
This API provides endpoints to retrieve information about YouTube subscribers. The API supports the HTTP GET method to retrieve subscriber data.

### Base URL
The base URL for all endpoints is `http://localhost:3000`.

### Authentication
No authentication is required to access any of the endpoints.

### Error Codes
The API may return the following error codes along with error messages:

| Error Code | Description              |
|------------|--------------------------|
| 200        | Response OK              |
| 400        | Bad Request              |
| 404        | Not Found                |
| 500        | Internal Server Error    |

## Endpoints

### 1. GET `/subscribers`
This endpoint returns a list of YouTube subscribers with their subscriber count.

- **Request URL:** `GET http://localhost:3000/subscribers`
- **Request Parameters:** None
- **Response:**
  ```json
  [
    {
      "_id": "integer",
      "name": "string",
      "subscribedChannel": "string",
      "subscribedDate": "date"
    }
  ]
