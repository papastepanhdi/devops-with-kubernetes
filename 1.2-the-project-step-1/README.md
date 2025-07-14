create image
```bash
docker build -t papastepanhdi/devops-with-kubernetes:1.2 .   
```


push image
```bash
docker push papastepanhdi/devops-with-kubernetes:1.2
```

create deployment
```bash
kubectl create deployment the-project-step-1 `
  --image=papastepanhdi/devops-with-kubernetes:1.2 `
  -o yaml `
  > ./deployment.yml
```

Stop the deployment and manually add the 
```bash
        ports:
          - containerPort: 3020
        env:
          - name: PORT
            value: "3020"
            ..
            
            
```

```bash
kubectl apply -f deployment.yml
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
kubectl logs -f the-project-step-1-5448446999-ffdzf
```
