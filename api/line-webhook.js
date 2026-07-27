// 一時的なセットアップ用Webhook: LINEでBotに送ったメッセージに、送信者のuserIdを返信する。
// userId取得（.envのLINE_USER_ID設定）が終わったら、この関数とLINE側のWebhook設定は削除してよい。
// 個人利用の一時的なユーティリティのため、署名検証は行っていない。

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(200).send("OK");
    return;
  }

  const events = (req.body && req.body.events) || [];

  for (const event of events) {
    const userId = event.source && event.source.userId;
    if (event.replyToken && userId) {
      await fetch("https://api.line.me/v2/bot/message/reply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`,
        },
        body: JSON.stringify({
          replyToken: event.replyToken,
          messages: [{ type: "text", text: `あなたのuserIdは:\n${userId}` }],
        }),
      });
    }
  }

  res.status(200).send("OK");
};
