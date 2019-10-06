declare namespace JSX {
  interface IntrinsicElements {
    'markdown-toolbar': {
      for: string;
      class?: string;
      children?: any;
    };
    'md-bold': any;
    'md-header': any;
    'md-italic': any;
    'md-quote': any;
    'md-code': any;
    'md-link': any;
    'md-unordered-list': any;
    'md-ordered-list': any;
  }
}
