# vue-chatkit
A real-time chat application using Vue.js powered by [ChatKit](https://pusher.com/chatkit), a service provided by [Pusher](https://pusher.com/). The ChatKit service will provide us with a complete backend necessary for building a chat application on any device, leaving us to focus on building a frontend user interface that connects to the ChatKit service via [ChatKit client package](https://www.npmjs.com/package/@pusher/chatkit-client).

A rudimentary chat application similar to Slack or Discord. The app will do the following:
   - have multiple channels and rooms
   - list room members and detect presence status
   - detect when other users start typing

ChatKit service has a back-end interface that will allows us to manage users, permissions and rooms
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
