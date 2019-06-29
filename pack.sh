rm -f sim-manager.zip
zip -r application.zip app.js index.html icons manifest.webapp mithril.js styles.css
zip -r sim-manager.zip application.zip metadata.json
rm -f application.zip