PACKAGE_VERSION=$(shell npx -c 'echo "$$npm_package_version"')
default:
	docker build --build-arg NODE_ENV=production -t "sentry-webhook-to-stride-room:$(PACKAGE_VERSION)-production" .
default-development:
	docker build --build-arg NODE_ENV=development -t "sentry-webhook-to-stride-room:$(PACKAGE_VERSION)-development" .

run: default
	docker run -e NODE_ENV=production --env-file ./.env -expose -p 127.0.0.1:8080:8080/tcp sentry-webhook-to-stride-room:$(PACKAGE_VERSION)-production
run-development: default-development
	docker run -e NODE_ENV=development --env-file ./.env -expose -p 127.0.0.1:8080:8080/tcp sentry-webhook-to-stride-room:$(PACKAGE_VERSION)-development