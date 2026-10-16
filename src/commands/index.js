import { whoami } from './whoami.js';
import { help } from './help.js';
import { clear } from './clear.js';
import { ls } from './ls.js';
import { cat } from './cat.js';
import { cd } from './cd.js';
import { pwd } from './pwd.js';
import { projects } from './projects.js';
import { skills } from './skills.js';
import { neofetch } from './neofetch.js';
import { resume } from './resume.js';
import { contact } from './contact.js';
import { open } from './open.js';
import { man } from './man.js';
import { sudo } from './sudo.js';
import { git } from './git.js';
import { ping } from './ping.js';
import { rm } from './rm.js';
import { curl } from './curl.js';
import { hack } from './hack.js';
import { theme } from './theme.js';
import { matrix } from './matrix.js';
import { date } from './date.js';
import { cowsay } from './cowsay.js';
import { quote } from './quote.js';
import { history } from './history.js';

export function createCommandRegistry() {
  return {
    whoami,
    help,
    clear,
    ls,
    cat,
    cd,
    pwd,
    projects,
    skills,
    neofetch,
    resume,
    contact,
    open,
    man,
    sudo,
    git,
    ping,
    rm,
    curl,
    hack,
    theme,
    matrix,
    date,
    cowsay,
    quote,
    history,
    // Aliases
    fortune: quote,
    themes: theme,
    bio: whoami,
    about: whoami,
    cls: clear,
    dir: ls,
    './contact.sh': contact,
  };
}
