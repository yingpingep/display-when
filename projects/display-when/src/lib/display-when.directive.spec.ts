import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { EDisplayWhen } from './display-when.directive';
import { DisplayWhenModule } from './display-when.module';

describe('DisplayWhenDirective', () => {
  let fixture: ComponentFixture<any>;
  afterEach(() => {
    fixture = null;
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [DisplayWhenModule],
    });
  });

  it(
    'should work in a template attribute',
    waitForAsync(() => {
      const template = '<span *eDisplayWhen="true">hello</span>';
      fixture = createTestComponent(template);
      fixture.detectChanges();
      expect(fixture.debugElement.queryAll(By.css('span')).length).toEqual(1);
      expect((fixture.nativeElement as HTMLElement).innerText).toEqual('hello');
    })
  );
});

@Component({ selector: 'test-cmp', template: '' })
class TestComponent {}

function createTestComponent(
  template: string
): ComponentFixture<TestComponent> {
  return TestBed.overrideComponent(TestComponent, {
    set: { template },
  }).createComponent(TestComponent);
}
