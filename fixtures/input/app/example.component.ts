import { Component, OnInit, Input, OnDestroy, OnChanges, SimpleChanges, inject, signal, model, output, linkedSignal } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  standalone: true,
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
  template: '<div>No selector</div>',
  standalone: true,
})
export class NoSelectorComponent {}

// Good example with signals
@Component({
  selector: 'app-signal-example',
  template: `
    <div>
      <h1>{{ title() }}</h1>
      <p>Count: {{ count() }}</p>
      <button (click)="increment()">Increment</button>
    </div>
  `,
  standalone: true,
})
export class SignalExampleComponent {
  private readonly http = inject(HttpClient)

  title = signal('Signal Example')
  count = signal(0)
  doubleCount = linkedSignal(() => this.count() * 2)
  
  // Model for two-way binding
  value = model<string>('')
  
  // Output signal
  valueChange = output<string>()

  increment() {
    this.count.update(c => c + 1)
    this.valueChange.emit(String(this.count()))
  }
}
