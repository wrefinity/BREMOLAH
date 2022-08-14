build-dev:
	cd client && $(MAKE) build-dev
	cd server && $(MAKE) build-dev
run-dev:
	ENV=development docker-compose -f docker-compose-dev.yml up

###
build-local:
	cd client && $(MAKE) build-local
	cd server && $(MAKE) build-local

run-local:
	ENV=local docker-compose -f docker-compose-prod.yml up

### 
build-production:
	cd client && $(MAKE) build-production
	cd server && $(MAKE) build-production

run-production:
	ENV=production docker-compose -f docker-compose-prod.yml up

SSH_STRING:=root@104.131.22.28

ssh:
	ssh $(SSH_STRING)

copy-files:
	scp -r ./* $(SSH_STRING): /root/