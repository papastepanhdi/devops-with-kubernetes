create image
```bash
docker build -t papastepanhdi/devops-with-kubernetes:1.8 .
```


push image
```bash
docker push papastepanhdi/devops-with-kubernetes:1.8
```

deploy the application to Kubernetes
```bash
kubectl apply -f manifests
```


```bash
kubectl apply -f ./manifests/deployment.yaml
```

deploy the service
```bash
kubectl apply -f manifests/service.yaml
```
localhost:8081 → (k3d forwards to) → port 8080

check Deployment resources
```bash
kubectl get deployments
```

check pods
```bash
kubectl get pods
```