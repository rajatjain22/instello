import "./globals.css";
import { Toaster } from "react-hot-toast";
import { UserContextProvider } from "./_context/User";
import { PostContextProvider } from "./_context/Post";
import Provider from "./Provider";

export const metadata = {
  title: "Home",
  description: "Generated by Rajat jain",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="">
      <body>
        <UserContextProvider>
          <PostContextProvider>
            <Provider>{children}</Provider>
            <Toaster position="bottom-center" reverseOrder={false} />
          </PostContextProvider>
        </UserContextProvider>
      </body>
    </html>
  );
}
