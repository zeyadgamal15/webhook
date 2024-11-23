(التغييرات في النسخة الموجودة على GitHub)

const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');  // لتسهيل إرسال الردود

const app = express();
const port = 3000;

const botToken = '7912317651:AAEM80TKn5WOKyWNl_Nm91ev6jXlUAWVTb0';  // توكن البوت بتاعك

app.use(bodyParser.json()); // لتفسير البيانات القادمة في JSON

// نقطة النهاية للـ Webhook
app.post('/webhook', async (req, res) => {
    const update = req.body;
    console.log(update);  // لعرض التحديثات في الـ console (اختياري)

    // مثلاً: لو فيه رسالة جديدة من المستخدم
    if (update.message) {
        const chatId = update.message.chat.id;
        const text = 'تم استلام رسالتك!';

        // إرسال رد على المستخدم
        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            body: JSON.stringify({
                chat_id: chatId,
                text: text
            }),
            headers: { 'Content-Type': 'application/json' }
        });
    }

    res.status(200).send('OK');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
