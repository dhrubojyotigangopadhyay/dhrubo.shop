/**
 * Inline bootstrap, run by a plain parser-blocking <script> in <head> so the
 * first layout is already the final one. It marks the motion mode for the
 * whole site: film-on (motion allowed) or film-static (prefers-reduced-motion),
 * and film-intro once per session for the homepage opening. No regular
 * expressions with backslashes in here: this is a template string.
 */
export const HEAD_BOOTSTRAP = `(function(){try{var r=window.matchMedia('(prefers-reduced-motion: reduce)').matches,c=document.documentElement.classList;c.add(r?'film-static':'film-on');if(!r&&!sessionStorage.getItem('dhrubo.intro'))c.add('film-intro');}catch(e){}})();`;
