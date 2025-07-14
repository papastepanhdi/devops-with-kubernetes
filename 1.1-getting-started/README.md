create image
```bash
docker build -t papastepanhdi/devops-with-kubernetes:1.1 .   
```

push image
```bash
docker push papastepanhdi/devops-with-kubernetes:1.1  
```

create deployment
```bash
kubectl create deployment timestamp-hashgenerator --image=papastepanhdi/devops-with-kubernetes:1.1  -o yaml > ./deployment.yml
```

see logs
```bash
kubectl logs -f timestamp-hashgenerator-5787f5658b-w7lqr
```
