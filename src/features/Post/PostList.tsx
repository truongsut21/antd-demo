import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "./postSlice";
import { AppDispatch, RootState } from "../../redux/store";
import React from "react";
import { Table } from "antd";

const PostsComponent: React.FC = () => {
  const count = useSelector((state: RootState) => state.counter.value);

  const dispatch = useDispatch<AppDispatch>(); // Use AppDispatch here
  const posts = useSelector((state: RootState) => state.posts.posts);
  const status = useSelector((state: RootState) => state.posts.status);
  const error = useSelector((state: RootState) => state.posts.error);

  React.useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>{error}</p>;

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "body",
      dataIndex: "body",
      key: "body",
    },
  ];

  return <Table columns={columns} dataSource={posts} />;
};

export default PostsComponent;
