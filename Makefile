.PHONY: service-a service-b cluster docker creds ingress label

cluster: 
	az group create --name myAKSrg --location westeurope 
	az aks create --resource-group myAKSrg --name myAKSCluster --node-count 2 --enable-addons monitoring,http_application_routing  --generate-ssh-keys --enable-rbac  --network-plugin azure --network-policy azure

docker:
	cd service-a && docker build -t naderganayem/service-a . && docker push naderganayem/service-a  

creds:
	az account set --subscription 29c7de46-b5aa-4b41-97fa-034f18193e61
	az aks get-credentials --resource-group myAKSrg --name myAKSCluster

service-a:
	kubectl create namespace service-a || true
	cd kubernetes && kubectl apply -f serviceA.yaml && cd ..

service-b:
	kubectl create namespace service-b || true
	cd kubernetes && kubectl apply -f serviceB.yaml && cd ..
	
ingress:
	helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
	kubectl create namespace ingress-basic || true
	helm install nginx-ingress ingress-nginx/ingress-nginx \
    	--namespace ingress-basic \
    	--set controller.replicaCount=2 \
    	--set controller.nodeSelector."beta\.kubernetes\.io/os"=linux \
    	--set defaultBackend.nodeSelector."beta\.kubernetes\.io/os"=linux
	
	# Add label to all pods for the network policy filtering
	kubectl label namespace ingress-basic role=ingress
	set -x; for p in $(shell kubectl -n ingress-basic get pods -ojsonpath='{.items[*].metadata.name}' ); do kubectl -n ingress-basic label pod $$p app=ingress; done


label:
	set -x; for p in $(shell kubectl -n ingress-basic get pods -ojsonpath='{.items[*].metadata.name}' ); do kubectl -n ingress-basic label pod $$p app=ingress; done