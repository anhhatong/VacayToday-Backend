const env = {
  local: {
    DBNAME: process.env.DBNAME || 'postgres',
    DBPASSWORD: process.env.DBPASSWORD || 'maddietong!',
    HOST: 'localhost',
    PORT: process.env.DBPORT || 5432,
  },
  prod: {
    DBNAME: 'd2o11c8cu6a030',
    DBPASSWORD:
      '459f8596bc0090b2ec09a5e2dddac676a5e757e96e2523ae3ef0f849e67e33bf',
    HOST: 'ec2-52-54-212-232.compute-1.amazonaws.com',
    PORT: 5432,
  },
};

export default env;
