import React, { useContext, useState } from "react";
import BlogContext from "../Context/Blogs/BlogContext";

const AddBlog = (props) => {
  const context = useContext(BlogContext);
  const { addBlog } = context;
  const [blog, setBlog] = useState({
    title: "",
    description: "",
    pic: null,
  });

  const handleClick = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", blog.title);
    formData.append("description", blog.description);
    formData.append("pic", blog.pic);
    addBlog(formData);
    setBlog({ title: "", description: "", pic: null });
    props.showAlert("Blog Created Successfully", "success");
  };

  const onChange = (e) => {
    if (e.target.name === "pic") {
      setBlog({ ...blog, [e.target.name]: e.target.files[0] });
    } else {
      setBlog({ ...blog, [e.target.name]: e.target.value });
    }
  };

  return (
    <div>
      <div className="my-1">
        <h1>Add A Blog</h1>
      </div>
      <div>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="title"
              onChange={onChange}
              value={blog.title}
              minLength={5}
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
              aria-describedby="description"
              onChange={onChange}
              value={blog.description}
              minLength={5}
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
              accept="image/*"
            />
          </div>
          <button
            disabled={
              blog.title.length < 5 || blog.description.length < 5 || !blog.pic
            }
            type="submit"
            className="btn btn-primary"
            onClick={handleClick}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
