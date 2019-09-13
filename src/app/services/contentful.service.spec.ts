import { ContentfulService } from './contentful.service';

describe('ContentfulService', () => {
  let service: ContentfulService;
  beforeEach(() => {
    service = new ContentfulService();
  });

  //TODO is this needed?
  it('should have client after construction', () => {
    expect(service['client']).toBeTruthy();
    expect(service['client'].getEntries).not.toBeUndefined();
  });

  it('should return content block when getSuggestedContentBlock called', (done) => {
    service.getSuggestedContentBlock().subscribe(contentBlock => {
      expect(contentBlock.content).toBeTruthy();
      expect(typeof contentBlock.content).toBe('string');
      done();
    });
  });
});
