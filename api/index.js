module.exports = io => async (fastify, options) => {
  fastify
    .get('/', async () => ({ api: true }))
    // register
    .register(require('./routes/message')(io), { prefix: '/message' })

  io.on('connection', socket => {
    console.log('Socket Connect:', { id: socket.id })
    io.emit('chat-message', { id: socket.id, status: 'ENTERS ROOM' })
    socket.on('disconnect', message => {
      console.log({ id: socket.id, message })
      socket.broadcast.emit('chat-message', { id: socket.id, status: 'LEFT' })
    })

    socket.on('chat-message', msg => {
      console.log('chat-message:', msg)
      io.emit('chat-message', { id: socket.id, message: msg })
    })
  })
}
