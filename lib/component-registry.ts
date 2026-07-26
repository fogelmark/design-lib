export type ComponentCategory =
  | 'buttons'
  | 'preloaders'
  | 'parallax'
  | 'page-transitions'
  | 'hover-effects'
  | 'text-animations'
  | 'cursors';

export interface ComponentMetadata {
  id: string;
  title: string;
  description: string;
  category: ComponentCategory;
  tags: string[];
  dependencies: string[];
  usageNotes?: string;
}

export interface ComponentEntry extends ComponentMetadata {
  component: React.ComponentType<any>;
  code: {
    tsx: string;
    css?: string;
  };
}

export const CATEGORY_LABELS: Record<ComponentCategory, string> = {
  'buttons': 'Buttons',
  'preloaders': 'Preloaders',
  'parallax': 'Parallax',
  'page-transitions': 'Page Transitions',
  'hover-effects': 'Hover Effects',
  'text-animations': 'Text Animations',
  'cursors': 'Cursors',
};
