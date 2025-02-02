class S3Driver {
    constructor(config) {
      AWS.config.update({
        accessKeyId: config.key,
        secretAccessKey: config.secret,
        region: config.region,
      });
      this.s3 = new AWS.S3();
      this.bucket = config.bucket;
    }
  
    async put(filePath, content) {
      const params = {
        Bucket: this.bucket,
        Key: filePath,
        Body: content,
      };
      return this.s3.upload(params).promise();
    }
  
    async get(filePath) {
      const params = {
        Bucket: this.bucket,
        Key: filePath,
      };
      const data = await this.s3.getObject(params).promise();
      return data.Body;
    }
  
    async exists(filePath) {
      const params = {
        Bucket: this.bucket,
        Key: filePath,
      };
      try {
        await this.s3.headObject(params).promise();
        return true;
      } catch (error) {
        if (error.code === 'NotFound') {
          return false;
        }
        throw error;
      }
    }
  
    async delete(filePath) {
      const params = {
        Bucket: this.bucket,
        Key: filePath,
      };
      return this.s3.deleteObject(params).promise();
    }
  }