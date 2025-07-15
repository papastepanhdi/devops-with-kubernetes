create image
```bash
docker build -t papastepanhdi/devops-with-kubernetes:1.5 .   
```


push image
```bash
docker push papastepanhdi/devops-with-kubernetes:1.5
```

create deployment
```bash
kubectl create deployment the-project-step-3 `
  --image=papastepanhdi/devops-with-kubernetes:1.5 `
  -o yaml `
  > ./manifests/deployment.yaml
```

Stop the deployment and manually add the 
```bash
spec.template.spec.containers
        ports:
          - containerPort: 8081
        env:
          - name: PORT
            value: "8081"
            ...
```

```bash
kubectl apply -f ./manifests/deployment.yaml
```


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
kubectl logs -f the-project-step-3-59665d55df-x447w
```

access all env vars
```bash
 kubectl exec the-project-step-3-59665d55df-x447w -- printenv
```

use port-forwarding to access the application
```bash
kubectl port-forward the-project-step-3-59665d55df-x447w 8081:8080

```