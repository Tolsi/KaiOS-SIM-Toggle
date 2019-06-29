rm -f sim-manager.zip
zip -r application.zip *.js *.html *.css icons/*.png manifest.webapp 
zip -r second-sim-toggle.zip application.zip metadata.json
rm -f application.zip
