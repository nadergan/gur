**Homework**

Create an Azure free subscription and in it create the following flow:
 
Cluster details

1. Use Azure and AKS-Engine (not pre-defined AKS solutions)
2. Set up K8S 1.15+ version or newer cluster, with RBAC enabled
3. Cluster should have 2 services – A and B
4. Cluster should have Ingress controller, redirecting traffic by URL: xxx/service-A or xxx/service-B
5. Service-A should not be able to “talk” with Service-B (policy disabled)
6. For Service A:write a script\application which retrieves the bitcoin value in dollar from an API on the web (you should find one) every minute and prints it, And also every 10 minutes it should print the average value of the last 10 minutes.
 
General Guideline
- Please, consider this as process for setting up “production-ready” cluster by all meaning, the following cluster buildout should be automated and fully repeatable
- Please, share cluster templates and yaml files as GitHub repo / zip file

**Solution:**

*Installed Environment*

Please go the following URLs to access the requested services:  

http://52.236.144.52/service-a  
http://52.236.144.52/service-b  


*Environment Setup:*

1. Create an AKS cluster on your Azure account:
Use the following command:  
``make cluster``

2. Deploy NGINX ingress Controller on the the Cluster
Use the following command:  
``make ingress``  

3. Deploy Service-A using the following command:  
``make service-a``  

4. Deploy Service-B using the following command:  
``make service-b``  

5. Determine the Ingress Controller IP address, please use the following command:  
``kubectl --namespace ingress-basic get services -o wide nginx-ingress-ingress-nginx-controller -o=jsonpath='{.status.loadBalancer.ingress[0].ip}'``  

*Accessing the Service:*  

To access the service, use your favourite browser and access these links:  

http://<IP>/service-a  
http://<IP>/service-b  





