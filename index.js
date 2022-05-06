const headers = ['heading', 'Header'];

function findValue(node, value) {
  return node.children.find((child) => child.value === value || child.raw === value);
}

export default function inject(section, target, source) {
  const children = [];

  let isClean = false;
  let sectionLevel = 0;

  for (const node of target.children) {
    if (sectionLevel) {
      if (!isClean) {
        if (Number.isNaN(node.depth) || node.depth > sectionLevel) {
          continue;
        }

        isClean = true;
      }
    }

    children.push(node);

    if (!sectionLevel && headers.includes(node.type) && findValue(node, section)) {
      sectionLevel = node.depth;

      source.children.forEach((node) => children.push(node));
    }
  }

  if (sectionLevel === 0) {
    throw new Error(`Section '${section}' not found in target`);
  }

  return { ...target, children };
}
