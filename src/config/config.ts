require("dotenv").config();

export const Config = {
  port: parseInt(process.env.PORT, 10) || 3000,
};

export default () => Config;
