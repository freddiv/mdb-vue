const jwt = require('jsonwebtoken');

export const userAuthMixin =  {
  computed: {
    isLoggedIn: function(){
     let loggedIn = false;
     this.user = {
       emailAddress: 'guest@',
       password: '',
       roles: ['GUEST']
     };

      if (this.userToken.length){
         let compareDate = (new Date(Date.now()).getUTCDate()),
             compareHour = (new Date(Date.now()).getUTCHours() - 1),
             decoded = jwt.decode(this.userToken, {complete: true}),
             expireDate = new Date(decoded.payload.exp).getUTCDate(),
             expireHour = new Date(decoded.payload.exp).getUTCHours(),
             jwtUserData = decoded.payload.data;
         this.user = {
             emailAddress: 'jwtUserData.emailAddress',
             password: '',
             roles: jwtUserData.roles
           };
         loggedIn = true;
         // check time exp
         if (compareDate > expireDate || compareHour > expireHour){
           this.userToken = '';
           loggedIn = false;
         }
       }
       else {
       this.userToken = '';
       }
     return loggedIn;
    }
  },
  methods: {
    save () {
         localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.users));
    },
    get_active_or_inactive(){
      var status = this.status;
      return this.users.filter(function(users){
            return users.status == status;
      });
    },
    filter_by_date(users){
        return users.sort(function(a, b){
            return a.created_at > b.created_at;
        });
    }
  }
};
