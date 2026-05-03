export default {
  async fetch(request) {
    const userAgent = request.headers.get('User-Agent') || '';

    if (!userAgent.startsWith('curl')) {
      return Response.redirect('https://amarpratap.dev', 302);
    }

    return new Response('Amar Pratap Singh\nCS Engineer | KIIT, Bhubaneswar\n', {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });
  },
};
