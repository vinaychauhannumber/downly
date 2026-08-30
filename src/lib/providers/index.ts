import { IMediaProvider } from './base';
import { YouTubeProvider } from './youtube';
import { InstagramProvider } from './instagram';

const providers: IMediaProvider[] = [
  new YouTubeProvider(),
  new InstagramProvider(),
];

export function getProviderForUrl(url: string): IMediaProvider | null {
  for (const provider of providers) {
    if (provider.canHandle(url)) {
      return provider;
    }
  }
  return null;
}

export { YouTubeProvider, InstagramProvider };
export type { IMediaProvider };
