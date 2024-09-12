import Form from "@/components/Form";
import React from "react";

function create() {
  return (
    <section className="flex justify-center flex-col items-center p-8 container m-auto">
      <div className="text-5xl font-bold p-4 bg-gradient-to-r from-orange-400 to-white bg-clip-text text-transparent">
        Create Post
      </div>
      <div>
        <p className="text-xl text-center text-gray-300">
          Create and share amazing prompts with the world, and let your
          imagination soar on any AI-powered platform.
        </p>
      </div>
      <div className="w-full">
        <Form />
      </div>
    </section>
  );
}

export default create;
