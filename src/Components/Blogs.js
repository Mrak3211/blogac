import React, { useContext, useEffect, useRef, useState } from "react";
import BlogContext from "../Context/Blogs/BlogContext";
import BlogItem from "./BlogItem";
import AddBlog from "./AddBlog";
import { useNavigate } from "react-router-dom";

const Blogs = (props) => {
  const context = useContext(BlogContext);
  const { blogs, getBlogs, editBlog } = context;
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getBlogs();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);
  const ref = useRef(null);
  const refClose = useRef(null);
  const [blog, setBlog] = useState({
    id: "",
    title: "",
    description: "",
    pic: null,
  });

  const updateBlog = (currentBlog) => {
    ref.current.click();
    setBlog({
      id: currentBlog._id,
      title: currentBlog.title,
      description: currentBlog.description,
      pic: currentBlog.pic,
    });
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("id", blog.id);
    formData.append("title", blog.title);
    formData.append("description", blog.description);
    formData.append("pic", blog.pic);

    try {
      await editBlog(formData);
      refClose.current.click();
      props.showAlert("Blog Updated Successfully", "success");
      getBlogs();
    } catch (error) {
      props.showAlert("Failed to update blog", "error");
      console.error(error);
    }
  };

  const onChange = (e) => {
    if (e.target.name === "pic") {
      setBlog({ ...blog, [e.target.name]: e.target.files[0] });
    } else {
      setBlog({ ...blog, [e.target.name]: e.target.value });
    }
  };

  return (
    <>
      <AddBlog showAlert={props.showAlert} />
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit blog
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={blog.title}
                    aria-describedby="title"
                    onChange={onChange}
                    minLength={1}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    name="description"
                    value={blog.description}
                    onChange={onChange}
                    minLength={1}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="pic" className="form-label">
                    Image
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="pic"
                    name="pic"
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button
                disabled={blog.title.length < 1 || blog.description.length < 1}
                onClick={handleClick}
                type="button"
                className="btn btn-primary"
              >
                Update blog
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <h2>Your Blogs</h2>
        <div className="container">
          {blogs.length === 0 && "No Blogs To Display"}
        </div>
        {blogs.map((blog, index) => {
          return (
            <BlogItem
              showAlert={props.showAlert}
              key={index}
              updateBlog={updateBlog}
              blog={blog}
            />
          );
        })}
      </div>
    </>
  );
};

export default Blogs;
