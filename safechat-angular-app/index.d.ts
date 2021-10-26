// Type declarations for Clipboard API
// https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API
interface Clipboard {
  write(newClipText: string): Promise<void>;
  // Add any other methods you need here.
}

interface ClipboardItem {}

interface NavigatorClipboard {
  // Only available in a secure context.
  readonly clipboard?: Clipboard;
}

interface Navigator extends NavigatorClipboard {}