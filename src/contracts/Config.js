class Config {
    constructor(container, config) {
        this.container = container;
        this.setConfig(config);

        console.log("config initialized")
      }
      setConfig = (config) => {
        this.config = config;
        return this;
      }
      _transformName = (name) => {
        const [] = name.split(".")
      }
      _getConfigFileData = (fileName) => {
       
      }
      get = (name) => {
       
        console.log("config name called ", {name,bb:this.config})
        return this.config[name] ?? null;
      }
      getConfig = () => {
        // const defaultConfig = this.config();
        const currentConfig = {
          // ...defaultConfig,
          ...config,
        };
        return currentConfig;
      };
}
module.exports =  Config;
