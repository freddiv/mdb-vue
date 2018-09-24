export default {
      localLoginStorage: {
            fetch: function () {
              var  STORAGE_KEY = 'local-user-info';
        var users = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
        if (users.length === 0) {
           users = [
                {
                    emailAddress: 'valone.carlf@epa.gov',
                    password: 'password',
                    roles: ['USER', 'ADMIN']
                },
                 {
                    emailAddress: 'dunne.jeremy@epa.gov',
                    password: 'password',
                    roles: ['USER', 'ADMIN']
                },
                 {
                    emailAddress: 'edwards.jeff@epa.gov',
                    password: 'password',
                    roles: ['USER', 'ADMIN']
                },
                 {
                    emailAddress: 'kohl.loren@epa.gov',
                    password: 'password',
                    roles: ['USER', 'ADMIN']
                },
                 {
                    emailAddress: 'grulke.chris@epa.gov',
                    password: 'password',
                    roles: ['USER', 'ADMIN']
                }
              ];
        }
        users.forEach(function (user, index) {
          user.id = index;
        });
        users.uid = users.length;
        console.log(users);
        return users;
      },
      save: function (users) {
        var  STORAGE_KEY = 'local-user-info';
        localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
      }
    }
  };

