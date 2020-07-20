declare module 'puppeteer-autoscroll-down' {
  import { Page } from 'puppeteer';
  export type LastScrollPosition = number;

  export function scrollPageToBottom(
    page: Page,
    scrollStep?: number,
    scrollDelay?: number
  ): Promise<LastScrollPosition>;
}
