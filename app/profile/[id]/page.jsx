"use client";
import Prompts from "@/components/Prompts";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function page() {
  const [data, setData] = useState([]);
  const pathName = usePathname();
  const id = pathName.split("/").pop();
  useEffect(() => {
    const getPrompts = async () => {
      const res = await fetch(`/api/prompt/${id}`);
      const response = await res.json();
      setData(response);
    };
    getPrompts();
  }, []);
  return (
    <div className="container m-auto mt-8 ">
      <div className="ml-8">
        <h1 className="font-bold text-6xl bg-gradient-to-r from-orange-400 to-white bg-clip-text text-transparent mb-4 h-20">
          My Profile
        </h1>
        <p className="text-xl font-semibold">
          Welcome to your personalized profile page. Share your exceptional
          prompts and inspire others with the power of your imagination.
        </p>
      </div>
      <div className="flex flex-wrap mt-8 ">
        {data.map((data, i) => (
          <Prompts data={data} key={i} />
        ))}
      </div>
    </div>
  );
}

export default page;
