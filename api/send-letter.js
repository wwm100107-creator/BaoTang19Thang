export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { replyText, date } = req.body || {};
    const sendDate = date || new Date().toLocaleString('vi-VN');
    const content = replyText || 'Cảm ơn anh vì 19 tháng tuyệt vời vừa qua... Em yêu anh!';

    try {
        const response = await fetch('https://formsubmit.co/ajax/wwm100107@gmail.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Origin': 'https://baotang19thang.vercel.app',
                'Referer': 'https://baotang19thang.vercel.app/'
            },
            body: JSON.stringify({
                _subject: '💌 [Bảo Tàng 19 Tháng] Người Yêu Đã Gửi Thư Hồi Âm Cho Bạn! ❤️',
                _captcha: 'false',
                _template: 'box',
                'Người gửi': 'Người Yêu Của Bạn ❤️',
                'Thời gian gửi': sendDate,
                'Nội dung bức thư': content,
                'Thông điệp': 'Kỷ niệm 19 tháng yêu nhau ✨ Chúc hai bạn mãi mãi hạnh phúc bên nhau!'
            })
        });

        const data = await response.json().catch(() => ({}));
        return res.status(200).json({ success: true, data });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
