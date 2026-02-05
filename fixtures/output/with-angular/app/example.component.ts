import type { OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core'
import { Component, Input, inject, signal, model, output, linkedSignal } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-example',
  standalone: true,
  templateUrl: './example.component.html',
})
export class ExampleComponent implements OnInit, OnChanges, OnDestroy {
  // Using old @Input decorator instead of input signal
  @Input() title: string = ''

  // Should use inject() instead of constructor injection
  constructor(private http: HttpClient) {}

  // Lifecycle methods in wrong order
  ngOnDestroy(): void {
    console.log('destroyed')
  }

  ngOnInit(): void {
    console.log('initialized')
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes', changes)
  }
}

// Component without selector (should warn)
@Component({
  standalone: true,
  template: '<div>No selector</div>',
})
export class NoSelectorComponent {}

// Good example with signals
@Component({
  selector: 'app-signal-example',
  standalone: true,
  template: `
    <div>
      <h1>{{ title() }}</h1>
      <p>Count: {{ count() }}</p>
      <button (click)="increment()">Increment</button>
    </div>
  `,
})
export class SignalExampleComponent {
  private readonly http = inject(HttpClient)

  readonly title = signal('Signal Example')
  readonly count = signal(0)
  readonly doubleCount = linkedSignal(() => this.count() * 2)

  // Model for two-way binding
  readonly value = model<string>('')

  // Output signal
  valueChange = output<string>()

  increment() {
    this.count.update((c) => c + 1)
    this.valueChange.emit(String(this.count()))
  }
}
