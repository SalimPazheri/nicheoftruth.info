(function () {
  const storageKey = 'nicheoftruth_feedback_entries';
  const languageKey = 'nicheoftruth_language';
  const supabaseUrl = 'https://nihkdysxoplpegwqlayi.supabase.co';
  const supabaseKey = 'sb_publishable_-lx2myS6ubyMTBpKZ5eS3g_fFIbs_of';
  const submitTimeoutMs = 8000;
  const fallbackGuideNumbers = [
    {
      name: 'Main Guide',
      phone: '918157815279',
      languages: ['en', 'hi', 'ml', 'ar'],
      intentions: ['To learn', 'To embrace Islam', 'Need counseling', 'Need Quran copy', 'Other question']
    }
  ];
  let guideNumbers = fallbackGuideNumbers.slice();
  const supabaseClient = window.supabase
    ? window.supabase.createClient(supabaseUrl, supabaseKey)
    : null;
  const translations = {
    en: {
      'brand.name': 'Niche of Truth',
      'brand.tagline': 'Guiding to Salvation',
      'brand.feedback': 'Quran feedback',
      'brand.admin': 'Feedback admin',
      'language.label': 'Language',
      'nav.feedback': 'Feedback',
      'ribbon.home': 'Home',
      'ribbon.birth': 'Birth',
      'ribbon.death': 'Death',
      'ribbon.purpose': 'Purpose of Life',
      'ribbon.revert': 'Revert',
      'birth.eyebrow': 'The first cry',
      'birth.title': 'A life begins with a question already inside it.',
      'birth.lead': 'Every birth arrives helpless, treasured, and dependent. Before a person can speak, life is already asking: Who gave me this breath, this care, this purpose?',
      'birth.body': 'Islam invites the heart to look at that beginning with humility. We did not create ourselves. We were brought into existence, sustained, and guided toward a life that can know its Creator.',
      'birth.askCta': 'Ask about life and purpose',
      'home.eyebrow': 'For sincere questions, calm answers, and open hearts',
      'home.title': 'Ask freely. Reflect deeply. Discover Islam with clarity.',
      'home.lead': 'Niche of Truth is a welcoming space for non-Muslim visitors to ask questions about Islam, request guidance, and share feedback after receiving a free Malayalam translation of the Holy Quran.',
      'home.feedbackCta': 'Leave Quran Feedback',
      'home.askCta': 'Ask a Question',
      'guide.eyebrow': 'Friendly guide',
      'guide.title': 'Ask a Question',
      'guide.intro': 'Share a few details so we can connect you with the right counselor.',
      'guide.location': 'Location',
      'guide.locationPlaceholder': 'City or district',
      'guide.profession': 'Profession',
      'guide.professionPlaceholder': 'Your profession',
      'guide.intention': 'Intention',
      'guide.intentionSelect': 'Select intention',
      'guide.intentLearn': 'To learn',
      'guide.intentEmbrace': 'To embrace Islam',
      'guide.intentCounseling': 'Need counseling',
      'guide.intentQuran': 'Need Quran copy',
      'guide.intentOther': 'Other question',
      'guide.question': 'Question',
      'guide.questionPlaceholder': 'Type your question briefly.',
      'guide.consent': 'I agree to share these details with a Niche of Truth counselor on WhatsApp.',
      'guide.connect': 'Connect on WhatsApp',
      'guide.continueWhatsapp': 'Continue on WhatsApp',
      'guide.anotherQuestion': 'Submit another question',
      'guide.required': 'Please fill all fields and confirm consent.',
      'guide.opened': 'WhatsApp is opening now. If it did not open, tap Continue on WhatsApp.',
      'guide.whatsappIntro': 'Niche of Truth website enquiry',
      'feedback.eyebrow': 'Free Malayalam Quran copy',
      'feedback.title': 'Share your feedback',
      'feedback.intro': 'You can type your message or use voice input. Your feedback helps us improve how we serve visitors across Kerala.',
      'feedback.name': 'Name',
      'feedback.namePlaceholder': 'Your name',
      'feedback.phone': 'Mobile or WhatsApp',
      'feedback.district': 'District',
      'feedback.message': 'Feedback',
      'feedback.messagePlaceholder': 'Please share your thoughts, questions, or request for follow-up.',
      'feedback.voiceStart': 'Start Voice',
      'feedback.voiceStop': 'Stop Voice',
      'feedback.voiceOptional': 'Voice input is optional.',
      'feedback.voiceListening': 'Listening... speak your feedback.',
      'feedback.voiceStopped': 'Voice stopped. You can edit the text before submitting.',
      'feedback.voiceFailed': 'Voice input failed. Please type your feedback.',
      'feedback.voiceUnsupported': 'Voice input is not supported in this browser. Please type your feedback.',
      'feedback.submit': 'Submit Feedback',
      'feedback.submitting': 'Submitting...',
      'feedback.thanksTitle': 'Thanks for your feedback.',
      'feedback.thanksNamed': 'Thanks, {name}.',
      'feedback.thanksBody': 'We have received your message and will get back to you soon, insha Allah.',
      'feedback.closeHint': 'This page will try to close automatically. If it stays open, you can close this tab.',
      'feedback.closePage': 'Close Page',
      'admin.loginEyebrow': 'Admin login',
      'admin.entriesTitle': 'Feedback entries',
      'admin.loginIntro': 'Login to view submitted feedback.',
      'admin.email': 'Email',
      'admin.password': 'Password',
      'admin.login': 'Login',
      'admin.loggingIn': 'Logging in...',
      'admin.loginUnavailable': 'Login is unavailable. Please try again later.',
      'admin.loginFailed': 'Login failed. Please check the email and password.',
      'admin.listEyebrow': 'Admin feedback list',
      'admin.logout': 'Logout',
      'admin.submittedDate': 'Submitted date',
      'admin.search': 'Search',
      'admin.clear': 'Clear',
      'admin.date': 'Date',
      'admin.phone': 'Phone',
      'admin.loading': 'Loading feedback...',
      'admin.noEntries': 'No feedback entries yet.',
      'admin.noEntriesFound': 'No feedback entries found.',
      'admin.unableToLoad': 'Unable to load feedback entries.',
      'admin.entriesFoundOne': '1 feedback entry found.',
      'admin.entriesFoundMany': '{count} feedback entries found.',
      'guideAdmin.eyebrow': 'Guide numbers',
      'guideAdmin.title': 'Guide Numbers',
      'guideAdmin.intro': 'Add or update counselor WhatsApp numbers used by Ask a Question.',
      'guideAdmin.name': 'Guide name',
      'guideAdmin.phone': 'WhatsApp number',
      'guideAdmin.languages': 'Languages',
      'guideAdmin.intentions': 'Intentions',
      'guideAdmin.active': 'Active for routing',
      'guideAdmin.save': 'Save guide',
      'guideAdmin.reset': 'Reset',
      'guideAdmin.status': 'Status',
      'guideAdmin.actions': 'Actions',
      'guideAdmin.edit': 'Edit',
      'guideAdmin.delete': 'Delete',
      'guideAdmin.activeStatus': 'Active',
      'guideAdmin.inactiveStatus': 'Inactive',
      'guideAdmin.loading': 'Loading guide numbers...',
      'guideAdmin.noGuides': 'No guide numbers added yet.',
      'guideAdmin.saved': 'Guide number saved.',
      'guideAdmin.deleted': 'Guide number deleted.',
      'guideAdmin.required': 'Please add a name, WhatsApp number, language, and intention.',
      'guideAdmin.loadFailed': 'Unable to load guide numbers.',
      'guideAdmin.saveFailed': 'Unable to save guide number.',
      'guideAdmin.deleteFailed': 'Unable to delete guide number.',
      'district.select': 'Select district',
      'district.all': 'All districts',
      'district.thiruvananthapuram': 'Thiruvananthapuram',
      'district.kollam': 'Kollam',
      'district.pathanamthitta': 'Pathanamthitta',
      'district.alappuzha': 'Alappuzha',
      'district.kottayam': 'Kottayam',
      'district.idukki': 'Idukki',
      'district.ernakulam': 'Ernakulam',
      'district.thrissur': 'Thrissur',
      'district.palakkad': 'Palakkad',
      'district.malappuram': 'Malappuram',
      'district.kozhikode': 'Kozhikode',
      'district.wayanad': 'Wayanad',
      'district.kannur': 'Kannur',
      'district.kasaragod': 'Kasaragod'
    },
    hi: {
      'brand.name': 'निच ऑफ ट्रुथ',
      'brand.tagline': 'मोक्ष की राह दिखाना',
      'brand.feedback': 'कुरआन प्रतिक्रिया',
      'brand.admin': 'प्रतिक्रिया एडमिन',
      'language.label': 'भाषा',
      'nav.feedback': 'प्रतिक्रिया',
      'ribbon.home': 'होम',
      'ribbon.birth': 'जन्म',
      'ribbon.death': 'मृत्यु',
      'ribbon.purpose': 'जीवन का उद्देश्य',
      'ribbon.revert': 'वापसी',
      'birth.eyebrow': 'पहली पुकार',
      'birth.title': 'जीवन अपने भीतर एक सवाल लेकर शुरू होता है।',
      'birth.lead': 'हर जन्म असहाय, प्रिय और निर्भर होकर आता है। बोलने से पहले ही जीवन पूछता है: मुझे यह सांस, यह देखभाल, यह उद्देश्य किसने दिया?',
      'birth.body': 'इस्लाम दिल को विनम्रता से इस शुरुआत को देखने के लिए बुलाता है। हमने खुद को पैदा नहीं किया। हमें अस्तित्व दिया गया, संभाला गया, और अपने रचयिता को जानने वाली जिंदगी की ओर मार्गदर्शन दिया गया।',
      'birth.askCta': 'जीवन और उद्देश्य के बारे में पूछें',
      'home.eyebrow': 'सच्चे सवाल, शांत जवाब और खुले दिल',
      'home.title': 'खुलकर पूछें। गहराई से सोचें। स्पष्टता के साथ इस्लाम को जानें।',
      'home.lead': 'निच ऑफ ट्रुथ गैर-मुस्लिम आगंतुकों के लिए इस्लाम के बारे में सवाल पूछने, मार्गदर्शन मांगने और पवित्र कुरआन के मुफ्त मलयालम अनुवाद को प्राप्त करने के बाद प्रतिक्रिया साझा करने की एक स्वागतपूर्ण जगह है।',
      'home.feedbackCta': 'कुरआन प्रतिक्रिया दें',
      'home.askCta': 'सवाल पूछें',
      'guide.eyebrow': 'मित्रवत मार्गदर्शक',
      'guide.title': 'सवाल पूछें',
      'guide.intro': 'कुछ विवरण साझा करें ताकि हम आपको सही काउंसलर से जोड़ सकें।',
      'guide.location': 'स्थान',
      'guide.locationPlaceholder': 'शहर या जिला',
      'guide.profession': 'पेशा',
      'guide.professionPlaceholder': 'आपका पेशा',
      'guide.intention': 'उद्देश्य',
      'guide.intentionSelect': 'उद्देश्य चुनें',
      'guide.intentLearn': 'सीखना चाहता/चाहती हूं',
      'guide.intentEmbrace': 'इस्लाम अपनाना चाहता/चाहती हूं',
      'guide.intentCounseling': 'काउंसलिंग चाहिए',
      'guide.intentQuran': 'कुरआन कॉपी चाहिए',
      'guide.intentOther': 'अन्य सवाल',
      'guide.question': 'सवाल',
      'guide.questionPlaceholder': 'अपना सवाल संक्षेप में लिखें।',
      'guide.consent': 'मैं इन विवरणों को व्हाट्सऐप पर निच ऑफ ट्रुथ काउंसलर के साथ साझा करने की अनुमति देता/देती हूं।',
      'guide.connect': 'व्हाट्सऐप पर जोड़ें',
      'guide.continueWhatsapp': 'व्हाट्सऐप पर जारी रखें',
      'guide.anotherQuestion': 'एक और सवाल भेजें',
      'guide.required': 'कृपया सभी फ़ील्ड भरें और अनुमति की पुष्टि करें।',
      'guide.opened': 'व्हाट्सऐप खुल रहा है। अगर नहीं खुला, तो व्हाट्सऐप पर जारी रखें पर टैप करें।',
      'guide.whatsappIntro': 'निच ऑफ ट्रुथ वेबसाइट पूछताछ',
      'feedback.eyebrow': 'मुफ्त मलयालम कुरआन प्रति',
      'feedback.title': 'अपनी प्रतिक्रिया साझा करें',
      'feedback.intro': 'आप अपना संदेश टाइप कर सकते हैं या वॉइस इनपुट का उपयोग कर सकते हैं। आपकी प्रतिक्रिया हमें केरल के आगंतुकों की बेहतर सेवा करने में मदद करती है।',
      'feedback.name': 'नाम',
      'feedback.namePlaceholder': 'आपका नाम',
      'feedback.phone': 'मोबाइल या व्हाट्सऐप',
      'feedback.district': 'जिला',
      'feedback.message': 'प्रतिक्रिया',
      'feedback.messagePlaceholder': 'कृपया अपने विचार, सवाल या फॉलो-अप अनुरोध साझा करें।',
      'feedback.voiceStart': 'वॉइस शुरू करें',
      'feedback.voiceStop': 'वॉइस रोकें',
      'feedback.voiceOptional': 'वॉइस इनपुट वैकल्पिक है।',
      'feedback.voiceListening': 'सुन रहा है... अपनी प्रतिक्रिया बोलें।',
      'feedback.voiceStopped': 'वॉइस रुक गई। सबमिट करने से पहले आप टेक्स्ट संपादित कर सकते हैं।',
      'feedback.voiceFailed': 'वॉइस इनपुट विफल रहा। कृपया अपनी प्रतिक्रिया टाइप करें।',
      'feedback.voiceUnsupported': 'इस ब्राउज़र में वॉइस इनपुट समर्थित नहीं है। कृपया अपनी प्रतिक्रिया टाइप करें।',
      'feedback.submit': 'प्रतिक्रिया भेजें',
      'feedback.submitting': 'भेजा जा रहा है...',
      'feedback.thanksTitle': 'आपकी प्रतिक्रिया के लिए धन्यवाद।',
      'feedback.thanksNamed': 'धन्यवाद, {name}।',
      'feedback.thanksBody': 'हमें आपका संदेश मिल गया है और हम जल्द ही आपसे संपर्क करेंगे, इंशा अल्लाह।',
      'feedback.closeHint': 'यह पेज अपने आप बंद होने की कोशिश करेगा। अगर यह खुला रहे, तो आप इस टैब को बंद कर सकते हैं।',
      'feedback.closePage': 'पेज बंद करें',
      'admin.loginEyebrow': 'एडमिन लॉगिन',
      'admin.entriesTitle': 'प्रतिक्रिया प्रविष्टियां',
      'admin.loginIntro': 'जमा की गई प्रतिक्रिया देखने के लिए लॉगिन करें।',
      'admin.email': 'ईमेल',
      'admin.password': 'पासवर्ड',
      'admin.login': 'लॉगिन',
      'admin.loggingIn': 'लॉगिन हो रहा है...',
      'admin.loginUnavailable': 'लॉगिन उपलब्ध नहीं है। कृपया बाद में फिर कोशिश करें।',
      'admin.loginFailed': 'लॉगिन विफल रहा। कृपया ईमेल और पासवर्ड जांचें।',
      'admin.listEyebrow': 'एडमिन प्रतिक्रिया सूची',
      'admin.logout': 'लॉगआउट',
      'admin.submittedDate': 'जमा करने की तारीख',
      'admin.search': 'खोजें',
      'admin.clear': 'साफ करें',
      'admin.date': 'तारीख',
      'admin.phone': 'फोन',
      'admin.loading': 'प्रतिक्रिया लोड हो रही है...',
      'admin.noEntries': 'अभी कोई प्रतिक्रिया प्रविष्टि नहीं है।',
      'admin.noEntriesFound': 'कोई प्रतिक्रिया प्रविष्टि नहीं मिली।',
      'admin.unableToLoad': 'प्रतिक्रिया प्रविष्टियां लोड नहीं हो सकीं।',
      'admin.entriesFoundOne': '1 प्रतिक्रिया प्रविष्टि मिली।',
      'admin.entriesFoundMany': '{count} प्रतिक्रिया प्रविष्टियां मिलीं।',
      'guideAdmin.eyebrow': 'गाइड नंबर',
      'guideAdmin.title': 'गाइड नंबर',
      'guideAdmin.intro': 'Ask a Question के लिए उपयोग होने वाले काउंसलर WhatsApp नंबर जोड़ें या अपडेट करें।',
      'guideAdmin.name': 'गाइड का नाम',
      'guideAdmin.phone': 'WhatsApp नंबर',
      'guideAdmin.languages': 'भाषाएं',
      'guideAdmin.intentions': 'उद्देश्य',
      'guideAdmin.active': 'रूटिंग के लिए सक्रिय',
      'guideAdmin.save': 'गाइड सेव करें',
      'guideAdmin.reset': 'रीसेट',
      'guideAdmin.status': 'स्थिति',
      'guideAdmin.actions': 'कार्य',
      'guideAdmin.edit': 'संपादित करें',
      'guideAdmin.delete': 'हटाएं',
      'guideAdmin.activeStatus': 'सक्रिय',
      'guideAdmin.inactiveStatus': 'निष्क्रिय',
      'guideAdmin.loading': 'गाइड नंबर लोड हो रहे हैं...',
      'guideAdmin.noGuides': 'अभी कोई गाइड नंबर नहीं जोड़ा गया है।',
      'guideAdmin.saved': 'गाइड नंबर सेव हो गया।',
      'guideAdmin.deleted': 'गाइड नंबर हटा दिया गया।',
      'guideAdmin.required': 'कृपया नाम, WhatsApp नंबर, भाषा और उद्देश्य जोड़ें।',
      'guideAdmin.loadFailed': 'गाइड नंबर लोड नहीं हो सके।',
      'guideAdmin.saveFailed': 'गाइड नंबर सेव नहीं हो सका।',
      'guideAdmin.deleteFailed': 'गाइड नंबर हटाया नहीं जा सका।',
      'district.select': 'जिला चुनें',
      'district.all': 'सभी जिले',
      'district.thiruvananthapuram': 'तिरुवनंतपुरम',
      'district.kollam': 'कोल्लम',
      'district.pathanamthitta': 'पत्तनमथिट्टा',
      'district.alappuzha': 'अलप्पुझा',
      'district.kottayam': 'कोट्टायम',
      'district.idukki': 'इडुक्की',
      'district.ernakulam': 'एर्नाकुलम',
      'district.thrissur': 'त्रिशूर',
      'district.palakkad': 'पलक्कड़',
      'district.malappuram': 'मलप्पुरम',
      'district.kozhikode': 'कोझिकोड',
      'district.wayanad': 'वायनाड',
      'district.kannur': 'कन्नूर',
      'district.kasaragod': 'कासरगोड'
    },
    ml: {
      'brand.name': 'നിച് ഓഫ് ട്രൂത്ത്',
      'brand.tagline': 'രക്ഷയിലേക്ക് നയിക്കുന്നു',
      'brand.feedback': 'ഖുർആൻ പ്രതികരണം',
      'brand.admin': 'പ്രതികരണ അഡ്മിൻ',
      'language.label': 'ഭാഷ',
      'nav.feedback': 'പ്രതികരണം',
      'ribbon.home': 'ഹോം',
      'ribbon.birth': 'ജനനം',
      'ribbon.death': 'മരണം',
      'ribbon.purpose': 'ജീവിത ലക്ഷ്യം',
      'ribbon.revert': 'മടങ്ങിവരവ്',
      'birth.eyebrow': 'ആദ്യ കരച്ചിൽ',
      'birth.title': 'ഒരു ചോദ്യം ഉള്ളിൽ തന്നെ കൊണ്ടാണ് ജീവിതം തുടങ്ങുന്നത്.',
      'birth.lead': 'ഓരോ ജനനവും നിസ്സഹായവും വിലപ്പെട്ടതും ആശ്രിതവുമായാണ് എത്തുന്നത്. സംസാരിക്കാൻ മുമ്പേ ജീവിതം ചോദിക്കുന്നു: ഈ ശ്വാസവും പരിചരണവും ലക്ഷ്യവും ആരാണ് എനിക്ക് നൽകിയത്?',
      'birth.body': 'ആ തുടക്കത്തെ വിനയത്തോടെ നോക്കാൻ ഇസ്ലാം ഹൃദയത്തെ ക്ഷണിക്കുന്നു. നമ്മൾ നമ്മെ സ്വയം സൃഷ്ടിച്ചില്ല. നമുക്ക് അസ്തിത്വം നൽകപ്പെട്ടു, സംരക്ഷിക്കപ്പെട്ടു, സ്രഷ്ടാവിനെ അറിയുന്ന ജീവിതത്തിലേക്ക് നയിക്കപ്പെട്ടു.',
      'birth.askCta': 'ജീവിതവും ലക്ഷ്യവും കുറിച്ച് ചോദിക്കുക',
      'home.eyebrow': 'സത്യസന്ധമായ ചോദ്യങ്ങൾക്കും ശാന്തമായ ഉത്തരങ്ങൾക്കും തുറന്ന ഹൃദയങ്ങൾക്കും',
      'home.title': 'സ്വതന്ത്രമായി ചോദിക്കുക. ആഴത്തിൽ ചിന്തിക്കുക. വ്യക്തതയോടെ ഇസ്ലാം അറിയുക.',
      'home.lead': 'ഇസ്ലാമിനെക്കുറിച്ച് ചോദ്യങ്ങൾ ചോദിക്കാനും മാർഗനിർദേശം തേടാനും വിശുദ്ധ ഖുർആന്റെ സൗജന്യ മലയാള വിവർത്തനം ലഭിച്ച ശേഷം പ്രതികരണം പങ്കിടാനും മുസ്ലിം അല്ലാത്ത സന്ദർശകർക്ക് സ്വാഗതം ചെയ്യുന്ന ഇടമാണ് നിച് ഓഫ് ട്രൂത്ത്.',
      'home.feedbackCta': 'ഖുർആൻ പ്രതികരണം നൽകുക',
      'home.askCta': 'ചോദ്യം ചോദിക്കുക',
      'guide.eyebrow': 'സൗഹൃദ ഗൈഡ്',
      'guide.title': 'ചോദ്യം ചോദിക്കുക',
      'guide.intro': 'ശരിയായ കൗൺസിലറുമായി ബന്ധിപ്പിക്കാൻ കുറച്ച് വിവരങ്ങൾ പങ്കിടുക.',
      'guide.location': 'സ്ഥലം',
      'guide.locationPlaceholder': 'നഗരം അല്ലെങ്കിൽ ജില്ല',
      'guide.profession': 'തൊഴിൽ',
      'guide.professionPlaceholder': 'നിങ്ങളുടെ തൊഴിൽ',
      'guide.intention': 'ഉദ്ദേശ്യം',
      'guide.intentionSelect': 'ഉദ്ദേശ്യം തിരഞ്ഞെടുക്കുക',
      'guide.intentLearn': 'പഠിക്കാൻ',
      'guide.intentEmbrace': 'ഇസ്ലാം സ്വീകരിക്കാൻ',
      'guide.intentCounseling': 'കൗൺസിലിംഗ് വേണം',
      'guide.intentQuran': 'ഖുർആൻ കോപ്പി വേണം',
      'guide.intentOther': 'മറ്റൊരു ചോദ്യം',
      'guide.question': 'ചോദ്യം',
      'guide.questionPlaceholder': 'നിങ്ങളുടെ ചോദ്യം ചുരുക്കത്തിൽ എഴുതുക.',
      'guide.consent': 'ഈ വിവരങ്ങൾ വാട്സ്ആപ്പിൽ നിച് ഓഫ് ട്രൂത്ത് കൗൺസിലറുമായി പങ്കിടാൻ ഞാൻ സമ്മതിക്കുന്നു.',
      'guide.connect': 'വാട്സ്ആപ്പിൽ ബന്ധപ്പെടുക',
      'guide.continueWhatsapp': 'വാട്സ്ആപ്പിൽ തുടരുക',
      'guide.anotherQuestion': 'മറ്റൊരു ചോദ്യം സമർപ്പിക്കുക',
      'guide.required': 'ദയവായി എല്ലാ വിവരങ്ങളും പൂരിപ്പിച്ച് സമ്മതം സ്ഥിരീകരിക്കുക.',
      'guide.opened': 'വാട്സ്ആപ്പ് തുറക്കുന്നു. തുറന്നില്ലെങ്കിൽ, വാട്സ്ആപ്പിൽ തുടരുക എന്നത് ടാപ്പ് ചെയ്യുക.',
      'guide.whatsappIntro': 'നിച് ഓഫ് ട്രൂത്ത് വെബ്സൈറ്റ് അന്വേഷണം',
      'feedback.eyebrow': 'സൗജന്യ മലയാള ഖുർആൻ കോപ്പി',
      'feedback.title': 'നിങ്ങളുടെ പ്രതികരണം പങ്കിടുക',
      'feedback.intro': 'നിങ്ങൾക്ക് സന്ദേശം ടൈപ്പ് ചെയ്യുകയോ വോയ്സ് ഇൻപുട്ട് ഉപയോഗിക്കുകയോ ചെയ്യാം. കേരളത്തിലുടനീളമുള്ള സന്ദർശകരെ കൂടുതൽ മെച്ചമായി സേവിക്കാൻ നിങ്ങളുടെ പ്രതികരണം ഞങ്ങളെ സഹായിക്കുന്നു.',
      'feedback.name': 'പേര്',
      'feedback.namePlaceholder': 'നിങ്ങളുടെ പേര്',
      'feedback.phone': 'മൊബൈൽ അല്ലെങ്കിൽ വാട്സ്ആപ്പ്',
      'feedback.district': 'ജില്ല',
      'feedback.message': 'പ്രതികരണം',
      'feedback.messagePlaceholder': 'ദയവായി നിങ്ങളുടെ ചിന്തകൾ, ചോദ്യങ്ങൾ, അല്ലെങ്കിൽ ഫോളോ-അപ്പ് അഭ്യർത്ഥന പങ്കിടുക.',
      'feedback.voiceStart': 'വോയ്സ് ആരംഭിക്കുക',
      'feedback.voiceStop': 'വോയ്സ് നിർത്തുക',
      'feedback.voiceOptional': 'വോയ്സ് ഇൻപുട്ട് ഐച്ഛികമാണ്.',
      'feedback.voiceListening': 'കേൾക്കുന്നു... നിങ്ങളുടെ പ്രതികരണം പറയുക.',
      'feedback.voiceStopped': 'വോയ്സ് നിർത്തി. സമർപ്പിക്കുന്നതിന് മുമ്പ് ടെക്സ്റ്റ് തിരുത്താം.',
      'feedback.voiceFailed': 'വോയ്സ് ഇൻപുട്ട് പരാജയപ്പെട്ടു. ദയവായി നിങ്ങളുടെ പ്രതികരണം ടൈപ്പ് ചെയ്യുക.',
      'feedback.voiceUnsupported': 'ഈ ബ്രൗസറിൽ വോയ്സ് ഇൻപുട്ട് പിന്തുണയ്ക്കുന്നില്ല. ദയവായി നിങ്ങളുടെ പ്രതികരണം ടൈപ്പ് ചെയ്യുക.',
      'feedback.submit': 'പ്രതികരണം സമർപ്പിക്കുക',
      'feedback.submitting': 'സമർപ്പിക്കുന്നു...',
      'feedback.thanksTitle': 'നിങ്ങളുടെ പ്രതികരണത്തിന് നന്ദി.',
      'feedback.thanksNamed': 'നന്ദി, {name}.',
      'feedback.thanksBody': 'നിങ്ങളുടെ സന്ദേശം ഞങ്ങൾക്ക് ലഭിച്ചു. ഇൻഷാ അല്ലാഹ്, ഉടൻ തന്നെ ഞങ്ങൾ നിങ്ങളെ ബന്ധപ്പെടും.',
      'feedback.closeHint': 'ഈ പേജ് സ്വയം അടയ്ക്കാൻ ശ്രമിക്കും. തുറന്നുതന്നെ ഇരിക്കുകയാണെങ്കിൽ, ഈ ടാബ് അടയ്ക്കാം.',
      'feedback.closePage': 'പേജ് അടയ്ക്കുക',
      'admin.loginEyebrow': 'അഡ്മിൻ ലോഗിൻ',
      'admin.entriesTitle': 'പ്രതികരണ എൻട്രികൾ',
      'admin.loginIntro': 'സമർപ്പിച്ച പ്രതികരണങ്ങൾ കാണാൻ ലോഗിൻ ചെയ്യുക.',
      'admin.email': 'ഇമെയിൽ',
      'admin.password': 'പാസ്‌വേഡ്',
      'admin.login': 'ലോഗിൻ',
      'admin.loggingIn': 'ലോഗിൻ ചെയ്യുന്നു...',
      'admin.loginUnavailable': 'ലോഗിൻ ലഭ്യമല്ല. ദയവായി പിന്നീട് വീണ്ടും ശ്രമിക്കുക.',
      'admin.loginFailed': 'ലോഗിൻ പരാജയപ്പെട്ടു. ഇമെയിലും പാസ്‌വേഡും പരിശോധിക്കുക.',
      'admin.listEyebrow': 'അഡ്മിൻ പ്രതികരണ പട്ടിക',
      'admin.logout': 'ലോഗൗട്ട്',
      'admin.submittedDate': 'സമർപ്പിച്ച തീയതി',
      'admin.search': 'തിരയുക',
      'admin.clear': 'മായ്ക്കുക',
      'admin.date': 'തീയതി',
      'admin.phone': 'ഫോൺ',
      'admin.loading': 'പ്രതികരണങ്ങൾ ലോഡ് ചെയ്യുന്നു...',
      'admin.noEntries': 'ഇനിയും പ്രതികരണ എൻട്രികൾ ഇല്ല.',
      'admin.noEntriesFound': 'പ്രതികരണ എൻട്രികൾ കണ്ടെത്തിയില്ല.',
      'admin.unableToLoad': 'പ്രതികരണ എൻട്രികൾ ലോഡ് ചെയ്യാനായില്ല.',
      'admin.entriesFoundOne': '1 പ്രതികരണ എൻട്രി കണ്ടെത്തി.',
      'admin.entriesFoundMany': '{count} പ്രതികരണ എൻട്രികൾ കണ്ടെത്തി.',
      'guideAdmin.eyebrow': 'ഗൈഡ് നമ്പറുകൾ',
      'guideAdmin.title': 'ഗൈഡ് നമ്പറുകൾ',
      'guideAdmin.intro': 'ചോദ്യം ചോദിക്കുക എന്നതിൽ ഉപയോഗിക്കുന്ന കൗൺസിലർ WhatsApp നമ്പറുകൾ ചേർക്കുകയോ തിരുത്തുകയോ ചെയ്യുക.',
      'guideAdmin.name': 'ഗൈഡിന്റെ പേര്',
      'guideAdmin.phone': 'WhatsApp നമ്പർ',
      'guideAdmin.languages': 'ഭാഷകൾ',
      'guideAdmin.intentions': 'ഉദ്ദേശ്യങ്ങൾ',
      'guideAdmin.active': 'റൂട്ടിംഗിന് സജീവം',
      'guideAdmin.save': 'ഗൈഡ് സേവ് ചെയ്യുക',
      'guideAdmin.reset': 'റീസെറ്റ്',
      'guideAdmin.status': 'സ്ഥിതി',
      'guideAdmin.actions': 'നടപടികൾ',
      'guideAdmin.edit': 'തിരുത്തുക',
      'guideAdmin.delete': 'നീക്കം ചെയ്യുക',
      'guideAdmin.activeStatus': 'സജീവം',
      'guideAdmin.inactiveStatus': 'നിഷ്ക്രിയം',
      'guideAdmin.loading': 'ഗൈഡ് നമ്പറുകൾ ലോഡ് ചെയ്യുന്നു...',
      'guideAdmin.noGuides': 'ഇനിയും ഗൈഡ് നമ്പറുകൾ ചേർത്തിട്ടില്ല.',
      'guideAdmin.saved': 'ഗൈഡ് നമ്പർ സേവ് ചെയ്തു.',
      'guideAdmin.deleted': 'ഗൈഡ് നമ്പർ നീക്കം ചെയ്തു.',
      'guideAdmin.required': 'ദയവായി പേര്, WhatsApp നമ്പർ, ഭാഷ, ഉദ്ദേശ്യം ചേർക്കുക.',
      'guideAdmin.loadFailed': 'ഗൈഡ് നമ്പറുകൾ ലോഡ് ചെയ്യാനായില്ല.',
      'guideAdmin.saveFailed': 'ഗൈഡ് നമ്പർ സേവ് ചെയ്യാനായില്ല.',
      'guideAdmin.deleteFailed': 'ഗൈഡ് നമ്പർ നീക്കം ചെയ്യാനായില്ല.',
      'district.select': 'ജില്ല തിരഞ്ഞെടുക്കുക',
      'district.all': 'എല്ലാ ജില്ലകളും',
      'district.thiruvananthapuram': 'തിരുവനന്തപുരം',
      'district.kollam': 'കൊല്ലം',
      'district.pathanamthitta': 'പത്തനംതിട്ട',
      'district.alappuzha': 'ആലപ്പുഴ',
      'district.kottayam': 'കോട്ടയം',
      'district.idukki': 'ഇടുക്കി',
      'district.ernakulam': 'എറണാകുളം',
      'district.thrissur': 'തൃശൂർ',
      'district.palakkad': 'പാലക്കാട്',
      'district.malappuram': 'മലപ്പുറം',
      'district.kozhikode': 'കോഴിക്കോട്',
      'district.wayanad': 'വയനാട്',
      'district.kannur': 'കണ്ണൂർ',
      'district.kasaragod': 'കാസർഗോഡ്'
    },
    ar: {
      'brand.name': 'مشكاة الحق',
      'brand.tagline': 'الهداية إلى النجاة',
      'brand.feedback': 'ملاحظات القرآن',
      'brand.admin': 'إدارة الملاحظات',
      'language.label': 'اللغة',
      'nav.feedback': 'الملاحظات',
      'ribbon.home': 'الرئيسية',
      'ribbon.birth': 'الميلاد',
      'ribbon.death': 'الموت',
      'ribbon.purpose': 'غاية الحياة',
      'ribbon.revert': 'العودة',
      'birth.eyebrow': 'الصرخة الأولى',
      'birth.title': 'تبدأ الحياة وسؤالها يسكن داخلها.',
      'birth.lead': 'يأتي كل مولود عاجزا، مكرما، ومحتاجا إلى الرعاية. قبل أن يتكلم الإنسان، تسأل الحياة: من منحني هذا النفس وهذه العناية وهذا الهدف؟',
      'birth.body': 'يدعو الإسلام القلب إلى النظر إلى تلك البداية بتواضع. نحن لم نخلق أنفسنا. لقد أوجدنا الله، ورعانا، وهدانا إلى حياة تعرف خالقها.',
      'birth.askCta': 'اسأل عن الحياة والغاية',
      'home.eyebrow': 'لأسئلة صادقة، وإجابات هادئة، وقلوب منفتحة',
      'home.title': 'اسأل بحرية. تأمل بعمق. تعرّف إلى الإسلام بوضوح.',
      'home.lead': 'مشكاة الحق مساحة ترحيبية للزوار غير المسلمين لطرح أسئلة عن الإسلام، وطلب التوجيه، ومشاركة الملاحظات بعد استلام ترجمة مالايالامية مجانية للقرآن الكريم.',
      'home.feedbackCta': 'أرسل ملاحظات القرآن',
      'home.askCta': 'اطرح سؤالا',
      'guide.eyebrow': 'دليل ودود',
      'guide.title': 'اطرح سؤالا',
      'guide.intro': 'شارك بعض التفاصيل حتى نوصلك بالمستشار المناسب.',
      'guide.location': 'الموقع',
      'guide.locationPlaceholder': 'المدينة أو المنطقة',
      'guide.profession': 'المهنة',
      'guide.professionPlaceholder': 'مهنتك',
      'guide.intention': 'النية',
      'guide.intentionSelect': 'اختر النية',
      'guide.intentLearn': 'للتعلم',
      'guide.intentEmbrace': 'لاعتناق الإسلام',
      'guide.intentCounseling': 'أحتاج إلى استشارة',
      'guide.intentQuran': 'أحتاج نسخة من القرآن',
      'guide.intentOther': 'سؤال آخر',
      'guide.question': 'السؤال',
      'guide.questionPlaceholder': 'اكتب سؤالك باختصار.',
      'guide.consent': 'أوافق على مشاركة هذه التفاصيل مع مستشار مشكاة الحق عبر واتساب.',
      'guide.connect': 'التواصل عبر واتساب',
      'guide.continueWhatsapp': 'المتابعة على واتساب',
      'guide.anotherQuestion': 'إرسال سؤال آخر',
      'guide.required': 'يرجى تعبئة جميع الحقول وتأكيد الموافقة.',
      'guide.opened': 'يتم فتح واتساب الآن. إذا لم يفتح، اضغط على المتابعة على واتساب.',
      'guide.whatsappIntro': 'استفسار من موقع مشكاة الحق',
      'feedback.eyebrow': 'نسخة مجانية من القرآن بالمالايالامية',
      'feedback.title': 'شارك ملاحظاتك',
      'feedback.intro': 'يمكنك كتابة رسالتك أو استخدام الإدخال الصوتي. تساعدنا ملاحظاتك على تحسين خدمتنا للزوار في كيرلا.',
      'feedback.name': 'الاسم',
      'feedback.namePlaceholder': 'اسمك',
      'feedback.phone': 'الجوال أو واتساب',
      'feedback.district': 'المنطقة',
      'feedback.message': 'الملاحظات',
      'feedback.messagePlaceholder': 'يرجى مشاركة أفكارك أو أسئلتك أو طلب المتابعة.',
      'feedback.voiceStart': 'ابدأ الصوت',
      'feedback.voiceStop': 'أوقف الصوت',
      'feedback.voiceOptional': 'الإدخال الصوتي اختياري.',
      'feedback.voiceListening': 'نستمع الآن... تحدّث بملاحظاتك.',
      'feedback.voiceStopped': 'توقف الصوت. يمكنك تعديل النص قبل الإرسال.',
      'feedback.voiceFailed': 'فشل الإدخال الصوتي. يرجى كتابة ملاحظاتك.',
      'feedback.voiceUnsupported': 'الإدخال الصوتي غير مدعوم في هذا المتصفح. يرجى كتابة ملاحظاتك.',
      'feedback.submit': 'إرسال الملاحظات',
      'feedback.submitting': 'جار الإرسال...',
      'feedback.thanksTitle': 'شكرا لملاحظاتك.',
      'feedback.thanksNamed': 'شكرا، {name}.',
      'feedback.thanksBody': 'لقد استلمنا رسالتك وسنتواصل معك قريبا، إن شاء الله.',
      'feedback.closeHint': 'ستحاول هذه الصفحة الإغلاق تلقائيا. إذا بقيت مفتوحة، يمكنك إغلاق هذا التبويب.',
      'feedback.closePage': 'إغلاق الصفحة',
      'admin.loginEyebrow': 'تسجيل دخول الإدارة',
      'admin.entriesTitle': 'إدخالات الملاحظات',
      'admin.loginIntro': 'سجّل الدخول لعرض الملاحظات المرسلة.',
      'admin.email': 'البريد الإلكتروني',
      'admin.password': 'كلمة المرور',
      'admin.login': 'تسجيل الدخول',
      'admin.loggingIn': 'جار تسجيل الدخول...',
      'admin.loginUnavailable': 'تسجيل الدخول غير متاح. يرجى المحاولة لاحقا.',
      'admin.loginFailed': 'فشل تسجيل الدخول. يرجى التحقق من البريد الإلكتروني وكلمة المرور.',
      'admin.listEyebrow': 'قائمة ملاحظات الإدارة',
      'admin.logout': 'تسجيل الخروج',
      'admin.submittedDate': 'تاريخ الإرسال',
      'admin.search': 'بحث',
      'admin.clear': 'مسح',
      'admin.date': 'التاريخ',
      'admin.phone': 'الهاتف',
      'admin.loading': 'جار تحميل الملاحظات...',
      'admin.noEntries': 'لا توجد إدخالات ملاحظات حتى الآن.',
      'admin.noEntriesFound': 'لم يتم العثور على ملاحظات.',
      'admin.unableToLoad': 'تعذر تحميل إدخالات الملاحظات.',
      'admin.entriesFoundOne': 'تم العثور على إدخال واحد.',
      'admin.entriesFoundMany': 'تم العثور على {count} إدخالات.',
      'guideAdmin.eyebrow': 'أرقام المرشدين',
      'guideAdmin.title': 'أرقام المرشدين',
      'guideAdmin.intro': 'أضف أو حدّث أرقام واتساب للمستشارين المستخدمة في اطلب سؤالا.',
      'guideAdmin.name': 'اسم المرشد',
      'guideAdmin.phone': 'رقم واتساب',
      'guideAdmin.languages': 'اللغات',
      'guideAdmin.intentions': 'النيات',
      'guideAdmin.active': 'نشط للتوجيه',
      'guideAdmin.save': 'حفظ المرشد',
      'guideAdmin.reset': 'إعادة ضبط',
      'guideAdmin.status': 'الحالة',
      'guideAdmin.actions': 'الإجراءات',
      'guideAdmin.edit': 'تعديل',
      'guideAdmin.delete': 'حذف',
      'guideAdmin.activeStatus': 'نشط',
      'guideAdmin.inactiveStatus': 'غير نشط',
      'guideAdmin.loading': 'جار تحميل أرقام المرشدين...',
      'guideAdmin.noGuides': 'لم تتم إضافة أرقام مرشدين بعد.',
      'guideAdmin.saved': 'تم حفظ رقم المرشد.',
      'guideAdmin.deleted': 'تم حذف رقم المرشد.',
      'guideAdmin.required': 'يرجى إضافة الاسم ورقم واتساب واللغة والنية.',
      'guideAdmin.loadFailed': 'تعذر تحميل أرقام المرشدين.',
      'guideAdmin.saveFailed': 'تعذر حفظ رقم المرشد.',
      'guideAdmin.deleteFailed': 'تعذر حذف رقم المرشد.',
      'district.select': 'اختر المنطقة',
      'district.all': 'كل المناطق',
      'district.thiruvananthapuram': 'ثيروفانانثابورام',
      'district.kollam': 'كولام',
      'district.pathanamthitta': 'باثانامثيتا',
      'district.alappuzha': 'ألابوزا',
      'district.kottayam': 'كوتايام',
      'district.idukki': 'إدوكي',
      'district.ernakulam': 'إرناكولام',
      'district.thrissur': 'تريسور',
      'district.palakkad': 'بالاكاد',
      'district.malappuram': 'مالابورام',
      'district.kozhikode': 'كوزيكود',
      'district.wayanad': 'واياناد',
      'district.kannur': 'كانور',
      'district.kasaragod': 'كاساراجود'
    }
  };
  let currentLanguage = getSavedLanguage();
  let lastRenderedEntries = [];

  function getEntries() {
    try {
      return JSON.parse(localStorage.getItem(storageKey) || '[]');
    } catch {
      return [];
    }
  }

  function getSavedLanguage() {
    try {
      const savedLanguage = localStorage.getItem(languageKey);
      return translations[savedLanguage] ? savedLanguage : 'en';
    } catch {
      return 'en';
    }
  }

  function saveLanguage(language) {
    try {
      localStorage.setItem(languageKey, language);
    } catch {
      // The selector still works for this page even if persistence is unavailable.
    }
  }

  function t(key, replacements) {
    const dictionary = translations[currentLanguage] || translations.en;
    let value = dictionary[key] || translations.en[key] || key;

    if (replacements) {
      Object.keys(replacements).forEach(function (name) {
        value = value.replace(`{${name}}`, replacements[name]);
      });
    }

    return value;
  }

  function applyLanguage() {
    document.documentElement.lang = currentLanguage;
    document.documentElement.dir = currentLanguage === 'ar' ? 'rtl' : 'ltr';

    document.querySelectorAll('[data-i18n]').forEach(function (element) {
      element.textContent = t(element.getAttribute('data-i18n'));
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (element) {
      element.setAttribute('placeholder', t(element.getAttribute('data-i18n-placeholder')));
    });

    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) {
      languageSelect.value = currentLanguage;
    }

    const questionLanguage = document.getElementById('questionLanguage');
    if (questionLanguage) {
      questionLanguage.value = currentLanguage;
    }

    updateDocumentTitle();
  }

  function updateDocumentTitle() {
    if (document.getElementById('feedbackForm')) {
      document.title = `${t('feedback.title')} | ${t('brand.name')}`;
      return;
    }

    if (document.getElementById('loginForm')) {
      document.title = `${t('admin.entriesTitle')} | ${t('brand.name')}`;
      return;
    }

    document.title = t('brand.name');
  }

  function setupLanguageSelector() {
    const languageSelect = document.getElementById('languageSelect');
    if (!languageSelect) return;

    languageSelect.value = currentLanguage;
    languageSelect.addEventListener('change', function () {
      currentLanguage = translations[languageSelect.value] ? languageSelect.value : 'en';
      saveLanguage(currentLanguage);
      applyLanguage();
      updateVoiceUi();

      if (entriesBody) {
        renderEntries(lastRenderedEntries);
      }
    });
  }

  function setupQuestionWidget() {
    const askQuestionButton = document.getElementById('askQuestionButton');
    const questionWidget = document.getElementById('questionWidget');
    const closeQuestionWidget = document.getElementById('closeQuestionWidget');
    const questionForm = document.getElementById('questionForm');
    const questionLanguage = document.getElementById('questionLanguage');
    const questionMessage = document.getElementById('questionMessage');
    const questionWhatsappLink = document.getElementById('questionWhatsappLink');
    const questionReset = document.getElementById('questionReset');

    if (!askQuestionButton || !questionWidget || !questionForm || !questionLanguage) return;

    questionLanguage.value = currentLanguage;

    askQuestionButton.addEventListener('click', function () {
      questionWidget.hidden = false;
      questionLanguage.value = currentLanguage;
      document.getElementById('questionName').focus();
    });

    if (closeQuestionWidget) {
      closeQuestionWidget.addEventListener('click', function () {
        questionWidget.hidden = true;
        questionMessage.textContent = '';
        resetQuestionHandoff();
      });
    }

    questionLanguage.addEventListener('change', function () {
      currentLanguage = translations[questionLanguage.value] ? questionLanguage.value : 'en';
      saveLanguage(currentLanguage);
      applyLanguage();
      updateVoiceUi();
    });

    questionForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const details = {
        language: questionLanguage.options[questionLanguage.selectedIndex].text,
        name: document.getElementById('questionName').value.trim(),
        phone: document.getElementById('questionPhone').value.trim(),
        location: document.getElementById('questionLocation').value.trim(),
        profession: document.getElementById('questionProfession').value.trim(),
        intention: document.getElementById('questionIntention').value,
        question: document.getElementById('questionText').value.trim(),
        consent: document.getElementById('questionConsent').checked
      };

      if (!details.name || !details.phone || !details.location || !details.profession || !details.intention || !details.question || !details.consent) {
        questionMessage.textContent = t('guide.required');
        resetQuestionHandoff();
        return;
      }

      const guide = selectGuide(details);
      const text = [
        t('guide.whatsappIntro'),
        '',
        `Name: ${details.name}`,
        `Mobile: ${details.phone}`,
        `Location: ${details.location}`,
        `Profession: ${details.profession}`,
        `Language: ${details.language}`,
        `Intention: ${details.intention}`,
        `Question: ${details.question}`
      ].join('\n');
      const whatsappUrl = `https://wa.me/${guide.phone}?text=${encodeURIComponent(text)}`;
      questionWhatsappLink.href = whatsappUrl;
      questionWhatsappLink.hidden = false;
      questionReset.hidden = false;
      questionMessage.textContent = t('guide.opened');
      window.open(whatsappUrl, '_blank', 'noopener');
    });

    questionReset.addEventListener('click', function () {
      questionForm.reset();
      questionLanguage.value = currentLanguage;
      questionMessage.textContent = '';
      resetQuestionHandoff();
    });

    function resetQuestionHandoff() {
      if (questionWhatsappLink) {
        questionWhatsappLink.hidden = true;
        questionWhatsappLink.href = '#';
      }

      if (questionReset) {
        questionReset.hidden = true;
      }
    }
  }

  function setupBirthExperience() {
    const birthNavLink = document.getElementById('birthNavLink');
    const birthExperience = document.getElementById('birthExperience');
    const closeBirthExperience = document.getElementById('closeBirthExperience');
    const birthAudio = document.getElementById('birthAudio');
    const birthPanel = document.getElementById('birth');
    const birthAskButton = document.getElementById('birthAskButton');
    const askQuestionButton = document.getElementById('askQuestionButton');
    let fadeFrame = null;

    if (!birthNavLink || !birthExperience || !birthAudio || !birthPanel) return;

    birthNavLink.addEventListener('click', function (event) {
      event.preventDefault();
      openBirthExperience();
    });

    if (window.location.hash === '#birth') {
      window.setTimeout(openBirthExperience, 400);
    }

    if (closeBirthExperience) {
      closeBirthExperience.addEventListener('click', closeBirthView);
    }

    birthExperience.addEventListener('click', function (event) {
      if (event.target === birthExperience || event.target.classList.contains('topic-focus__backdrop')) {
        closeBirthView();
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && !birthExperience.hidden) {
        closeBirthView();
      }
    });

    if (birthAskButton && askQuestionButton) {
      birthAskButton.addEventListener('click', function () {
        closeBirthView();
        window.setTimeout(function () {
          askQuestionButton.click();
        }, 450);
      });
    }

    function openBirthExperience() {
      birthExperience.hidden = false;
      birthAudio.currentTime = 0;
      birthAudio.volume = 0;
      birthAudio.play().then(function () {
        fadeAudio(0.72, 2200);
      }).catch(function () {
        // The visual transition still works if the browser refuses audio playback.
      });

      window.requestAnimationFrame(function () {
        birthExperience.classList.add('is-visible');
        birthPanel.focus();
      });
    }

    function closeBirthView() {
      birthExperience.classList.remove('is-visible');
      fadeAudio(0, 700, function () {
        birthAudio.pause();
        birthAudio.currentTime = 0;
      });
      window.setTimeout(function () {
        if (!birthExperience.classList.contains('is-visible')) {
          birthExperience.hidden = true;
        }
      }, 900);
    }

    function fadeAudio(targetVolume, duration, onComplete) {
      if (fadeFrame) {
        window.cancelAnimationFrame(fadeFrame);
      }

      const startVolume = birthAudio.volume;
      const startedAt = performance.now();

      function tick(now) {
        const progress = Math.min((now - startedAt) / duration, 1);
        birthAudio.volume = startVolume + ((targetVolume - startVolume) * progress);

        if (progress < 1) {
          fadeFrame = window.requestAnimationFrame(tick);
          return;
        }

        fadeFrame = null;
        if (onComplete) onComplete();
      }

      fadeFrame = window.requestAnimationFrame(tick);
    }
  }

  function selectGuide(details) {
    const matchingGuide = guideNumbers.find(function (guide) {
      return guide.languages.includes(currentLanguage) && guide.intentions.includes(details.intention);
    });

    return matchingGuide || guideNumbers[0];
  }

  function updateVoiceUi() {
    const voiceButton = document.getElementById('voiceButton');
    const voiceStatus = document.getElementById('voiceStatus');

    if (voiceButton && !voiceButton.classList.contains('is-listening')) {
      voiceButton.textContent = t('feedback.voiceStart');
    }

    if (voiceStatus && voiceStatus.dataset.state) {
      voiceStatus.textContent = t(voiceStatus.dataset.state);
    }
  }

  function getSpeechLanguage() {
    if (currentLanguage === 'hi') return 'hi-IN';
    if (currentLanguage === 'ml') return 'ml-IN';
    if (currentLanguage === 'ar') return 'ar-SA';
    return 'en-US';
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
      recognition.lang = getSpeechLanguage();
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onstart = function () {
        listening = true;
        voiceButton.classList.add('is-listening');
        voiceButton.textContent = t('feedback.voiceStop');
        voiceStatus.dataset.state = 'feedback.voiceListening';
        voiceStatus.textContent = t('feedback.voiceListening');
      };

      recognition.onend = function () {
        listening = false;
        voiceButton.classList.remove('is-listening');
        voiceButton.textContent = t('feedback.voiceStart');
        voiceStatus.dataset.state = 'feedback.voiceStopped';
        voiceStatus.textContent = t('feedback.voiceStopped');
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
        voiceStatus.dataset.state = 'feedback.voiceFailed';
        voiceStatus.textContent = t('feedback.voiceFailed');
      };
    } else {
      voiceButton.disabled = true;
      voiceStatus.dataset.state = 'feedback.voiceUnsupported';
      voiceStatus.textContent = t('feedback.voiceUnsupported');
    }

    voiceButton.addEventListener('click', function () {
      if (!recognition) return;
      if (listening) recognition.stop();
      else {
        recognition.lang = getSpeechLanguage();
        recognition.start();
      }
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
      submitButton.textContent = t('feedback.submitting');

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
      thanksTitle.textContent = t('feedback.thanksNamed', { name: entry.name });
      thanks.hidden = false;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.setTimeout(closeFeedbackPage, 2500);
    });
  }

  const entriesBody = document.getElementById('entriesBody');
  const loginForm = document.getElementById('loginForm');
  applyLanguage();
  setupLanguageSelector();
  setupQuestionWidget();
  setupBirthExperience();
  updateVoiceUi();
  loadPublicGuides();

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
    const guideForm = document.getElementById('guideForm');
    const guideStatus = document.getElementById('guideStatus');
    const guidesBody = document.getElementById('guidesBody');
    const guideReset = document.getElementById('guideReset');
    const guideId = document.getElementById('guideId');
    const guideName = document.getElementById('guideName');
    const guidePhone = document.getElementById('guidePhone');
    const guideActive = document.getElementById('guideActive');
    let lastRenderedGuides = [];

    setupAdminPage();

    loginForm.addEventListener('submit', async function (event) {
      event.preventDefault();

      if (!supabaseClient) {
        loginMessage.textContent = t('admin.loginUnavailable');
        return;
      }

      const loginButton = loginForm.querySelector('[type="submit"]');
      loginButton.disabled = true;
      loginButton.textContent = t('admin.loggingIn');
      loginMessage.textContent = '';

      try {
        const { error } = await supabaseClient.auth.signInWithPassword({
          email: document.getElementById('loginEmail').value.trim(),
          password: document.getElementById('loginPassword').value
        });

        if (error) throw error;
        await showEntries();
      } catch (error) {
        loginMessage.textContent = error.message || t('admin.loginFailed');
      } finally {
        loginButton.disabled = false;
        loginButton.textContent = t('admin.login');
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

    if (guideForm) {
      guideForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        await saveGuide();
      });
    }

    if (guideReset) {
      guideReset.addEventListener('click', resetGuideForm);
    }

    if (guidesBody) {
      guidesBody.addEventListener('click', async function (event) {
        const actionButton = event.target.closest('[data-guide-action]');
        if (!actionButton) return;

        const guide = lastRenderedGuides.find(function (item) {
          return item.id === actionButton.dataset.guideId;
        });
        if (!guide) return;

        if (actionButton.dataset.guideAction === 'edit') {
          editGuide(guide);
          return;
        }

        if (actionButton.dataset.guideAction === 'delete') {
          await deleteGuide(guide.id);
        }
      });
    }

    async function setupAdminPage() {
      if (!supabaseClient) {
        loginMessage.textContent = t('admin.loginUnavailable');
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
      await Promise.all([loadEntries(), loadGuides()]);
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

      entriesStatus.textContent = t('admin.loading');
      entriesBody.innerHTML = `<tr><td colspan="5">${t('admin.loading')}</td></tr>`;

      try {
        const { data, error } = await query;
        if (error) throw error;

        renderEntries(data || []);
        entriesStatus.textContent = data && data.length
          ? t(data.length === 1 ? 'admin.entriesFoundOne' : 'admin.entriesFoundMany', { count: data.length })
          : t('admin.noEntriesFound');
      } catch (error) {
        console.error('Feedback load failed:', error);
        entriesStatus.textContent = error.message || t('admin.unableToLoad');
        entriesBody.innerHTML = `<tr><td colspan="5">${t('admin.unableToLoad')}</td></tr>`;
      }
    }

    async function loadGuides() {
      if (!guidesBody) return;

      guideStatus.textContent = t('guideAdmin.loading');
      guidesBody.innerHTML = `<tr><td colspan="6">${t('guideAdmin.loading')}</td></tr>`;

      try {
        const { data, error } = await supabaseClient
          .from('guide_numbers')
          .select('id, name, phone, languages, intentions, is_active, created_at')
          .order('created_at', { ascending: false });

        if (error) throw error;

        const guides = (data || []).map(normalizeGuide);
        lastRenderedGuides = guides;
        renderGuides(guides);
        guideStatus.textContent = guides.length ? '' : t('guideAdmin.noGuides');
        guideNumbers = guides.filter(function (guide) {
          return guide.is_active;
        });

        if (!guideNumbers.length) {
          guideNumbers = fallbackGuideNumbers.slice();
        }
      } catch (error) {
        console.error('Guide load failed:', error);
        guideStatus.textContent = error.message || t('guideAdmin.loadFailed');
        guidesBody.innerHTML = `<tr><td colspan="6">${t('guideAdmin.loadFailed')}</td></tr>`;
      }
    }

    async function saveGuide() {
      const payload = getGuidePayload();
      if (!payload) {
        guideStatus.textContent = t('guideAdmin.required');
        return;
      }

      const saveButton = guideForm.querySelector('[type="submit"]');
      saveButton.disabled = true;
      guideStatus.textContent = '';

      try {
        const query = guideId.value
          ? supabaseClient.from('guide_numbers').update(payload).eq('id', guideId.value)
          : supabaseClient.from('guide_numbers').insert(payload);
        const { error } = await query;
        if (error) throw error;

        resetGuideForm();
        await loadGuides();
        guideStatus.textContent = t('guideAdmin.saved');
      } catch (error) {
        console.error('Guide save failed:', error);
        guideStatus.textContent = error.message || t('guideAdmin.saveFailed');
      } finally {
        saveButton.disabled = false;
      }
    }

    async function deleteGuide(id) {
      guideStatus.textContent = '';

      try {
        const { error } = await supabaseClient
          .from('guide_numbers')
          .delete()
          .eq('id', id);

        if (error) throw error;
        resetGuideForm();
        await loadGuides();
        guideStatus.textContent = t('guideAdmin.deleted');
      } catch (error) {
        console.error('Guide delete failed:', error);
        guideStatus.textContent = error.message || t('guideAdmin.deleteFailed');
      }
    }

    function getGuidePayload() {
      const languages = getCheckedValues('guideLanguage');
      const intentions = getCheckedValues('guideIntention');
      const phone = guidePhone.value.replace(/[^\d]/g, '');
      const name = guideName.value.trim();

      if (!name || !phone || !languages.length || !intentions.length) {
        return null;
      }

      return {
        name,
        phone,
        languages,
        intentions,
        is_active: guideActive.checked
      };
    }

    function editGuide(guide) {
      guideId.value = guide.id;
      guideName.value = guide.name;
      guidePhone.value = guide.phone;
      guideActive.checked = Boolean(guide.is_active);
      setCheckedValues('guideLanguage', guide.languages);
      setCheckedValues('guideIntention', guide.intentions);
      guideName.focus();
    }

    function resetGuideForm() {
      if (!guideForm) return;
      guideForm.reset();
      guideId.value = '';
    }

    function getCheckedValues(name) {
      return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`)).map(function (input) {
        return input.value;
      });
    }

    function setCheckedValues(name, values) {
      document.querySelectorAll(`input[name="${name}"]`).forEach(function (input) {
        input.checked = values.includes(input.value);
      });
    }

    function renderGuides(guides) {
      guidesBody.innerHTML = guides.length
        ? guides.map(function (guide) {
            return `
              <tr>
                <td>${escapeHtml(guide.name || '-')}</td>
                <td>${escapeHtml(guide.phone || '-')}</td>
                <td>${escapeHtml(formatGuideLanguages(guide.languages))}</td>
                <td>${escapeHtml(guide.intentions.join(', ') || '-')}</td>
                <td>${t(guide.is_active ? 'guideAdmin.activeStatus' : 'guideAdmin.inactiveStatus')}</td>
                <td>
                  <div class="table-actions">
                    <button class="button button--secondary-dark" type="button" data-guide-action="edit" data-guide-id="${guide.id}">${t('guideAdmin.edit')}</button>
                    <button class="button button--secondary-dark" type="button" data-guide-action="delete" data-guide-id="${guide.id}">${t('guideAdmin.delete')}</button>
                  </div>
                </td>
              </tr>
            `;
          }).join('')
        : `<tr><td colspan="6">${t('guideAdmin.noGuides')}</td></tr>`;
    }
  }

  if (entriesBody && !loginForm) {
    renderEntries(getEntries());
  }

  function renderEntries(entries) {
    lastRenderedEntries = entries;
    entriesBody.innerHTML = entries.length
      ? entries.map(function (entry) {
          return `
            <tr>
              <td>${formatDate(entry.created_at)}</td>
              <td>${escapeHtml(entry.name || '-')}</td>
              <td>${escapeHtml(entry.phone || '-')}</td>
              <td>${escapeHtml(formatDistrict(entry.district))}</td>
              <td>${escapeHtml(entry.message || '-')}</td>
            </tr>
          `;
        }).join('')
      : `<tr><td colspan="5">${t('admin.noEntries')}</td></tr>`;
  }

  async function loadPublicGuides() {
    if (!supabaseClient) return;

    try {
      const { data, error } = await supabaseClient
        .from('guide_numbers')
        .select('name, phone, languages, intentions, is_active')
        .eq('is_active', true);

      if (error) throw error;

      const activeGuides = (data || []).map(normalizeGuide).filter(function (guide) {
        return guide.is_active;
      });

      if (activeGuides.length) {
        guideNumbers = activeGuides;
      }
    } catch {
      guideNumbers = fallbackGuideNumbers.slice();
    }
  }

  function normalizeGuide(guide) {
    return {
      ...guide,
      languages: Array.isArray(guide.languages) ? guide.languages : [],
      intentions: Array.isArray(guide.intentions) ? guide.intentions : [],
      is_active: guide.is_active !== false
    };
  }

  function formatGuideLanguages(languages) {
    const labels = {
      en: 'English',
      hi: 'Hindi',
      ml: 'Malayalam',
      ar: 'Arabic'
    };

    return languages.map(function (language) {
      return labels[language] || language;
    }).join(', ') || '-';
  }

  function formatDate(value) {
    if (!value) return '-';
    const locale = currentLanguage === 'hi'
      ? 'hi-IN'
      : currentLanguage === 'ml'
        ? 'ml-IN'
        : currentLanguage === 'ar'
          ? 'ar-SA'
          : 'en-IN';
    return new Date(value).toLocaleString(locale);
  }

  function formatDistrict(value) {
    if (!value) return '-';

    const key = value
      .toLowerCase()
      .replace(/[^a-z]/g, '');
    const districtKey = `district.${key}`;

    return translations.en[districtKey] ? t(districtKey) : value;
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
