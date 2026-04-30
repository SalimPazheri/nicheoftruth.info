(function () {
  const storageKey = 'nicheoftruth_feedback_entries';
  const supabaseUrl = 'https://nihkdysxoplpegwqlayi.supabase.co';
  const supabaseKey = 'sb_publishable_-lx2myS6ubyMTBpKZ5eS3g_fFIbs_of';
  const supabaseClient = window.supabase
    ? window.supabase.createClient(supabaseUrl, supabaseKey)
    : null;

  function getEntries() {
    try {
      return JSON.parse(localStorage.getItem(storageKey) || '[]');
    } catch {
      return [];
    }
  }

  function saveEntry(entry) {
    const entries = getEntries();
    entries.unshift(entry);
    localStorage.setItem(storageKey, JSON.stringify(entries));
  }

  const form = document.getElementById('feedbackForm');
  if (form) {
    const thanks = document.getElementById('thanks');
    const voiceButton = document.getElementById('voiceButton');
    const voiceStatus = document.getElementById('voiceStatus');
    const message = document.getElementById('message');
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition = null;
    let listening = false;

    if (SpeechRecognition) {
      recognition = new SpeechRecognition();
      recognition.lang = 'ml-IN';
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onstart = function () {
        listening = true;
        voiceButton.classList.add('is-listening');
        voiceButton.textContent = 'Stop Voice';
        voiceStatus.textContent = 'Listening... speak your feedback.';
      };

      recognition.onend = function () {
        listening = false;
        voiceButton.classList.remove('is-listening');
        voiceButton.textContent = 'Start Voice';
        voiceStatus.textContent = 'Voice stopped. You can edit the text before submitting.';
      };

      recognition.onresult = function (event) {
        let finalText = '';
        for (let i = event.resultIndex; i < event.results.length; i += 1) {
          if (event.results[i].isFinal) {
            finalText += event.results[i][0].transcript + ' ';
          }
        }
        if (finalText.trim()) {
          message.value = `${message.value} ${finalText}`.trim();
        }
      };

      recognition.onerror = function () {
        voiceStatus.textContent = 'Voice input failed. Please type your feedback.';
      };
    } else {
      voiceButton.disabled = true;
      voiceStatus.textContent = 'Voice input is not supported in this browser. Please type your feedback.';
    }

    voiceButton.addEventListener('click', function () {
      if (!recognition) return;
      if (listening) recognition.stop();
      else recognition.start();
    });

    form.addEventListener('submit', async function (event) {
      event.preventDefault();

      const entry = {
        name: document.getElementById('name').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        district: document.getElementById('district').value,
        message: message.value.trim(),
        source: 'nfc_or_web',
        status: 'new'
      };

      if (!entry.message) {
        message.focus();
        return;
      }

      const submitButton = form.querySelector('[type="submit"]');
      submitButton.disabled = true;
      submitButton.textContent = 'Submitting...';

      try {
        if (!supabaseClient) throw new Error('Supabase client is unavailable');

        const { error } = await supabaseClient
          .from('feedback_entries')
          .insert(entry);

        if (error) throw error;

        saveEntry({
          ...entry,
          id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
          created_at: new Date().toISOString()
        });
      } catch (error) {
        console.error('Feedback submit failed:', error);
        saveEntry({
          ...entry,
          id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
          created_at: new Date().toISOString(),
          sync_error: error.message || 'Submit failed'
        });
      }

      form.hidden = true;
      thanks.hidden = false;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const entriesBody = document.getElementById('entriesBody');
  if (entriesBody) {
    loadEntries();

    document.getElementById('clearEntries').addEventListener('click', function () {
      localStorage.removeItem(storageKey);
      window.location.reload();
    });
  }

  async function loadEntries() {
    let entries = [];

    try {
      if (supabaseClient) {
        const { data, error } = await supabaseClient
          .from('feedback_entries')
          .select('created_at, name, phone, district, message')
          .order('created_at', { ascending: false })
          .limit(100);

        if (error) throw error;
        entries = data || [];
      }
    } catch (error) {
      console.error('Feedback load failed:', error);
      entries = getEntries();
    }

    entriesBody.innerHTML = entries.length
      ? entries.map(function (entry) {
          return `
            <tr>
              <td>${new Date(entry.created_at).toLocaleString()}</td>
              <td>${escapeHtml(entry.name || '-')}</td>
              <td>${escapeHtml(entry.phone || '-')}</td>
              <td>${escapeHtml(entry.district || '-')}</td>
              <td>${escapeHtml(entry.message || '-')}</td>
            </tr>
          `;
        }).join('')
      : '<tr><td colspan="5">No feedback entries yet.</td></tr>';
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }
})();
