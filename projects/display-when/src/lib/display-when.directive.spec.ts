import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { EDisplayWhen } from './display-when.directive';
import { DisplayWhenModule } from './display-when.module';

describe('DisplayWhenDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  afterEach(() => {
    fixture = null;
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [DisplayWhenModule],
    });
  });

  it('should display content with true', () => {
    const template = '<span *eDisplayWhen="true">hello</span>';
    fixture = createTestComponent(template);
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('span')).length).toEqual(1);
    expect((fixture.nativeElement as HTMLElement).innerText).toEqual('hello');
  });

  it('should display template with true', () => {
    const template =
      '<ng-container *eDisplayWhen="true; true temp"></ng-container><ng-template #temp><span>hello</span></ng-template>';
    fixture = createTestComponent(template);
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('span')).length).toEqual(1);
    expect((fixture.nativeElement as HTMLElement).innerText).toEqual('hello');
  });

  it(`shouldn't display content with false`, () => {
    const template = '<span *eDisplayWhen="false">hello</span>';
    fixture = createTestComponent(template);
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('span')).length).toEqual(0);
  });

  it('should display template with false', () => {
    const template =
      '<ng-container *eDisplayWhen="false; false temp"></ng-container><ng-template #temp><span>hello</span></ng-template>';
    fixture = createTestComponent(template);
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('span')).length).toEqual(1);
    expect((fixture.nativeElement as HTMLElement).innerText).toEqual('hello');
  });

  it('should display only one template', () => {
    const template =
      '<ng-container *eDisplayWhen="booleanCondition; true trueTemp; false falseTemp"></ng-container><ng-template #trueTemp><span>true</span></ng-template><ng-template #falseTemp><span>false</span></ng-template>';
    fixture = createTestComponent(template);
    fixture.componentInstance.booleanCondition = true;
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('span')).length).toEqual(1);
    expect((fixture.nativeElement as HTMLElement).innerText).toEqual('true');

    fixture.componentInstance.booleanCondition = false;
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('span')).length).toEqual(1);
    expect((fixture.nativeElement as HTMLElement).innerText).toEqual('false');
  });
});

@Component({ selector: 'test-cmp', template: '' })
class TestComponent {
  booleanCondition: boolean;
}

function createTestComponent(
  template: string
): ComponentFixture<TestComponent> {
  return TestBed.overrideComponent(TestComponent, {
    set: { template },
  }).createComponent(TestComponent);
}
