import axios from "axios";

export const testAxios = async () => {
  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/posts/1",
  );
  console.log(data);
};
