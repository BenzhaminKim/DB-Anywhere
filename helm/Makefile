deploy-backend:
	helm upgrade db-anywhere-backend backend/ -n anywhere --create-namespace --install
deploy-postgres:
	helm upgrade db-anywhere-postgres postgres/ -n anywhere --create-namespace --install
deploy-frontend:
	helm upgrade db-anywhere-frontend frontend/ -n anywhere --create-namespace --install
