import Blogs from "./Blogs";

const Home = (props) => {
  const { showAlert } = props;
  return (
    <div>
      <Blogs showAlert={showAlert} />
    </div>
  );
};

export default Home;
