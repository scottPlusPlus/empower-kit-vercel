interface Handler {
    (): void;
  }

export class Signal {
    private handlers: Handler[] = [];
  
    // Register a handler
    public registerHandler(handler: Handler): void {
      this.handlers.push(handler);
    }
  
    // Trigger the event and execute all registered handlers
    public trigger(): void {
      for (const handler of this.handlers) {
        handler();
      }
    }
  }