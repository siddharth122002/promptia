"use client";

import { useState } from "react";
import tick from "../public/assets/tick.svg";
import copyy from "../public/assets/copy.svg";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
function Prompts({ data, handleDelete, handleEdit }) {
  const { data: session } = useSession();
  const [copy, setCopy] = useState("");
  const handleCopy = (prompt) => {
    setCopy(prompt);
    navigator.clipboard.writeText(prompt);
    setTimeout(() => {
      setCopy(false);
    }, 5000);
  };
  const userid = session?.user?.id;
  const postid = data._id;

  return (
    <div className=" border-gray-800 border-[1px] m-4 p-6 rounded-md w-fit mx-auto">
      <div className="flex gap-2 items-center ">
        <Link
          href={`/profile/${data.creator._id}`}
          className=" flex items-center gap-3 mr-8"
        >
          <Image
            src={data.creator.image}
            width={40}
            height={40}
            alt="profile"
            className="rounded-full "
          />
          <div>
            <p>{data.creator.username}</p>
            <p>{data.creator.email}</p>
          </div>
        </Link>
        <div>
          <Image
            src={copy === data.prompt ? tick : copyy}
            width={20}
            height={20}
            alt="copy"
            onClick={() => {
              handleCopy(data.prompt);
            }}
          />
        </div>
      </div>
      <p className="text-2xl mt-4">{data.prompt}</p>
      <p className="text-blue-400 text-lg">{data.tag}</p>
      {data.creator._id === session?.user?.id && (
        <div className="flex gap-5 mt-4">
          <button onClick={handleEdit} className="text-blue-400">
            Edit
          </button>
          <button
            onClick={() => handleDelete && handleDelete(data)}
            className="text-red-400"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default Prompts;
