/* Flexible Dallas clock entry. Values sent to the API remain HH:mm. */
window.TPJOrderTime = (() => {
  const message = 'Enter a time such as 1205pm, 12:05 PM or 00:05.';
  function parse(value) {
    const text = String(value || '').trim().toLowerCase().replace(/[\s.]/g, '');
    const match = text.match(/^(\d{1,2})(?::?(\d{2}))?(am|pm)?$/);
    if (!match) throw Error(message);
    let hour = Number(match[1]);
    const minute = Number(match[2] || 0), period = match[3];
    if (minute > 59 || (period ? hour < 1 || hour > 12 : hour > 23)) throw Error(message);
    if (period) hour = hour % 12 + (period === 'pm' ? 12 : 0);
    return String(hour).padStart(2, '0') + ':' + String(minute).padStart(2, '0');
  }
  function format(value) {
    const [hour, minute] = parse(value).split(':').map(Number);
    return (hour % 12 || 12) + ':' + String(minute).padStart(2, '0') + (hour < 12 ? ' AM' : ' PM');
  }
  function shift(value, delta) {
    const [hour, minute] = parse(value).split(':').map(Number);
    const total = (hour * 60 + minute + delta + 1440) % 1440;
    return format(String(Math.floor(total / 60)).padStart(2, '0') + ':' + String(total % 60).padStart(2, '0'));
  }
  function mount() {
    document.querySelectorAll('input[data-tpj-time]:not([data-time-ready])').forEach(input => {
      input.dataset.timeReady = 'true';
      const check = normalize => {
        if (!input.value.trim()) { input.setCustomValidity(''); return; }
        try {
          const time = parse(input.value);
          input.setCustomValidity('');
          if (normalize) input.value = format(time);
        } catch (_) { input.setCustomValidity(message); }
      };
      input.addEventListener('input', () => check(false));
      input.addEventListener('blur', () => check(true));
      const nudge = delta => {
        try { input.value = shift(input.value || '12:00 PM', delta); }
        catch (_) { input.setCustomValidity(message); input.reportValidity(); return; }
        input.dispatchEvent(new Event('input', {bubbles: true}));
      };
      input.addEventListener('keydown', event => {
        if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
          event.preventDefault(); nudge(event.key === 'ArrowUp' ? 1 : -1);
        }
      });
      const controls = document.createElement('span');
      controls.style.cssText = 'display:inline-flex;gap:6px;margin-top:6px';
      for (const delta of [-1, 1]) {
        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = delta === 1 ? '▲ 1 min' : '▼ 1 min';
        button.setAttribute('aria-label', delta === 1 ? 'Time forward one minute' : 'Time back one minute');
        button.style.cssText = 'font:inherit;padding:8px 12px;min-height:44px';
        button.onmousedown = event => event.preventDefault();
        button.onclick = () => { nudge(delta); input.focus(); };
        controls.append(button);
      }
      input.insertAdjacentElement('afterend', controls);
      check(true);
    });
  }
  if (typeof document !== 'undefined') {
    new MutationObserver(mount).observe(document.documentElement, {childList: true, subtree: true});
    mount();
  }
  return {parse, format, shift};
})();
