import Nav from "@/components/Nav";
import SessionWrapper from "@/components/SessionWrapper";
import "@/styles/globals.css";
export const metadata = {
  title: "Prompts",
  description: "commonly used prompts",
};
const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <SessionWrapper>
        <body>
          <main>
            <div className="w-full min-h-screen bg-zinc-900 text-white">
              <div className="container m-auto">
                <Nav />
              </div>
              {children}
            </div>
          </main>
        </body>
      </SessionWrapper>
    </html>
  );
};

export default RootLayout;
