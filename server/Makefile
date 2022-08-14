build-dev:
	docker build \
	-t api-server \
	--build-arg NODE_ENV=development \
	--build-arg MONGO_URI_DB=mongodb://127.0.0.1:27017/bremola \
	-f Dockerfile .
	
build-local:
	docker build \
	-t api-server-local:local \
	--build-arg NODE_ENV=development \
	--build-arg MONGO_URI_DB=mongodb://mongo:27017/bremola \
	-f Dockerfile .

build-production:
	docker build \
	-t api-server-production:production \
	--build-arg NODE_ENV=production \
	--build-arg MONGO_URI_DB=mongodb+srv://breemolah:PU84O6BOkXdYo7x2@cluster0.j1o0hbd.mongodb.net/breemolah \
	-f Dockerfile .