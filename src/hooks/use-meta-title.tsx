import { useEffect } from "react";

interface MetaTitleProps {
  title: string;
}

const useMetaTitle = ({ title }: MetaTitleProps) => {
  useEffect(() => {
    document.title = `${title} | Scholaro`;
  }, [title]);
};

export default useMetaTitle;
