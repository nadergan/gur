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


