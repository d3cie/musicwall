import React from "react";
import fs from "fs";
// ${documents
//     .map(({ _id, updatedAt }) => {
//       return `
//           <url>
//             <loc>${baseUrl}/documents/${_id}</loc>
//             <lastmod>${updatedAt}</lastmod>
//             <changefreq>monthly</changefreq>
//             <priority>1.0</priority>
//           </url>
//         `;
//     })
//     .join("")}




const Sitemap = () => { };

export const getServerSideProps = async ({ res }) => {

    const baseUrl = {
        development: "http://localhost:3000",
        production: "https://www.musicwall.cc",
    }[process.env.NODE_ENV];

    const users = await fetch(`${baseUrl}/api/v1/users/getallusers`,
        {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
    const usersList = await users.json()


    const staticPages = fs
        .readdirSync("pages")
        .filter((staticPage) => {
            return ![
                "_app.js",
                "_document.js",
                "api",
                "u",
                "accounts",
                "explore.js",
                "search.jsx",
                "_error.js",
                "sitemap.xml.js",
            ].includes(staticPage);
        })
        .map((staticPagePath) => {
            return `${baseUrl}/${staticPagePath}`;
        });

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticPages
            .map((url) => {
                return `
            <url>
              <loc>${url}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
          `;
            })
            .join("")}

            <url>
                <loc>${baseUrl}/accounts/login</loc>
                <lastmod>${new Date().toISOString()}</lastmod>
                <changefreq>monthly</changefreq>
                <priority>1.0</priority>
            </url>
            <url>
            <loc>${baseUrl}/accounts/signup</loc>
                <lastmod>${new Date().toISOString()}</lastmod>
                <changefreq>monthly</changefreq>
                <priority>1.0</priority>
            </url>



            ${usersList.users.map((user) => {
                return `
                    <url>
                    <loc>${baseUrl}/u/${user.username}</loc>
                        <lastmod>${user.since}</lastmod>
                        <changefreq>monthly</changefreq>
                        <priority>1.0</priority>
                    </url>
                    `
            }
            ).join("")}
        }






    </urlset>
    

  `;

    res.setHeader("Content-Type", "text/xml");
    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
};

export default Sitemap;