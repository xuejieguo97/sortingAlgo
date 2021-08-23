const express = require('express')
const path = require('path')
const http = require('http')
const PORT=  process.env.PORT || 3000
const { dirname } = require('path')
const app = express()
const server = http.createServer(app)

// Set static folder
app.use(express.static(path.join(__dirname, 'public')))

// Start Server
server.listen(PORT, () => console.log(`Server running on the port ${PORT}`))

