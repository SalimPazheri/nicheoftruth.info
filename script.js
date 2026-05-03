(function () {
  const storageKey = 'nicheoftruth_feedback_entries';
  const supabaseUrl = 'https://nihkdysxoplpegwqlayi.supabase.co';
  const supabaseKey = 'sb_publishable_-lx2myS6ubyMTBpKZ5eS3g_fFIbs_of';
  const submitTimeoutMs = 8000;
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
    try {
      const entries = getEntries();
      entries.unshift(entry);
      localStorage.setItem(storageKey, JSON.stringify(entries));
    } catch (error) {
      console.warn('Local feedback backup failed:', error);
    }
  }

  function withTimeout(promise, timeoutMs) {
    let timeoutId;
    const timeout = new Promise(function (_, reject) {
      timeoutId = window.setTimeout(function () {
        reject(new Error('Submit timed out. Saved locally for review.'));
      }, timeoutMs);
    });

    return Promise.race([promise, timeout]).then(
      function (result) {
        window.clearTimeout(timeoutId);
        return result;
      },
      function (error) {
        window.clearTimeout(timeoutId);
        throw error;
      }
    );
  }

  function closeFeedbackPage() {
    window.open('', '_self');
    window.close();
  }

  const form = document.getElementById('feedbackForm');
  if (form) {
    const thanks = document.getElementById('thanks');
    const thanksTitle = document.getElementById('thanksTitle');
    const closePage = document.getElementById('closePage');
    const voiceButton = document.getElementById('voiceButton');
    const voiceStatus = document.getElementById('voiceStatus');
    const message = document.getElementById('message');
    const name = document.getElementById('name');
    const phone = document.getElementById('phone');
    const district = document.getElementById('district');
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

    if (closePage) {
      closePage.addEventListener('click', closeFeedbackPage);
    }

    form.addEventListener('submit', async function (event) {
      event.preventDefault();

      const entry = {
        name: name.value.trim(),
        phone: phone.value.trim(),
        district: district.value,
        message: message.value.trim(),
        source: 'nfc_or_web',
        status: 'new'
      };

      if (!entry.name) {
        name.focus();
        return;
      }

      if (!entry.phone) {
        phone.focus();
        return;
      }

      if (!entry.district) {
        district.focus();
        return;
      }

      if (!entry.message) {
        message.focus();
        return;
      }

      const submitButton = form.querySelector('[type="submit"]');
      submitButton.disabled = true;
      submitButton.textContent = 'Submitting...';

      try {
        if (!supabaseClient) throw new Error('Supabase client is unavailable');

        const { error } = await withTimeout(
          supabaseClient
            .from('feedback_entries')
            .insert(entry),
          submitTimeoutMs
        );

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
      thanksTitle.textContent = `Thanks, ${entry.name}.`;
      thanks.hidden = false;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.setTimeout(closeFeedbackPage, 2500);
    });
  }

  const entriesBody = document.getElementById('entriesBody');
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    const loginPanel = document.getElementById('loginPanel');
    const entriesPanel = document.getElementById('entriesPanel');
    const loginMessage = document.getElementById('loginMessage');
    const entriesStatus = document.getElementById('entriesStatus');
    const entriesFilters = document.getElementById('entriesFilters');
    const dateFilter = document.getElementById('dateFilter');
    const districtFilter = document.getElementById('districtFilter');
    const logoutButton = document.getElementById('logoutButton');
    const clearFilters = document.getElementById('clearFilters');

    setupAdminPage();

    loginForm.addEventListener('submit', async function (event) {
      event.preventDefault();

      if (!supabaseClient) {
        loginMessage.textContent = 'Login is unavailable. Please try again later.';
        return;
      }

      const loginButton = loginForm.querySelector('[type="submit"]');
      loginButton.disabled = true;
      loginButton.textContent = 'Logging in...';
      loginMessage.textContent = '';

      try {
        const { error } = await supabaseClient.auth.signInWithPassword({
          email: document.getElementById('loginEmail').value.trim(),
          password: document.getElementById('loginPassword').value
        });

        if (error) throw error;
        await showEntries();
      } catch (error) {
        loginMessage.textContent = error.message || 'Login failed. Please check the email and password.';
      } finally {
        loginButton.disabled = false;
        loginButton.textContent = 'Login';
      }
    });

    entriesFilters.addEventListener('submit', function (event) {
      event.preventDefault();
      loadEntries();
    });

    dateFilter.addEventListener('change', loadEntries);
    districtFilter.addEventListener('change', loadEntries);

    clearFilters.addEventListener('click', function () {
      dateFilter.value = '';
      districtFilter.value = '';
      loadEntries();
    });

    logoutButton.addEventListener('click', async function () {
      if (supabaseClient) {
        await supabaseClient.auth.signOut();
      }
      window.location.href = './index.html';
    });

    async function setupAdminPage() {
      if (!supabaseClient) {
        loginMessage.textContent = 'Login is unavailable. Please try again later.';
        return;
      }

      const { data } = await supabaseClient.auth.getSession();
      if (data.session) {
        await showEntries();
      }
    }

    async function showEntries() {
      loginPanel.hidden = true;
      entriesPanel.hidden = false;
      await loadEntries();
    }

    async function loadEntries() {
      let query = supabaseClient
        .from('feedback_entries')
        .select('created_at, name, phone, district, message')
        .order('created_at', { ascending: false })
        .limit(200);

      if (dateFilter.value) {
        const startDate = new Date(`${dateFilter.value}T00:00:00`);
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 1);
        query = query
          .gte('created_at', startDate.toISOString())
          .lt('created_at', endDate.toISOString());
      }

      if (districtFilter.value) {
        query = query.eq('district', districtFilter.value);
      }

      entriesStatus.textContent = 'Loading feedback...';
      entriesBody.innerHTML = '<tr><td colspan="5">Loading feedback...</td></tr>';

      try {
        const { data, error } = await query;
        if (error) throw error;

        renderEntries(data || []);
        entriesStatus.textContent = data && data.length
          ? `${data.length} feedback entr${data.length === 1 ? 'y' : 'ies'} found.`
          : 'No feedback entries found.';
      } catch (error) {
        console.error('Feedback load failed:', error);
        entriesStatus.textContent = error.message || 'Unable to load feedback entries.';
        entriesBody.innerHTML = '<tr><td colspan="5">Unable to load feedback entries.</td></tr>';
      }
    }
  }

  if (entriesBody && !loginForm) {
    renderEntries(getEntries());
  }

  function renderEntries(entries) {
    entriesBody.innerHTML = entries.length
      ? entries.map(function (entry) {
          return `
            <tr>
              <td>${formatDate(entry.created_at)}</td>
              <td>${escapeHtml(entry.name || '-')}</td>
              <td>${escapeHtml(entry.phone || '-')}</td>
              <td>${escapeHtml(entry.district || '-')}</td>
              <td>${escapeHtml(entry.message || '-')}</td>
            </tr>
          `;
        }).join('')
      : '<tr><td colspan="5">No feedback entries yet.</td></tr>';
  }

  function formatDate(value) {
    if (!value) return '-';
    return new Date(value).toLocaleString();
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
