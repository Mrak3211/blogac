import React, { useContext } from "react";
import BlogContext from "../Context/Blogs/BlogContext";

const BlogItem = (props) => {
  const context = useContext(BlogContext);
  const { deleteBlog } = context;
  const { blog, updateBlog } = props;
  const imgPath = `http://localhost:4000/public/uploads/${blog.image}`;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <img src={imgPath} className="card-img-top" alt="..." />
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-text" style={{ width: 219 }}>
              {blog.title}
            </h5>
            <i
              className="fa-solid fa-trash mx-2"
              onClick={() => {
                deleteBlog(blog._id);
                props.showAlert("Note Deleted Successfully", "success");
              }}
            ></i>
            <i
              className="fa-solid fa-pen-to-square mx-2"
              onClick={() => {
                updateBlog(blog);
              }}
            ></i>
          </div>
          <p className="card-text">{blog.description} </p>
        </div>
      </div>
    </div>
  );
};

export default BlogItem;
