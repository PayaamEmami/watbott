import { AboutComponent } from './about.component';
import { environment } from './../../../environments/environment';

describe('AboutComponent', () => {
  let component: AboutComponent;

  beforeEach(() => {
    component = new AboutComponent();
  });

  it('should have same githubUrl from environment variables', () => {
    expect(component.githubUrl).toEqual(environment.githubUrl, 'expected githubUrl');
  });

  it('should have same artistUrl from environment variables', () => {
    expect(component.artistUrl).toEqual(environment.artistUrl, 'expected artistUrl');
  });
});
