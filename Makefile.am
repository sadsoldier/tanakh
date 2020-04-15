#
#
#
AUTOMAKE_OPTIONS = foreign no-dependencies no-installinfo

SUFFIXES = .go .c
OBJEXT= none

EXTRA_PROGRAMS = builder
builder_SOURCES = builder.go

GOFLAGS = -ldflags="-s -w"

builder$(EXEEXT): $(builder_SOURCES)
	$(GO) build -o builder$(EXEEXT) $(builder_SOURCES)

sbin_PROGRAMS = tanakh

tanakh_SOURCES = tanakh.go

EXTRA_tanakh_SOURCES = \
	config/config.go \
	daemon/daemon.go \
	tools/file.go \
	bundle/public.go \
	server/server.go \
	server/user-controller/user_controller.go \
	server/user-model/user_model.go \
	server/sample-controller/sample_controller.go \
	server/sample-model/sample_model.go

bundle/public.go: builder$(EXEEXT) public/index.html
	test -d bundle || $(MKDIR_P) bundle
	./builder$(EXEEXT) --package=bundle -o bundle/public.go public/

tanakh$(EXEEXT): $(tanakh_SOURCES) $(EXTRA_tanakh_SOURCES)
	$(GO) build $(GOFLAGS) -o tanakh$(EXEEXT) $(tanakh_SOURCES)

EXTRA_DIST = README.md public/ \
	go.mod \
	go.sum \
	\
	front/src/ \
	front/public/ \
	\
	front/.gitignore \
	front/babel.config.js \
	front/package-lock.json \
	front/package.json \
	front/postcss.config.js \
	front/README.md \
	\
	front/webpack.config.devel.js \
	front/webpack.config.prod.js

clean-local:
	rm -f builder$(EXEEXT)
	rm -rf autom4te.cache

install-data-local:
	test -z $(DESTDIR)$(APP_LIBDIR) || $(MKDIR_P) $(DESTDIR)$(APP_LIBDIR)
#	cp -r public $(DESTDIR)$(APP_LIBDIR)
	test -z $(DESTDIR)$(APP_CONFDIR) || $(MKDIR_P) $(DESTDIR)$(APP_CONFDIR)
	test -z $(DESTDIR)$(APP_LOGDIR) || $(MKDIR_P) $(DESTDIR)$(APP_LOGDIR)
	test -z $(DESTDIR)$(APP_RUNDIR) || $(MKDIR_P) $(DESTDIR)$(APP_RUNDIR)
	test -z $(DESTDIR)$(APP_DATABASEDIR) || $(MKDIR_P) $(DESTDIR)$(APP_DATABASEDIR)
#EOF
