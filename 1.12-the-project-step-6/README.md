create image
```bash
docker build -t papastepanhdi/devops-with-kubernetes:1.12 .
```

push image
```bash
docker push papastepanhdi/devops-with-kubernetes:1.12
```

deploy the application to Kubernetes
```bash
kubectl apply -f manifests/
```

deploy the service
```bash
kubectl apply -f manifests/service.yaml
```

check Deployment resources
```bash
kubectl get deployments
```

check pods
```bash
kubectl get pods
```