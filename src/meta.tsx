import Helmet from "react-helmet";

const AppMeta = () => {
  return (
    <Helmet>
      {/** Default */}
      <meta property="og:title" content="ELearning Management Platform" />
      <meta
        property="og:description"
        content="A ELearning Management Platform"
      />
      <meta property="og:image" content="" />
      <meta property="og:url" content="" />
      <meta property="og:type" content="website" />

      {/** Twitter */}
      <meta name="twitter:title" content="ELearning Management Platform" />
      <meta
        name="twitter:description"
        content="A ELearning Management Platform"
      />
      <meta name="twitter:image" content="" />
      <meta name="twitter:card" content="" />
    </Helmet>
  );
};

export default AppMeta;
