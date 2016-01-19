export default function maverick(environment) {
  var ENV = {
    appName: "App Name",
    parse: {
      appId: "APPICATION_ID",
      apiKey: "API_KEY",
      endpoints: {
          login: "https://api.parse.com/1/login",
          logout: "https://api.parse.com/1/logout",
          me: "https://api.parse.com/1/users/me"
      }
    },
    loginSuccessRoute: "index",
    components: {
      loginRegForm: {
        successText: ['Welcome to App Name', 'You have successfully logged in.'],
        errorText: ['Invalid Login Credentials', 'Your username and/or password are incorrect, or the account does not exist.']
      }
    }
  };

  if (environment === 'development') {
    // ENV.development = "something";
  }

  if (environment === 'test') {
    // ENV.test = "something";
  }

  if (environment === 'production') {
    // ENV.production = "something";
  }

  return ENV;
}