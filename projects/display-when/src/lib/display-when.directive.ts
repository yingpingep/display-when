import {
  Directive,
  EmbeddedViewRef,
  Input,
  Optional,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[eDisplayWhen]',
})
export class EDisplayWhen {
  private trueEmbeddedViewRef: EmbeddedViewRef<any>;
  private falseEmbeddedViewRef: EmbeddedViewRef<any>;
  private trueTemplateRef: TemplateRef<any>;
  private falseTemplateRef: TemplateRef<any>;
  private _eDisplayWhen: boolean;
  @Input() set eDisplayWhen(condition: boolean) {
    this._eDisplayWhen = condition;
    this.updateView();
  }
  get eDisplayWhen(): boolean {
    return this._eDisplayWhen;
  }

  @Input() set eDisplayWhenTrue(templateRef: TemplateRef<any>) {
    this.trueTemplateRef = templateRef;
    this.trueEmbeddedViewRef = null;
    this.updateView();
  }

  @Input() set eDisplayWhenFalse(templateRef: TemplateRef<any>) {
    this.falseTemplateRef = templateRef;
    this.falseEmbeddedViewRef = null;
    this.updateView();
  }

  constructor(
    private viewContainerRef: ViewContainerRef,
    templateRef: TemplateRef<any>
  ) {
    this.trueTemplateRef = templateRef;
  }

  private updateView(): void {
    if (this.eDisplayWhen) {
      if (!this.trueEmbeddedViewRef) {
        this.viewContainerRef.clear();
        this.falseEmbeddedViewRef = null;

        if (this.trueTemplateRef) {
          this.trueEmbeddedViewRef = this.viewContainerRef.createEmbeddedView(
            this.trueTemplateRef
          );
        }
      }
    } else {
      if (!this.falseEmbeddedViewRef) {
        this.viewContainerRef.clear();
        this.trueEmbeddedViewRef = null;

        if (this.falseTemplateRef) {
          this.falseEmbeddedViewRef = this.viewContainerRef.createEmbeddedView(
            this.falseTemplateRef
          );
        }
      }
    }
  }
}
