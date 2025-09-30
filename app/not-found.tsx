import type { Metadata } from "next";
import NotFound from "./not-found.client";

export const metadata: Metadata = {
  title: "404 - Page Not Found - Note Hub",
  description: "The page you are looking for does not exist on Note Hub",
  openGraph: {
    title: "404 - Page Not Found - Note Hub",
    description: "The page you are looking for does not exist on Note Hub",
    url: "https://08-zustand-orcin-five.vercel.app/not-found",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Note Hub",
      },
    ],
  },
};

const NotFoundPage = () => {
  return <NotFound />;
};

export default NotFoundPage;
