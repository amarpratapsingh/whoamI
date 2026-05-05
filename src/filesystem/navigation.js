function toSegments(inputPath) {
  return inputPath.split('/').filter(Boolean);
}

const HOME_PATH = '/home/amar';

function toVirtualPath(path) {
  if (path === HOME_PATH) {
    return '/';
  }

  if (path.startsWith(`${HOME_PATH}/`)) {
    return path.slice(HOME_PATH.length);
  }

  return path;
}

function toFilesystemPath(path) {
  if (path === HOME_PATH || path === '/') {
    return '/';
  }

  if (path.startsWith(`${HOME_PATH}/`)) {
    return path.slice(HOME_PATH.length);
  }

  return path;
}

export function resolvePath(currentPath, targetPath = '') {
  const baseSegments = targetPath.startsWith('/') ? [] : toSegments(currentPath);
  const nextSegments = targetPath.startsWith('/') ? toSegments(targetPath) : toSegments(targetPath);
  const segments = [...baseSegments];

  for (const segment of nextSegments) {
    if (segment === '.' || segment === '') {
      continue;
    }

    if (segment === '..') {
      segments.pop();
      continue;
    }

    segments.push(segment);
  }

  return `/${segments.join('/')}`.replace(/\/+/g, '/');
}

export function formatDisplayPath(path) {
  const virtualPath = toVirtualPath(path);

  if (virtualPath === '/') {
    return '~';
  }

  return `~${virtualPath}`;
}

export function getNodeAtPath(filesystem, absolutePath) {
  const filesystemPath = toFilesystemPath(absolutePath);

  if (filesystemPath === '/') {
    return filesystem;
  }

  return toSegments(filesystemPath).reduce((node, segment) => {
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
