# Kategorie

## Pour lancer l'application : 
```shell
docker compose up -d --build
```

## Pour accéder à la documentation Swagger de l'application :
[http://localhost:8080/swagger-ui/index.html?urls.primaryName=springdocDefault#/](http://localhost:8080/swagger-ui/index.html?urls.primaryName=springdocDefault#/)

## Pour accéder à l'application front :
[http://localhost:4200](http://localhost:4200)

### Accès en lecture seule :
L'application par défaut offre un accès en lecture seule pour visualiser les catégories en tant qu'utilisateur anonyme.

### Accès à l'écriture :
Si l'utilisateur tente d'effectuer une opération d'écriture (création, modification, suppression), le système le redirige vers l'authentification sur Keycloak, si celui-ci n'est pas connecté.

#### Les identifiants pour le compte admin : 
```
login: admin
password: admin
```
#### Lien github: 
[https://github.com/tpfullstack/Kategorie.git] (https://github.com/tpfullstack/Kategorie.git)