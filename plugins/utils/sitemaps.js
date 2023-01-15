require('dotenv').config()

export default (meta) => {
  return [
    {
      path: '/sitemaps/sitemap.xml',
      exclude: ['**'],
      routes() {
        return getRoutes()
      },
    },
    // {
    //   path: '/sitemaps/books.xml',
    //   exclude: ['**'],
    //   routes: () => {
    //     return getBooksRoutes()
    //   },
    // },
  ]
}

const getRoutes = () => {
  return new Promise((resolve, reject) => {
    const routes = []
    const staticRoutes = [
      {
        url: '',
        changefreq: 'weekly',
        priority: 1,
      },
      // {
      //   url: 'books',
      //   changefreq: 'weekly',
      //   priority: 1,
      // },
    ]
    staticRoutes.forEach((route) => {
      routes.push(route)
    })
    routes.concat(staticRoutes)

    resolve(routes)
  })
}

// const getBooksRoutes = () => {
//   // eslint-disable-next-line no-async-promise-executor
//   return new Promise(async (resolve, reject) => {
//     const books = await fetchEntities('books?all=true')
//     const routes = []

//     for (const book of books.data) {
//       const route = {
//         url: `/books/${book.meta.author}/${book.meta.slug}`,
//         // lastmodISO: book.meta.updatedAt,
//         priority: 0.6,
//       }
//       routes.push(route)
//     }
//     resolve(routes)
//   })
// }

// const fetchEntities = async (endpoint) => {
//   const path = `${process.env.API_URL}/${endpoint}`
//   try {
//     const result = await axios.get(path)
//     return result.data
//   } catch (error) {
//     console.error(path)
//     console.error('Unable to catch API')
//     return []
//   }
// }
