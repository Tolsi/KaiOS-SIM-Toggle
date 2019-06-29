rm -f second-sim-toggle-*.zip
zip -r application.zip *.js *.html *.css icons/*.png manifest.webapp 
zip -r second-sim-toggle-$(git describe --always --tags).zip application.zip metadata.json
rm -f application.zip
