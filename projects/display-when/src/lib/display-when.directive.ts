import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[eDisplayWhen]',
})
export class EDisplayWhen {
  private _eDisplayWhen: boolean;
  @Input() set eDisplayWhen(condition: boolean) {
    this._eDisplayWhen = condition;

    if (condition) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
  }
  get eDisplayWhen(): boolean {
    return this._eDisplayWhen;
  }
  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>
  ) {}
}
