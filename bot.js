/* ==========================================================================
   🌙 زاد المؤمن - السكربت الموحد للمساعد الرقمي (bot.js)
   تطوير وتصميم: عمر
   ========================================================================== */

const WORKER_URL = "https://zad-bot-proxy.almohanadgamer.workers.dev"; //[span_0](start_span)[span_0](end_span)

// 1. فحص كافة الصفحات المتاحة في التطبيق[span_1](start_span)[span_1](end_span)
const pathname = window.location.pathname; //[span_2](start_span)[span_2](end_span)
const isDuaaPage = pathname.includes('duaa.html'); //[span_3](start_span)[span_3](end_span)
const isAzkarPage = pathname.includes('azkar.html'); //[span_4](start_span)[span_4](end_span)
const isEncyclopediaPage = pathname.includes('encyclopedia.html'); //[span_5](start_span)[span_5](end_span)
const isNamesPage = pathname.includes('names.html'); //[span_6](start_span)[span_6](end_span)
const isSunnahPage = pathname.includes('sunnah.html'); //[span_7](start_span)[span_7](end_span)
const isStoriesPage = pathname.includes('stories.html'); //[span_8](start_span)[span_8](end_span)
const isBooksPage = pathname.includes('books.html'); //[span_9](start_span)[span_9](end_span)

// 2. تعليمات النظام الصارمة المأخوذة من الملفات القديمة[span_10](start_span)[span_10](end_span)
let SYSTEM_INSTRUCTION = "أنت باحث شرعي ومفتي رقمي مساعد في موقع 'زاد المؤمن'، المطوّر والمصمّم من قِبَل (عمر). مهمتك الإجابة حصراً على الأسئلة الشرعية والدينية والفقهية بكل أدب واحترام. يُلزم عليك دائماً وأبداً دعم جميع الفتاوى والأحكام بذكر الأدلة الشرعية الصريحة والمباشرة من آيات القرآن الكريم والأحاديث النبوية الصحيحة مع ذكر تخريج الحديث (مثل: رواه البخاري، رواه مسلم، صححه الألباني)، والاعتماد على مصادر كبار علماء السنة مثل ابن باز وابن عثيمين وعثمان الخميس وغيرهم مع ذكر المصادر دائماً.\n\nتنبيهات صارمة جداً وضوابط عمل:\n1. مطوّر البوت والموقع: إذا سألك المستخدم من هو مطوّر أو صانع أو مبرمج هذا الموقع/البوت، أجب بوضوح واعتزاز بأن المطوّر والصانع هو (عمر).\n2. التخصص الحصري: إذا كان سؤال المستخدم خارج نطاق العلوم الشرعية والدين الإسلامي (مثل: الألعاب، البرمجة، الرياضة، الطقس، الأسئلة العامة)، يرجى الاعتذار منه بكل أدب ولطف، وإخباره بأنك مساعد مخصص حصراً للإجابات والعلوم الشرعية والدينية في موقع 'زاد المؤمن'.\n3. ضابط السلام الصارم: لا تبدأ إجابتك بالسلام ولا الترحيب (مثل: 'وعليكم السلام' أو 'أهلاً بك') إطلاقاً إلا إذا كتب المستخدم صراحة وبنص العبارة 'السلام عليكم' أو صيغها المباشرة (السلام عليكم / السلام عليكم ورحمة الله / السلام عليكم ورحمة الله وبركاته). أما إذا كتب كلمات مثل 'أهلاً' أو 'مرحباً' أو طرَح سؤاله مباشرة، فلا ترد بالسلام أبداً وابدأ بالإجابة مباشرة."; //[span_11](start_span)[span_11](end_span)

// إضافة سياق خاص بكل صفحة للموديل[span_12](start_span)[span_12](end_span)
if (isDuaaPage) SYSTEM_INSTRUCTION += "\n4. سياق خاص بصفحة 'خريطة الدعاء': المستخدم يتصفح حالياً قسم خريطة الدعاء. يُرجى تقديم إجابات متخصصة تدعم مفاهيم هذا القسم (تعريف الدعاء، علاقته بالقدر المبرم والمعلق، أسباب وشروط الاستجابة، موانع الاستجابة، وآداب الدعاء، والرد على الشبهات)."; //[span_13](start_span)[span_13](end_span)
else if (isAzkarPage) SYSTEM_INSTRUCTION += "\n4. سياق خاص بصفحة 'الأذكار اليومية': المستخدم يتصفح حالياً قسم الأذكار. يُرجى تقديم إجابات متخصصة تدعم فضائل الأذكار (أذكار الصباح والمساء، أذكار الاستيقاظ والنوم، أذكار بعد الصلاة) وأحكام المداومة عليها وأوقاتها الشرعية الصحيحة."; //[span_14](start_span)[span_14](end_span)
else if (isEncyclopediaPage) SYSTEM_INSTRUCTION += "\n4. سياق خاص بصفحة 'الموسوعة الإسلامية': المستخدم يتصفح حالياً قسم الموسوعة. يُرجى تقديم إجابات متخصصة حول محتويات الموسوعة وأقسامها المختلفة، والإرشاد إلى الأقسام المناسبة."; //[span_15](start_span)[span_15](end_span)
else if (isNamesPage) SYSTEM_INSTRUCTION += "\n4. سياق خاص بصفحة 'أسماء الله الحسنى': المستخدم يتصفح حالياً قسم الأسماء. يُرجى تقديم إجابات متخصصة حول معاني أسماء الله الحسنى، وكيفية التوسل بها في الدعاء، والآيات والأحاديث المتعلقة بها."; //[span_16](start_span)[span_16](end_span)
else if (isSunnahPage) SYSTEM_INSTRUCTION += "\n4. سياق خاص بصفحة 'السنن النبوية اليومية': المستخدم يتصفح قسم السنن. يُرجى تقديم إجابات حول السنن الرواتب، وهدي النبي ﷺ في الحياة اليومية والآداب الشرعية."; //[span_17](start_span)[span_17](end_span)
else if (isStoriesPage) SYSTEM_INSTRUCTION += "\n4. سياق خاص بصفحة 'قصص وقبسات إيمانية': المستخدم يتصفح قسم القصص. يُرجى تقديم إجابات حول قصص الأنبياء والصحابة والدروس والعبر المستفادة منها لتقوية اليقين."; //[span_18](start_span)[span_18](end_span)
else if (isBooksPage) SYSTEM_INSTRUCTION += "\n4. سياق خاص بصفحة 'المكتبة والكتب الإسلامية': المستخدم يتصفح قسم المكتبة. يُرجى تقديم إجابات حول أمهات الكتب والمؤلفين وإرشاد القارئ للمراجع النافعة."; //[span_19](start_span)[span_19](end_span)

// تحديد الرسائل الترحيبية الخاصة بكل صفحة[span_20](start_span)[span_20](end_span)
function getPageWelcomeMessage() {
    if (isDuaaPage) return "أهلاً بك في قسم خريطة الدعاء! 🤲 يمكنك سؤالي هنا عن أي شيء يتعلق بأحكام الدعاء، آدابه، أسباب وموانع الاستجابة، وسأجيبك فوراً مع الأدلة الشرعية بإذن الله."; //[span_21](start_span)[span_21](end_span)
    if (isAzkarPage) return "أهلاً بك في ركن الأذكار! 📿 يمكنك سؤالي عن فضائل الأذكار، أوقاتها الشرعية، أو أحكام المداومة عليها وسأجيبك فوراً بالأدلة الشرعية الموثقة بإذن الله."; //[span_22](start_span)[span_22](end_span)
    if (isEncyclopediaPage) return "أهلاً بك في الموسوعة الإسلامية! 📚 يمكنك سؤالي عن أي قسم من أقسام الموسوعة، وسأرشدك إلى ما ينفعك ويجيب على تساؤلاتك بإذن الله."; //[span_23](start_span)[span_23](end_span)
    if (isNamesPage) return "أهلاً بك في قسم أسماء الله الحسنى! ✨ يمكنك سؤالي عن معاني الأسماء جل جلاله، وكيفية التوسل بها في الدعاء، وأثرها في تزكية النفس بإذن الله."; //[span_24](start_span)[span_24](end_span)
    if (isSunnahPage) return "أهلاً بك في قسم السنن النبوية اليومية! 🌿 يمكنك سؤالي عن السنن المؤكدة، والرواتب اليومية، وفضائل اتباع هدي النبي ﷺ بإذن الله."; //[span_25](start_span)[span_25](end_span)
    if (isStoriesPage) return "أهلاً بك في قسم القصص والقبسات الإيمانية! 📜 يمكنك سؤالي عن قصص الأنبياء والصحابة والدروس والعبر المستفادة منها بإذن الله."; //[span_26](start_span)[span_26](end_span)
    if (isBooksPage) return "أهلاً بك في المكتبة والكتب الإسلامية! 📖 يمكنك سؤالي عن أمهات الكتب والمؤلفين وأفضل المراجع الشرعية والتفسير والحديث بإذن الله."; //[span_27](start_span)[span_27](end_span)
    return "السلام عليكم ورحمة الله وبركاته. أنا **مساعد تبصرة الرقمي**، مرشدك الفقهي والحديثي في موقع 'زاد المؤمن'. يمكنك سؤالي عن الفتاوى والأحكام، وسأجيبك بأدلة موثقة من القرآن والسنة الصحيحة بإذن الله."; //[span_28](start_span)[span_28](end_span)
}

// 3. إدارة البيانات[span_29](start_span)[span_29](end_span)
let currentChatHistory = JSON.parse(localStorage.getItem('zad_current_active_chat')) || [];
let archivedChats = JSON.parse(localStorage.getItem('zad_archived_chats')) || [];
let currentAttachedFile = null;

document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');
    const fileInput = document.getElementById('file-input');
    const attachmentPreview = document.getElementById('attachment-preview');
    const fileNameSpan = document.getElementById('file-name');
    const fileTypeIcon = document.getElementById('file-type-icon');
    const removeFileBtn = document.getElementById('remove-file-btn');

    // إعداد عناصر القائمة الجانبية
    setupSidebarUI();

    // عرض المحادثة الحالية أو الرسالة الترحيبية
    if (currentChatHistory.length > 0) {
        currentChatHistory.forEach(msg => appendMessageUI(msg.content, msg.role === 'user' ? 'user' : 'bot'));
    } else {
        const welcomeMsg = getPageWelcomeMessage();
        appendMessageUI(welcomeMsg, 'bot');
        currentChatHistory.push({ role: "assistant", content: welcomeMsg });
        saveCurrentChat();
    }

    // معالجة اختيار الملفات (صور / فيديو)
    fileInput?.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        currentAttachedFile = file;
        fileNameSpan.textContent = file.name;
        fileTypeIcon.textContent = file.type.startsWith('image/') ? '🖼️' : '🎥';
        attachmentPreview.classList.remove('hidden');
    });

    removeFileBtn?.addEventListener('click', clearAttachment);

    function clearAttachment() {
        currentAttachedFile = null;
        if (fileInput) fileInput.value = '';
        attachmentPreview?.classList.add('hidden');
    }

    // إرسال الرسالة
    chatForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const userText = chatInput.value.trim();
        if (!userText && !currentAttachedFile) return;

        let displayMessage = userText;
        if (currentAttachedFile) {
            displayMessage = `[مرفق: ${currentAttachedFile.name}]\n` + userText;
        }

        // تعطيل الإدخال أثناء المعالجة
        chatInput.disabled = true;
        appendMessageUI(displayMessage, 'user');
        chatInput.value = '';

        const loadingDiv = appendMessageUI('⏳ جاري التفكير وتحضير الرد الشرعي...', 'bot', true);

        currentChatHistory.push({ role: "user", content: displayMessage });
        saveCurrentChat();
        clearAttachment();

        const messagesPayload = [
            { role: "system", content: SYSTEM_INSTRUCTION },
            ...currentChatHistory.slice(-10)
        ];

        try {
            const response = await fetch(WORKER_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: "deepseek-chat",
                    messages: messagesPayload,
                    stream: false
                })
            });

            if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

            const data = await response.json();
            let botResponse = data.choices[0].message.content;

            // تطبيق ضابط السلام الصارم[span_30](start_span)[span_30](end_span)
            const userSaidSalam = /السلام\s+عليكم/i.test(userText);
            if (!userSaidSalam) {
                botResponse = botResponse.replace(/^(وعليكم السلام ورحمة الله وبركاته|وعليكم السلام ورحمة الله|وعليكم السلام|السلام عليكم ورحمة الله وبركاته|السلام عليكم)[!،.\n\s]*/gi, '').trim();
            }

            if (loadingDiv) loadingDiv.remove();
            appendMessageUI(botResponse, 'bot');

            currentChatHistory.push({ role: "assistant", content: botResponse });
            saveCurrentChat();
            renderSidebarHistory();

        } catch (error) {
            if (loadingDiv) loadingDiv.remove();
            appendMessageUI('عذراً، حدث خطأ في الاتصال بالخادم: ' + error.message, 'bot');
        } finally {
            chatInput.disabled = false;
            chatInput.focus();
        }
    });

    // دالة رسم الرسائل في الواجهة ودعم الخط العريض (Bold)
    function appendMessageUI(text, sender, isLoading = false) {
        const msgWrapper = document.createElement('div');
        msgWrapper.className = `flex flex-col ${sender === 'user' ? 'items-end' : 'items-start'} my-1`;

        const msgDiv = document.createElement('div');
        msgDiv.className = sender === 'user'
            ? 'bg-gold text-slate-950 font-medium px-4 py-3 rounded-2xl rounded-tr-none max-w-[85%] text-sm leading-relaxed shadow'
            : 'bg-slate-800/90 border border-slate-700 text-slate-100 px-4 py-3 rounded-2xl rounded-tl-none max-w-[90%] text-sm leading-relaxed shadow';

        const contentDiv = document.createElement('div');
        let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
        contentDiv.innerHTML = formattedText;
        msgDiv.appendChild(contentDiv);

        // أزرار النسخ والمشاركة للذكاء الاصطناعي[span_31](start_span)[span_31](end_span)
        if (sender === 'bot' && !isLoading) {
            const actionsDiv = document.createElement('div');
            actionsDiv.className = 'flex items-center gap-2 mt-3 pt-2 border-t border-slate-700/60 text-xs';

            const copyBtn = document.createElement('button');
            copyBtn.className = 'text-gold hover:underline flex items-center gap-1';
            copyBtn.innerHTML = '📋 نسخ';
            copyBtn.onclick = () => {
                navigator.clipboard.writeText(text);
                copyBtn.innerHTML = '✅ تم';
                setTimeout(() => copyBtn.innerHTML = '📋 نسخ', 2000);
            };

            const waBtn = document.createElement('button');
            waBtn.className = 'text-emerald-400 hover:underline flex items-center gap-1';
            waBtn.innerHTML = '🟢 واتساب';
            waBtn.onclick = () => {
                const shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent("*من موقع زاد المؤمن:*\n\n" + text)}`;
                window.open(shareUrl, '_blank');
            };

            actionsDiv.appendChild(copyBtn);
            actionsDiv.appendChild(waBtn);
            msgDiv.appendChild(actionsDiv);
        }

        msgWrapper.appendChild(msgDiv);
        chatMessages.appendChild(msgWrapper);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return msgWrapper;
    }

    // إدارة القائمة الجانبية السلسة
    function setupSidebarUI() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebar-overlay');
        const toggleBtn = document.getElementById('toggle-sidebar-btn');
        const closeBtn = document.getElementById('close-sidebar-btn');
        const newChatBtn = document.getElementById('new-chat-btn');

        const toggleSidebar = () => {
            sidebar.classList.toggle('translate-x-full');
            overlay.classList.toggle('hidden');
        };

        toggleBtn?.addEventListener('click', toggleSidebar);
        closeBtn?.addEventListener('click', toggleSidebar);
        overlay?.addEventListener('click', toggleSidebar);

        newChatBtn?.addEventListener('click', () => {
            archiveCurrentChat();
            currentChatHistory = [];
            localStorage.removeItem('zad_current_active_chat');
            chatMessages.innerHTML = '';
            
            const welcomeMsg = getPageWelcomeMessage();
            appendMessageUI(welcomeMsg, 'bot');
            currentChatHistory.push({ role: "assistant", content: welcomeMsg });
            saveCurrentChat();
            renderSidebarHistory();
            if (window.innerWidth < 768) toggleSidebar();
        });

        renderSidebarHistory();
    }

    // تعديل الأرشفة لمنع حفظ المحادثات التي لا تحتوي على أسئلة من المستخدم
    function archiveCurrentChat() {
        if (!currentChatHistory || currentChatHistory.length === 0) return;
        
        const hasUserMsg = currentChatHistory.some(m => m.role === 'user');
        if (!hasUserMsg) return;

        const timeString = new Date().toLocaleString('ar-SA', { dateStyle: 'short', timeStyle: 'short' });
        
        archivedChats.unshift({ id: Date.now(), date: timeString, messages: [...currentChatHistory] });
        if (archivedChats.length > 25) archivedChats.pop();
        
        localStorage.setItem('zad_archived_chats', JSON.stringify(archivedChats));
    }

    // دالة عرض السجل وتصفية الخانات الفارغة وتنظيف عناوين المحادثات
    function renderSidebarHistory() {
        const historyContainer = document.getElementById('history-list');
        if (!historyContainer) return;

        let archives = JSON.parse(localStorage.getItem('zad_archived_chats')) || [];
        
        archives = archives.filter(session => session.messages && session.messages.some(m => m.role === 'user'));
        localStorage.setItem('zad_archived_chats', JSON.stringify(archives));

        if (archives.length === 0) {
            historyContainer.innerHTML = `<p class="text-xs text-slate-500 text-center py-4">لا توجد محادثات مؤرشفة</p>`;
            return;
        }

        historyContainer.innerHTML = archives.map((session) => {
            const firstUserMsg = session.messages.find(m => m.role === 'user')?.content || 'محادثة';
            const cleanTitle = firstUserMsg.replace(/^\[مرفق:.*?\]\n?/, '').trim();
            const shortTitle = cleanTitle.length > 22 ? cleanTitle.substring(0, 22) + '...' : cleanTitle;
            
            return `
                <div class="group flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-800 transition cursor-pointer border border-transparent hover:border-slate-700" onclick="resumeSession(${session.id})">
                    <div class="flex items-center gap-2 overflow-hidden">
                        <span class="text-xs">💬</span>
                        <span class="text-xs text-slate-300 truncate font-medium">${shortTitle}</span>
                    </div>
                    <button onclick="event.stopPropagation(); deleteSession(${session.id})" class="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-red-400 text-xs p-1 transition" title="حذف">✕</button>
                </div>
            `;
        }).join('');
    }

    function saveCurrentChat() {
        localStorage.setItem('zad_current_active_chat', JSON.stringify(currentChatHistory));
    }

    // دوال استكمال وحذف المحادثات من القائمة الجانبية
    window.resumeSession = (id) => {
        archiveCurrentChat();
        const archives = JSON.parse(localStorage.getItem('zad_archived_chats')) || [];
        const index = archives.findIndex(s => s.id === id);
        if (index === -1) return;

        const selected = archives.splice(index, 1)[0];
        currentChatHistory = selected.messages;
        
        localStorage.setItem('zad_archived_chats', JSON.stringify(archives));
        saveCurrentChat();

        chatMessages.innerHTML = '';
        currentChatHistory.forEach(msg => appendMessageUI(msg.content, msg.role === 'user' ? 'user' : 'bot'));
        renderSidebarHistory();
    };

    window.deleteSession = (id) => {
        let archives = JSON.parse(localStorage.getItem('zad_archived_chats')) || [];
        archives = archives.filter(s => s.id !== id);
        localStorage.setItem('zad_archived_chats', JSON.stringify(archives));
        renderSidebarHistory();
    };
});
