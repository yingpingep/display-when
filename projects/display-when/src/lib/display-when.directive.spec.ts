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

  describe('should work with boolean', () => {
    it('should display with true', () => {
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
  });

  describe('should work with number', () => {
    it('should display when > 0', () => {
      const template = '<span *eDisplayWhen="numberCondition">hello</span>';
      fixture = createTestComponent(template);
      fixture.componentInstance.numberCondition = 1;
      fixture.detectChanges();
      expect(fixture.debugElement.queryAll(By.css('span')).length).toEqual(1);
      expect((fixture.nativeElement as HTMLElement).innerText).toEqual('hello');

      fixture.componentInstance.numberCondition = 2;
      fixture.detectChanges();
      expect(fixture.debugElement.queryAll(By.css('span')).length).toEqual(1);
      expect((fixture.nativeElement as HTMLElement).innerText).toEqual('hello');
    });

    it(`shouldn't display when === 0`, () => {
      const template = '<span *eDisplayWhen="numberCondition">hello</span>';
      fixture = createTestComponent(template);
      fixture.componentInstance.numberCondition = 0;
      fixture.detectChanges();
      expect(fixture.debugElement.queryAll(By.css('span')).length).toEqual(0);
    });

    it('should display when < 0', () => {
      const template = '<span *eDisplayWhen="numberCondition">hello</span>';
      fixture = createTestComponent(template);
      fixture.componentInstance.numberCondition = -1;
      fixture.detectChanges();
      expect(fixture.debugElement.queryAll(By.css('span')).length).toEqual(1);
      expect((fixture.nativeElement as HTMLElement).innerText).toEqual('hello');

      fixture.componentInstance.numberCondition = -2;
      fixture.detectChanges();
      expect(fixture.debugElement.queryAll(By.css('span')).length).toEqual(1);
      expect((fixture.nativeElement as HTMLElement).innerText).toEqual('hello');
    });
  });

  describe('should work with string', () => {
    it(`should display when string !== ''`, () => {
      const template = '<span *eDisplayWhen="stringCondition">hello</span>';
      fixture = createTestComponent(template);
      fixture.componentInstance.stringCondition = '1';
      fixture.detectChanges();
      expect(fixture.debugElement.queryAll(By.css('span')).length).toEqual(1);
      expect((fixture.nativeElement as HTMLElement).innerText).toEqual('hello');

      fixture.componentInstance.stringCondition = '2';
      fixture.detectChanges();
      expect(fixture.debugElement.queryAll(By.css('span')).length).toEqual(1);
      expect((fixture.nativeElement as HTMLElement).innerText).toEqual('hello');
    });

    it(`shouldn't display when === ''`, () => {
      const template = '<span *eDisplayWhen="stringCondition">hello</span>';
      fixture = createTestComponent(template);
      fixture.componentInstance.stringCondition = '';
      fixture.detectChanges();
      expect(fixture.debugElement.queryAll(By.css('span')).length).toEqual(0);
    });
  });

  describe('should work with object', () => {
    it('should display', () => {
      const template = '<span *eDisplayWhen="objCondition">hello</span>';
      fixture = createTestComponent(template);
      fixture.componentInstance.objCondition = {};
      fixture.detectChanges();
      expect(fixture.debugElement.queryAll(By.css('span')).length).toEqual(1);
      expect((fixture.nativeElement as HTMLElement).innerText).toEqual('hello');

      fixture.componentInstance.objCondition = { x: 'foo' };
      fixture.detectChanges();
      expect(fixture.debugElement.queryAll(By.css('span')).length).toEqual(1);
      expect((fixture.nativeElement as HTMLElement).innerText).toEqual('hello');
    });
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
  numberCondition: number;
  stringCondition: string;
  objCondition: object;
}

function createTestComponent(
  template: string
): ComponentFixture<TestComponent> {
  return TestBed.overrideComponent(TestComponent, {
    set: { template },
  }).createComponent(TestComponent);
}
