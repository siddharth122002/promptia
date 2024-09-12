import Feeds from "@/components/Feeds";

function Home() {
  return (
    <section className="flex justify-center flex-col items-center p-8 container m-auto">
      <div className="text-5xl font-bold p-4 bg-gradient-to-r from-orange-400 to-white bg-clip-text text-transparent">
        AI Powered Prompts
      </div>
      <div>
        <p className="text-xl text-center text-gray-300">
          Prompts is an open-source AI prompting tool for modern world to
          discover, create and share creative prompts.
        </p>
      </div>
      <Feeds />
    </section>
  );
}

export default Home;
