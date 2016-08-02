import { FrameworkConfiguration, Aurelia } from 'aurelia-framework';
import { configure } from '../../src/aurelia-oauth';

describe('the aurelia oauth plugin configuration', () => {
  var configuration;
  var oauthService;
  var oauthTokenService;

  beforeEach(() => {
    configuration = new FrameworkConfiguration(new Aurelia());
    
    configure(configuration, (param1, param2) => {
      oauthService = param1;
      oauthTokenService = param2;
    });
  });

  it('should invoke callback with supplied services as params', () => {
    expect(oauthService).toBeDefined();
    expect(oauthTokenService).toBeDefined();
  });
});
