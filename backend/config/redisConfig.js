import { createClient } from "redis";

// setting up redis db
const client = createClient({
  password: "Q1ntBgsuyIZURHAeougbD3W8ooc8vaJX",
  socket: {
    host: "redis-16479.c264.ap-south-1-1.ec2.redns.redis-cloud.com",
    port: 16479,
  },
});

client
  .connect()
  .then(() => {
    console.log("Redis connected");
  })
  .catch(console.error);

export default client
