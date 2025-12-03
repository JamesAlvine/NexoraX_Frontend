self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-offline-forms') {
    event.waitUntil(syncOfflineForms());
  }
});

async function syncOfflineForms() {
  const offlineForms = JSON.parse(localStorage.getItem('offlineForms') || '[]');
  for (const form of offlineForms) {
    await fetch('/api/field-forms/', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: { 'Content-Type': 'application/json' }
    });
  }
  localStorage.removeItem('offlineForms');
}