import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('generates debate content when a topic is provided', () => {
    component.topic = 'python 3d game';

    component.startDebate();

    expect(component.isDebating).toBeTrue();
    expect(component.messages.length).toBeGreaterThan(0);
    expect(component.verdict.toLowerCase()).toContain('python');
    expect(component.verdict).toContain('Python 3d game');
  });

  it('clears debate when the topic is empty', () => {
    component.topic = '   ';

    component.startDebate();

    expect(component.isDebating).toBeFalse();
    expect(component.messages.length).toBe(0);
    expect(component.verdict).toBe('');
    expect(component.errorMessage).toBeTruthy();
  });

  it('capitalizes the topic in generated content', () => {
    component.topic = 'space exploration';

    component.startDebate();

    expect(component.verdict).toContain('Space exploration');
    expect(component.messages[0].content).toContain('Space exploration');
  });
});
