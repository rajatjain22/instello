import { Inter } from "next/font/google";
import "./globals.css";
import MainComponent from "@/components/MainComponent/MainComponent";
import { UserContextProvider } from "./_context/User";
import { Toaster } from "react-hot-toast";
import { PostContextProvider } from "./_context/Post";
import "aos/dist/aos.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="">
      <body>
        <UserContextProvider>
          <PostContextProvider>
            <MainComponent>{children}</MainComponent>
            <Toaster position="bottom-center" reverseOrder={false} />
          </PostContextProvider>
        </UserContextProvider>
      </body>
    </html>
  );
}
