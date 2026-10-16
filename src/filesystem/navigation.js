function toSegments(inputPath) {
  return (inputPath || '').split('/').filter(Boolean);
}

export const HOME_PATH = '/home/amar';

export function resolvePath(currentPath, targetPath = '') {
  let target = (targetPath || '').trim();

  // If empty or explicitly '~', return HOME_PATH
  if (!target || target === '~') {
    return HOME_PATH;
  }

  // Handle '~/' prefix
  if (target === '~' || target.startsWith('~/')) {
    target = target.replace(/^~(?:\/|$)/, `${HOME_PATH}/`);
  }

  const baseSegments = target.startsWith('/') ? [] : toSegments(currentPath);
  const nextSegments = toSegments(target);
  const segments = [...baseSegments];

  for (const segment of nextSegments) {
    if (segment === '.' || segment === '') {
      continue;
    }

    if (segment === '..') {
      if (segments.length > 0) {
        segments.pop();
      }
      continue;
    }

    segments.push(segment);
  }

  return segments.length === 0 ? '/' : `/${segments.join('/')}`;
}

export function formatDisplayPath(path) {
  if (path === HOME_PATH) {
    return '~';
  }

  if (path.startsWith(`${HOME_PATH}/`)) {
    return `~${path.slice(HOME_PATH.length)}`;
  }

  return path || '/';
}

export function getNodeAtPath(filesystem, absolutePath) {
  const segments = toSegments(absolutePath);

  if (segments.length === 0) {
    return filesystem;
  }

  return segments.reduce((node, segment) => {
    if (!node || typeof node !== 'object') {
      return undefined;
    }

    return node[segment];
  }, filesystem);
}

export function isDirectoryNode(node) {
  return Boolean(node) && typeof node === 'object' && !Array.isArray(node);
}

export function listEntries(filesystem, absolutePath) {
  const node = getNodeAtPath(filesystem, absolutePath);

  if (!isDirectoryNode(node)) {
    return null;
  }

  return Object.keys(node).sort((left, right) => left.localeCompare(right));
}

export function readFile(filesystem, absolutePath) {
  const node = getNodeAtPath(filesystem, absolutePath);

  if (isDirectoryNode(node) || typeof node !== 'string') {
    return null;
  }

  return node;
}

