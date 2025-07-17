create image
```bash
docker build -t papastepanhdi/devops-with-kubernetes:1.6 .
```


push image
```bash
docker push papastepanhdi/devops-with-kubernetes:1.6
```

deploy the application to Kubernetes
```bash
kubectl apply -f manifests/deployment.yaml
```


```bash
kubectl apply -f ./manifests/deployment.yaml
```

deploy the service
```bash
kubectl apply -f manifests/service.yaml
```
localhost:8082 → (k3d forwards to) → NodePort 30080 → Service port 8080 → Pod targetPort 8080

check Deployment resources
```bash
kubectl get deployments
```

check pods
```bash
kubectl get pods
```

see logs
```bash
kubectl logs -f the-project-step-4-59665d55df-x447w
```

access all env vars
```bash
 kubectl exec the-project-step-4-59665d55df-x447w -- printenv
```

use port-forwarding to access the application
```bash
kubectl port-forward the-project-step-4-59665d55df-x447w 8081:8080

```