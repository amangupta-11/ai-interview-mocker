/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://neondb_owner:npg_Rtq1xmVKviQ6@ep-sweet-recipe-a5313fbv-pooler.us-east-2.aws.neon.tech/ai-interview-mocker?sslmode=require',
    }
  };