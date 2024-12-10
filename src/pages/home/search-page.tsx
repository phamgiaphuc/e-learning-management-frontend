import useQuery from "@/hooks/use-query";
import { useEffect, useState } from "react";

const SearchPage = () => {
  const query = useQuery();
  const [key, setKey] = useState<string>("");

  useEffect(() => {
    setKey(query.get("key") || "");
  }, [query]);

  return <div>Search results for "{key}" (5)</div>;
};

export default SearchPage;
