import { useState } from "react";
import BlogContext from "./BlogContext";

const BlogState = (props) => {
  const host = "http://localhost:4000";
  const blogInitial = [];
  const [blogs, setBlogs] = useState(blogInitial);

  // Add a Blog
  const addBlog = async (formData) => {
    try {
      const response = await fetch(`${host}/api/blog/createpost`, {
        method: "POST",
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to add blog");
      }
      // console.log("response========+>", await response);
      const json = await response.json();
      // console.log("json===========>", json);
      const data = json.savedBlogs;
      setBlogs((prevBlogs) => [...prevBlogs, data]);
    } catch (error) {
      console.error(error);
    }
  };

  // Get all Blogs
  const getBlogs = async () => {
    try {
      const response = await fetch(`${host}/api/blog/allblogs`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch blogs");
      }

      const json = await response.json();
      setBlogs(json);
    } catch (error) {
      console.error(error);
    }
  };

  // Edit a Blog
  const editBlog = async (formData) => {
    try {
      const response = await fetch(
        `${host}/api/blog/${formData.get("id")}/updateBlog`,
        {
          method: "PUT",
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to edit blog");
      }

      const json = await response.json();
      console.log(json);

      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) => {
          if (blog._id === formData.get("id")) {
            return {
              ...blog,
              title: formData.get("title"),
              description: formData.get("description"),
              pic: formData.get("pic"),
            };
          }
          return blog;
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  // Delete a Blog
  const deleteBlog = async (id) => {
    try {
      const response = await fetch(`${host}/api/blog/${id}deleteblog/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete blog");
      }

      const json = await response.json();
      console.log(json);

      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <BlogContext.Provider
      value={{ blogs, addBlog, getBlogs, editBlog, deleteBlog }}
    >
      {props.children}
    </BlogContext.Provider>
  );
};

export default BlogState;
