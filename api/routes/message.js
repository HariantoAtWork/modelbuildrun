module.exports = io => async (fastify, options) => {
  fastify
    // Route: /
    .get('/', async () => ({ message: true }))
    .post('/', {}, async (request, reply) => {
      io.emit('chat-message', {
        ...request.body,
        id: `POST: ${request.body.id}`
      })
      return request.body
    })
}
