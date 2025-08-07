# Ping-Pong Counter Application

A simple Express.js application that implements a ping-pong counter service, responding to requests with an incrementing counter.

## Features

- **Ping-Pong Endpoint**: `/pingpong` - Returns "pong {counter}" with an incrementing counter
- **Health Check**: `/health` - Returns application health status and current counter
- **Web Interface**: `/` - Simple web page to interact with the counter
- **In-Memory Counter**: Counter resets when application restarts
- **Request Logging**: Console logging for each ping-pong request

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

## Usage

### Start the application:
```bash
npm start
```

### For development with auto-restart:
```bash
npm run dev
```

The server will start on port 3000 by default (configurable via PORT environment variable).

## API Endpoints

### GET /pingpong
Returns a ping-pong response with incrementing counter.

**Response:**
```
pong 0
```
(counter increments with each request: pong 1, pong 2, etc.)

### GET /health
Returns application health status.

**Response:**
```json
{
  "status": "healthy",
  "requestCount": 5,
  "uptime": 123.456
}
```

### GET /
Web interface for interacting with the counter.

## Example Usage

```bash
# First request
curl http://localhost:3000/pingpong
# Response: pong 0

# Second request  
curl http://localhost:3000/pingpong
# Response: pong 1

# Third request
curl http://localhost:3000/pingpong
# Response: pong 2
```

## Environment Variables

- `PORT`: Server port (default: 3000)

## Technical Details

- Built with Express.js
- In-memory counter storage
- Console logging for request tracking
- Web interface for easy testing
- Health check endpoint for monitoring

create image
```bash
docker build -t papastepanhdi/devops-with-kubernetes:1.9 .   
```

push image
```bash
docker push papastepanhdi/devops-with-kubernetes:1.9
```


```bash
kubectl apply -f manifests
```

see logs
```bash
 kubectl logs -l app=ping-pong
```