declare module 'md-node-inject' {
  import { TxtNode } from '@textlint/ast-node-types';

  export default function inject(section: string, target: TxtNode, source: TxtNode): TxtNode;
}
