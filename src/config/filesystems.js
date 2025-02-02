const path = require('path');

module.exports = {
  default: 'local',

  disks: {
    local: {
      driver: 'local',
      root: path.join(__dirname, '..', 'storage'),
    },

    s3: {
      driver: 's3',
      key: process.env.AWS_ACCESS_KEY_ID,
      secret: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_DEFAULT_REGION || 'us-east-1',
      bucket: process.env.AWS_BUCKET,
    },

    // Additional disks can be added here
  },
};
