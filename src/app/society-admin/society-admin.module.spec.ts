import { SocietyAdminModule } from './society-admin.module';

describe('SocietyAdminModule', () => {
  let societyAdminModule: SocietyAdminModule;

  beforeEach(() => {
    societyAdminModule = new SocietyAdminModule();
  });

  it('should create an instance', () => {
    expect(societyAdminModule).toBeTruthy();
  });
});
