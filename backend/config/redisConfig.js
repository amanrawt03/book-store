import { createClient } from "redis";

// setting up redis db
const client = createClient({
  password: "",
  socket: {
    host: "",
    port: ,
  },
});

client
  .connect()
  .then(() => {
    console.log("Redis connected");
  })
  .catch(console.error);

export default client
