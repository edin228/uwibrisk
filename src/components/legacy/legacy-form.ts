/** Client behaviour for LegacyForm.astro (same UX as the old React forms). */

function showStatus(form: HTMLFormElement, kind: 'success' | 'error' | 'idle', message = '') {
  const el = form.querySelector<HTMLElement>('[data-status]');
  if (!el) return;
  if (el.dataset.statusWrap !== undefined) {
    // Advisor layout: message in a <p>; the box hides itself when empty (:empty).
    el.replaceChildren();
    if (kind === 'idle') return;
    const p = document.createElement('p');
    p.textContent = message;
    if (kind === 'error' && el.dataset.errorClass) p.className = el.dataset.errorClass;
    el.append(p);
    return;
  }
  el.textContent = message;
  const cls = kind === 'error' ? el.dataset.errorClass : el.dataset.successClass;
  if (cls) el.className = cls;
}

export function initLegacyForms() {
  for (const form of document.querySelectorAll<HTMLFormElement>('form[data-legacy-form]')) {
    if (form.dataset.bound) continue;
    form.dataset.bound = 'true';

    if (form.dataset.prefillEmail !== undefined) {
      const email = new URLSearchParams(location.search).get('email');
      const input = form.querySelector<HTMLInputElement>('input[name="email"]');
      if (email && input) input.value = email;
    }

    const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
    const label = form.querySelector<HTMLElement>('[data-label]');
    const idleLabel = label?.textContent ?? '';

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const values = Object.fromEntries(new FormData(form).entries());
      if (values.website) return;

      const keys = JSON.parse(form.dataset.keys ?? '{}') as Record<string, string>;
      const payload: Record<string, unknown> = { id: form.dataset.formId };
      for (const [name, key] of Object.entries(keys)) payload[key] = values[name] ?? '';
      payload.Source = form.dataset.source;

      showStatus(form, 'idle');
      if (button) button.disabled = true;
      if (label) label.textContent = form.dataset.submitting ?? idleLabel;
      try {
        const response = await fetch('/api/submit', { method: 'POST', body: JSON.stringify(payload) });
        // Non-2xx includes 502: the notification email failed and nothing else stores the submission.
        if (!response.ok) throw new Error(`Submission failed (${response.status})`);
        form.reset();
        showStatus(form, 'success', form.dataset.success);
      } catch {
        showStatus(form, 'error', form.dataset.error);
      } finally {
        if (button) button.disabled = false;
        if (label) label.textContent = idleLabel;
      }
    });
  }
}
