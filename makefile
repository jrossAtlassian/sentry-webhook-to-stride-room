PACKAGE_VERSION=$(shell npx -c 'echo "$$npm_package_version"')
default:
	docker build -t "sentry-webhook-to-stride-room:$(PACKAGE_VERSION)" .