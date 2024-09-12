"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
function Form() {
  const [prompts, setPrompts] = useState("none");
  const [tags, setTags] = useState("#test");
  const { data: session, status } = useSession();
  // console.log(status);
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          creator: session?.user.id,
          prompt: prompts,
          tag: tags,
        }),
      });
      if (res.ok) {
        router.push("/");
      }
      // const response = await res.json();
      // console.log(response);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col justify-center  text-xl font-bold mt-8 gap-3">
          <label htmlFor="prompt">Your Prompt</label>
          <textarea
            onChange={(e) => setPrompts(e.target.value)}
            rows={3}
            className="text-black rounded-lg p-2 font-normal outline-none"
            name="prompt"
            id="prompt"
            required
            placeholder="Write your post here"
          ></textarea>
        </div>

        <div className="flex flex-col justify-center  text-xl gap-3 mt-8 font-bold">
          <label htmlFor="tag">Tag (#product, #webdev, #idea,...)</label>
          <textarea
            onChange={(e) => setTags(e.target.value)}
            className="text-black font-normal rounded-lg p-2 outline-none"
            name="tag"
            required
            id="tag"
            placeholder="#Tag"
          ></textarea>
        </div>
        <div className="w-fit ml-auto flex my-4 gap-3">
          <Link href="/">
            <button className="hover:text-gray-300 transition-all duration-300">
              cancel
            </button>
          </Link>

          <button
            type="submit"
            className="bg-orange-600 px-3 rounded-full transition-all duration-300 hover:text-orange-600 hover:bg-transparent"
          >
            create
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;
