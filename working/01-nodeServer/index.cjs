const http = require("node:http")
const { readFile } = require("node:fs/promises")

const server = http.createServer(async (req, res) => {
  if (req.url === "/image.png") {
    const content = await readFile("image.png")
    res.writeHead(200, {
      "cotent-type": "image/png",
    })

    res.write(content)
    return res.end()
  }

  if (req.url === "/styles.css") {
    const css = await readFile("styles.css")
    res.writeHead(200, {
      "cotent-type": "text/css",
    })

    res.write(css)
    return res.end()
  }

  if (req.url !== "/") {
    res.write(
      `
      <h1>Good bay, ${req.url.slice(1)} ${new Date().toLocaleTimeString(
        "ru-RU",
      )}</h1>
      `,
    )

    return res.end()
  }

  res.writeHead(200, {
    "content-type": "text/html",
  })

  res.write(
    `
    <h1>Hi! ${new Date().toLocaleTimeString("ru-RU")}</h1>
    `,
  )

  const htmlPage = await readFile("index.html")
  res.write(htmlPage)

  res.end()
})

server.listen(5000)
