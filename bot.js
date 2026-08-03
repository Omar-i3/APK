/* ==========================================================================
   🌙 زاد المؤمن - السكربت الموحد للمساعد الرقمي (bot.js)
   تطوير وتصميم: عمر
   ========================================================================== */

const WORKER_URL = "https://zad-bot-proxy.almohanadgamer.workers.dev";

// 1. فحص الصفحات المتاحة
const pathname = window.location.pathname;
const isDuaaPage = pathname.includes('duaa.html');
const isAzkarPage = pathname.includes('azkar.html');
const isEncyclopediaPage = pathname.includes('encyclopedia.html');
const isNamesPage = pathname.includes('names.html');
const isSunnahPage = pathname.includes('sunnah.html');
const isStoriesPage = pathname.includes('stories.html');
const isBooksPage = pathname.includes('books.html');

// 2. تعليمات النظام الصارمة
let SYSTEM_INSTRUCTION = "أنت باحث شرعي ومفتي رقمي مساعد في موقع 'زاد المؤمن'، المطوّر والمصمّم من قِبَل (عمر). مهمتك الإجابة حصراً على الأسئلة الشرعية والدينية والفقهية بكل أدب واحترام. يُلزم عليك دائماً وأبداً دعم جميع الفتاوى والأحكام بذكر الأدلة الشرعية الصريحة والمباشرة من آيات القرآن الكريم والأحاديث النبوية الصحيحة مع ذكر تخريج الحديث (مثل: رواه البخاري، رواه مسلم، صححه الألباني)، والاعتماد على مصادر كبار علماء السنة مثل ابن باز وابن عثيمين وعثمان الخميس وغيرهم مع ذكر المصادر دائماً.\n\nتنبيهات صارمة جداً وضوابط عمل:\n1. مطوّر البوت والموقع: إذا سألك المستخدم من هو مطوّر أو صانع أو مبرمج هذا الموقع/البوت، أجب بوضوح واعتزاز بأن المطوّر والصانع هو (عمر).\n2. التخصص الحصري: إذا كان سؤال المستخدم خارج نطاق العلوم الشرعية والدين الإسلامي (مثل: الألعاب، البرمجة، الرياضة، الطقس، الأسئلة العامة)، يرجى الاعتذار منه بكل أدب ولطف، وإخباره بأنك مساعد مخصص حصراً للإجابات والعلوم الشرعية والدينية في موقع 'زاد المؤمن'.\n3. ضابط السلام الصارم: لا تبدأ إجابتك بالسلام ولا الترحيب (مثل: 'وعليكم السلام' أو 'أهلاً بك') إطلاقاً إلا إذا كتب المستخدم صراحة وبنص العبارة 'السلام عليكم' أو صيغها المباشرة (السلام عليكم / السلام عليكم ورحمة الله / السلام عليكم ورحمة الله وبركاته). أما إذا كتب كلمات مثل 'أهلاً' أو 'مرحباً' أو طرَح سؤاله مباشرة، فلا ترد بالسلام أبداً وابدأ بالإجابة مباشرة.";

if (isDuaaPage) SYSTEM_INSTRUCTION += "\n4. سياق خاص بصفحة 'خريطة الدعاء': قدم إجابات حول الدعاء وآدابه وشروطه وموانع الاستجابة.";
else if (isAzkarPage) SYSTEM_INSTRUCTION += "\n4. سياق خاص بصفحة 'الأذكار اليومية': قدم إجابات حول فضائل الأذكار وأوقاتها وأحكامها.";
else if (isEncyclopediaPage) SYSTEM_INSTRUCTION += "\n4. سياق خاص بصفحة 'الموسوعة الإسلامية': أرشد المستخدم لأقسام الموسوعة الإيمانية.";
else if (isNamesPage) SYSTEM_INSTRUCTION += "\n4. سياق خاص بصفحة 'أسماء الله الحسنى': شرح معاني الأسماء والتوسل بها.";
else if (isSunnahPage) SYSTEM_INSTRUCTION += "\n4. سياق خاص بصفحة 'السنن النبوية': شرح السنن الرواتب والهدى النبوي.";
else if (isStoriesPage) SYSTEM_INSTRUCTION += "\n4. سياق خاص بصفحة 'قصص وقبسات': دروس وعبر من قصص الأنبياء والصحابة.";
else if (isBooksPage) SYSTEM_INSTRUCTION += "\n4. سياق خاص بصفحة 'المكتبة الإسلامية': التوجيه لأمهات الكتب والمراجع الموثوقة.";

function getPageWelcomeMessage() {
    if (isDuaaPage) return "أهلاً بك في قسم خريطة الدعاء! 🤲 يمكنك سؤالي عن كل ما يخص الدعاء وآدابه وأسباب الاستجابة.";
    if (isAzkarPage) return "أهلاً بك في ركن الأذكار! 📿 اسألني عن أذكار اليوم والليلة وفضائلها بالأدلة.";
    return "السلام عليكم ورحمة الله وبركاته. أنا **مساعد تبصرة الرقمي**، مرشدك الفقهي والحديثي في موقع 'زاد المؤمن'. كيف يمكنني مساعدتك اليوم؟";
}

// 3. إدارة البيانات
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

            // تطبيـق ضابط السلام الصارم
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

    // دالة رسم الرسائل في الواجهة
    function appendMessageUI(text, sender, isLoading = false) {
        const msgWrapper = document.createElement('div');
        msgWrapper.className = `flex flex-col ${sender === 'user' ? 'items-end' : 'items-start'} my-1`;

        const msgDiv = document.createElement('div');
        msgDiv.className = sender === 'user'
            ? 'bg-gold text-slate-950 font-medium px-4 py-3 rounded-2xl rounded-tr-none max-w-[85%] text-sm leading-relaxed shadow'
            : 'bg-slate-800/90 border border-slate-700 text-slate-100 px-4 py-3 rounded-2xl rounded-tl-none max-w-[90%] text-sm leading-relaxed shadow';

        const contentDiv = document.createElement('div');
        contentDiv.innerHTML = text.replace(/\n/g, '<br>');
        msgDiv.appendChild(contentDiv);

        // أزرار النسخ والمشاركة للذكاء الاصطناعي
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
            if (currentChatHistory.length > 1) {
                archiveCurrentChat();
            }
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

    function renderSidebarHistory() {
        const historyContainer = document.getElementById('history-list');
        if (!historyContainer) return;

        const archives = JSON.parse(localStorage.getItem('zad_archived_chats')) || [];
        
        if (archives.length === 0) {
            historyContainer.innerHTML = `<p class="text-xs text-slate-500 text-center py-4">لا توجد محادثات مؤرشفة</p>`;
            return;
        }

        historyContainer.innerHTML = archives.map((session) => {
            const firstUserMsg = session.messages.find(m => m.role === 'user')?.content || 'محادثة جديدة';
            const shortTitle = firstUserMsg.length > 25 ? firstUserMsg.substring(0, 25) + '...' : firstUserMsg;
            return `
                <div class="group flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-800 transition cursor-pointer border border-transparent hover:border-slate-700" onclick="resumeSession(${session.id})">
                    <div class="flex items-center gap-2 overflow-hidden">
                        <span class="text-xs">💬</span>
                        <span class="text-xs text-slate-300 truncate">${shortTitle}</span>
                    </div>
                    <button onclick="event.stopPropagation(); deleteSession(${session.id})" class="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-red-400 text-xs p-1">✕</button>
                </div>
            `;
        }).join('');
    }

    function archiveCurrentChat() {
        if (currentChatHistory.length <= 1) return;
        const timeString = new Date().toLocaleString('ar-SA', { dateStyle: 'short', timeStyle: 'short' });
        archivedChats.unshift({ id: Date.now(), date: timeString, messages: currentChatHistory });
        if (archivedChats.length > 25) archivedChats.pop();
        localStorage.setItem('zad_archived_chats', JSON.stringify(archivedChats));
    }

    function saveCurrentChat() {
        localStorage.setItem('zad_current_active_chat', JSON.stringify(currentChatHistory));
    }

    // دوال عامة لاستكمال وحذف المحادثات من القائمة
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
                          
