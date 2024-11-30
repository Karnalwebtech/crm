import Post from '@/modules/karnalwebtech/post/Post'
import { Metadata } from 'next';
import React from 'react'
export const metadata: Metadata = {
  title:"All post",
  description: "Your go-to tech partner in Karnal, providing top-notch web development services and digital solutions.",
  keywords: ["web development", "Karnal web tech", "digital solutions", "SEO", "Next.js", "KarnalWebTech"],
  openGraph: {
    title: "KarnalWebTech",
    description: "Innovative web solutions for your business, designed by KarnalWebTech.",
    url: "https://www.karnalwebtech.com",
    siteName: "KarnalWebTech",
    images: [
      {
        url: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=490,fit=crop,q=95/m2WrzgBy7ZcEOgWj/logo1-1-YBgynG911Bh0OWvN.png",
        width: 800,
        height: 600,
        alt: "KarnalWebTech Banner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@KarnalWebTech",
    title: "KarnalWebTech",
    description: "Your trusted tech partner in web development and digital solutions.",
    images: ["https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=490,fit=crop,q=95/m2WrzgBy7ZcEOgWj/logo1-1-YBgynG911Bh0OWvN.png"],
  },
};

const page = () => {
  return (
    <Post/>
  )
}

export default page