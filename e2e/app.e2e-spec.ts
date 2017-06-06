import { WeddingInvitationPage } from './app.po';

describe('wedding-invitation App', () => {
  let page: WeddingInvitationPage;

  beforeEach(() => {
    page = new WeddingInvitationPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
