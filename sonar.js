var scanner = require('sonarqube-scanner');
var pass = "123456"
var token = "sqp_e6e6aa15910d99809a54a7571ea785f8d20a7f27";
scanner(
  {
    serverUrl: 'http://localhost:9000',
    options: {
      'sonar.projectName': 'devsu',
      'sonar.projectKey': 'devsu',
      'sonar.projectDescription': 'Description for "My App" project...',
      'sonar.sources': 'src/app',
      'sonar.exclusions': '**/dist/**/*,**/node_modules/**/*,**/*.spec.ts,**/.angular/**/*,**/platforms/**/*,**/plugins/**/*,**/www/**/*',
      'sonar.projectVersion': '4.3',
      'sonar.login': 'admin',
      'sonar.password': pass,
      'sonar.token': token,
      'sonar.typescript.lcov.reportPaths': 'coverage/ngv/lcov.info',
      'sonar.javascript.node.maxspace': '5000',
      'sonar.language': 'ts',
      'sonar.sourceEncoding': 'UTF-8'
    }
  },
  function () {
    return process.exit();
  }
);
