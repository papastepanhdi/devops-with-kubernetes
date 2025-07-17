create image
```bash
docker build -t papastepanhdi/devops-with-kubernetes:1.7 .   
```

push image
```bash
docker push papastepanhdi/devops-with-kubernetes:1.7
```


```bash
kubectl apply -f manifests
```

see logs
```bash
 kubectl logs -l app=log-output-ingress
```