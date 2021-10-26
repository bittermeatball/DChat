export class Utils {
  constructor() {}

  static copyToClipboard(item: any) {
    const copyEnv = document.addEventListener('copy', (e: ClipboardEvent) => {
      e?.clipboardData?.setData('text/plain', (item));
      e.preventDefault();
      document.removeEventListener('copy', copyEnv);
    }) as unknown as EventListenerOrEventListenerObject;
    document.execCommand('copy');
  }
}
