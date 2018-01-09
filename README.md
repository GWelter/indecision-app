yarn install
babel src/app.js --out-file=public/scripts/app.js --presents=env,react --watch
live-server public