const fetch = require('isomorphic-unfetch');

const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const next = require('next');
const sslRedirect = require('heroku-ssl-redirect').default;

app.use(sslRedirect());

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

const CLAPCITY_USER = '494744652'; // This is linkywolfe channel ID
const TWITCH_STREAMS_API = 'https://api.twitch.tv/kraken/streams';
const { TWITCH_CLIENT_ID } = process.env;
// fake DB
const messages = [];

// socket.io server
io.on('connection', (socket) => {
  socket.emit('message', 'YO');

  socket.on('message', (data) => {
    messages.push(data);
    socket.broadcast.emit('message', data);
  });
});

nextApp.prepare().then(() => {
  app.get('/messages', (req, res) => {
    res.json(messages);
  });

  app.get('*', (req, res) => {
    return nextHandler(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});

const isLive = () => {
  try {
    return fetch(`${TWITCH_STREAMS_API}/${CLAPCITY_USER}`, {
      method: 'GET',
      headers: {
        Accept: 'application/vnd.twitchtv.v5+json',
        'Content-Type': 'application/json',
        'Client-ID': TWITCH_CLIENT_ID,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.log('There was an error fetching the streams', data);
          return false;
        }
        return data.stream != null;
      });
  } catch (err) {
    console.log('There was an error fetching the streams', err);
    return false;
  }
};

app.get('/twitch', async (req, res) => {
  const { reqType } = req.query;
  let response;

  if (reqType === 'isLive') {
    response = await isLive();
  }

  res.status(200).json({ response });
});
