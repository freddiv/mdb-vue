export default{
      fetch () {
        var  STORAGE_KEY = 'local-user-info';
        var users = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
        if (users.length === 0) {
           users = [
                {
                    emailAddress: 'valone.carlf@epa.gov',
                    password: 'password',
                    roles: ['USER', 'ADMIN'],
                    id: 1
                },
                 {
                    emailAddress: 'dunne.jeremy@epa.gov',
                    password: 'password',
                    roles: ['USER', 'ADMIN'],
                    id: 2
                },
                 {
                    emailAddress: 'edwards.jeff@epa.gov',
                    password: 'password',
                    roles: ['USER', 'ADMIN'],
                    id: 3
                },
                 {
                    emailAddress: 'kohl.loren@epa.gov',
                    password: 'password',
                    roles: ['USER', 'ADMIN'],
                    id: 4
                },
                 {
                    emailAddress: 'grulke.chris@epa.gov',
                    password: 'password',
                    roles: ['USER', 'ADMIN'],
                    id: 5
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
      save (users) {
        var  STORAGE_KEY = 'local-user-info';
        localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
      }
  };

