const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('session', {
  set: (cookie) => {
    remote.session.defaultSession.cookies.set(cookie).then(
      () => {
        console.log('Cookie Saved');
      },
      (error) => {
        console.error(error);
      }
    );
  },
  // Returns Promise<Cookie[]>
  get: () => {
    return remote.session.defaultSession.cookies
      .get({})
      .then((cookies) => {
        console.log(cookies);
        return cookies;
      })
      .catch((error) => {
        console.log(error);
      });
  },
});
