export interface Options {
  content: {
    title: string;
    body: string;
  };
  size?: {
    minWidth?: string;
    width?: string;
    maxWidth?: string;
    minHeight?: string;
    height?: string;
    maxHeight?: string;
  };
}
