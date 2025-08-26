create image
```bash
docker build -t papastepanhdi/devops-with-kubernetes:1.10-generator ./generator
docker build -t papastepanhdi/devops-with-kubernetes:1.10-web ./web
```

push image
```bash
docker push papastepanhdi/devops-with-kubernetes:1.10-generator
docker push papastepanhdi/devops-with-kubernetes:1.10-web
```


```bash
kubectl apply -f manifests
```

see logs