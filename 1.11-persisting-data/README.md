1.11 Persisting Data

This exercise demonstrates how to persist data in Kubernetes using volumes and persistent volume claims.

## Building and Deploying

### 1. Build Docker Images

From inside the `apps/log-output/` folder (where Dockerfile and index.js live):

```bash
# Build the log-output application
docker build -t papastepanhdi/devops-with-kubernetes:1.11-log-output .

# Build the ping-pong application  
docker build -t papastepanhdi/devops-with-kubernetes:1.11-ping-pong .
```

### 2. Push Images to Registry

```bash
docker push papastepanhdi/devops-with-kubernetes:1.11-log-output
docker push papastepanhdi/devops-with-kubernetes:1.11-ping-pong
```

### 3. Deploy to Kubernetes

```bash
kubectl apply -R -f manifests/
```

## What This Exercise Covers

- Persistent Volume Claims (PVC) for data persistence
- Shared volumes between containers
- Data persistence across pod restarts
- Volume mounting in Kubernetes deployments
```