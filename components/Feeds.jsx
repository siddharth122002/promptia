"use client";

import { useEffect, useState } from "react";
import Prompts from "./Prompts";
function Feeds() {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/prompt");
        const data = await res.json();
        // console.log(data);
        setData(data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchPosts();
  }, []);
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };
  const handleEdit = async () => {};
  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPosts = myPosts.filter((item) => item._id !== post._id);

        setMyPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className=" w-full">
      <input
        value={searchText}
        onChange={handleSearchChange}
        placeholder="Search for tag or username"
        className="mt-8 md:w-2/4 block m-auto p-2 text-black outline-none rounded-md w-full"
        type="text"
      />
      <div className="flex flex-wrap justify-center  mt-16 ">
        {data.map((data, i) => (
          <Prompts
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            data={data}
            key={i}
          />
        ))}
      </div>
    </div>
  );
}

export default Feeds;
