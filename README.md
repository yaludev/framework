# UNDER CONSTRUCTION

## Warning : Do not use in PRODUCTION


## Initialize Framework

```js 
require("dotenv").config();
const { container, bootstrap,config } = require('@yaludev/framework');
const path = require('path');

// Bootstrap with configuration
const server = bootstrap({
  system:{
    routeFile : "route.js",
    configFolder:"config",
    moduleFolder:"apps",
    basePath: path.resolve("src"),
    baseAlias:"@"
  },
  appName:"My Application",
});

server.listen(port, () => {
  console.log(`Imo project listening at http://localhost:${port}`);
});

```

### Devs

```
    "@yaludev/framework": "file:../yaludev-framework",
```