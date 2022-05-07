const headers = ['heading', 'Header'];

function findValue(node, value) {
  return node.children.find((child) => child.value === value || child.raw === value);
}

export default function inject(section, target, source) {
  const children = [];

  let isClean = false;
  let sectionDepth = -1;

  for (const node of target.children) {
    if (sectionDepth > -1 && isClean === false) {
      if (!node.depth || node.depth > sectionDepth) {
        continue;
      }

      isClean = true;
    }

    children.push(node);

    if (sectionDepth === -1 && headers.includes(node.type) && findValue(node, section)) {
      sectionDepth = node.depth;

      children.push(...source.children);
    }
  }

  if (sectionDepth === -1) {
    throw new Error(`Section ${JSON.stringify(section)} not found in target`);
  }

  return { ...target, children };
}
