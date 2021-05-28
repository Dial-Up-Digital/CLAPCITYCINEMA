const fetch = require('isomorphic-unfetch');

const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const next = require('next');
const sslRedirect = require('heroku-ssl-redirect').default;
const marklar = require('marklar');

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
const users = [];
const message_queue = [];
const message_queue_length = 10;

// Refactor these out into separate module later
const usernameAvailable = (users, newName) => {
  if (users.indexOf(newName) > -1) {
    // Username taken
    return false;
  }

  return true;
};

const addMessageToQueue = (queue, message) => {
  if (queue.length >= message_queue_length) {
    queue.shift();
  }
  queue.push(message);
};

const getColor = () => {
  const colors = ['#ddaedc', '#4cb397', '#ffd281', '#f6b40e', '#75b4be', '#f04673', '#251879'];
  const index = Math.floor(Math.random() * (colors.length + 1));
  return colors[index];
};

// socket.io server
io.on('connection', (socket) => {
  let username;
  let color;

  socket.on('init', () => {
    marklar.nameFile.rappers = './rapper-names.txt';
    username = marklar.getName('rappers').split(' ')[0];
    color = getColor();
    users.push(username);
    socket.emit('init', { users, messages: message_queue, username, color });
    socket.broadcast.emit('user:join', { username, users });
  });

  socket.on('send:message', (message) => {
    addMessageToQueue(message_queue, message);
    socket.broadcast.emit('receive:message', {
      username: message.username,
      text: message.text,
      color: message.color,
      timestamp: Date.now(),
    });
  });

  socket.on('change:username', (names) => {
    const index = users.indexOf(names.oldName);
    users.splice(index, 1);
    users.push(names.newName);
    socket.broadcast.emit('change:username', {
      oldName: names.oldName,
      newName: names.newName,
    });
  });

  socket.on('disconnect', () => {
    if (typeof username !== 'undefined') {
      socket.disconnect();
      const index = users.indexOf(username);
      users.splice(index, 1);
      socket.broadcast.emit('user:left', {
        username,
        users,
      });
    }
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
