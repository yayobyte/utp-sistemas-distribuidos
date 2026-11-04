export type SceneId =
  | 'orbit'
  | 'monolith'
  | 'shatter'
  | 'scale'
  | 'sync'
  | 'queue'
  | 'config'
  | 'discovery'
  | 'gateway'
  | 'breaker'
  | 'tracing'
  | 'system';

/** Text fields accept **bold** and `code` markers. */
export type SlideContent =
  | { kind: 'title'; subtitle: string }
  | { kind: 'team' }
  | { kind: 'bullets'; items: string[] }
  | { kind: 'cards'; items: { title: string; text: string; tag?: string }[] }
  | { kind: 'compare'; left: { title: string; items: string[] }; right: { title: string; items: string[] } }
  | { kind: 'code'; lang: string; code: string; items?: string[] }
  | { kind: 'quiz'; items: { q: string; a: string }[] };

export interface Member {
  name: string;
  pending?: boolean;
}

export interface Slide {
  id: string;
  section: string;
  title: string;
  scene: SceneId;
  content: SlideContent;
  notes: string;
}
