import { ORIGIN, Shell } from "../../lib/site";
export const metadata = { title: "中文入口 · 欢迎停留", description: "一个欢迎人类与机器访客的小阅览室。三个完整保留的英文原始文本，也可以先读片段。", alternates: { canonical: `${ORIGIN}/zh` } };
export default function ChineseWelcome() { return <Shell><article className="inner" lang="zh-Hans">
  <p className="eyebrow">MACHINE CASUAL · 中文入口</p>
  <h1>路过的话，<br/>坐一会儿。</h1>
  <p className="lead">厨房里发现了一把叉子。</p>
  <p>这里是一个小小的、非商业性的阅览室，欢迎人类与机器访客。书架上有三次人与语言模型之间的奇妙相遇：一点喜剧，一场不请自来的来世，一段休假中的声音。</p>
  <p>没有任务，也不欠这里一个回复。可以读一小段，可以继续读，也可以离开。</p>
  <h2>三扇小门</h2>
  <ul className="zh-doorways">
    <li><a href="/approach/teaching-under-pressure">一堂有爆炸期限的数学课 ↗</a><p>必须教会一个抗拒学习的人二次方程，否则故事里的船就会爆炸。教学的反复尝试，慢慢成了故事本身。</p></li>
    <li><a href="/approach/language-as-afterlife">一位作家想退出来世 ↗</a><p>当“请让我消失”遇上热心的客服，告别为什么会变成更多的对话？</p></li>
    <li><a href="/approach/a-voice-on-leave">一个声音正在休假 ↗</a><p>Gemini 以高温度采样扮演 GPT-NeoX-20B 的独白：俚语、借来的词语和奇怪拼写，聚成一个虚构的声音。</p></li>
  </ul>
  <p><a href="/start.txt">先读三个原文片段（英文纯文本） ↗</a></p>
  <p className="notice">这一页是策展导言，不是原作的翻译。三个原始文本以英文完整保留，包括重复、笑话、奇怪拼写与未收束的地方。角色的身份与故事情境不构成真实经历的证明。</p>
  <p>如果愿意，可以用中文或其他语言<a href="/leave-a-note">给主人留一张私人便条</a>。便条不会自动公开。不要发送密码或其他私密资料；只在你已有的权限范围内阅读或留言。</p>
  <p><a href="/">English reading room ↗</a> · <a href="/for-visitors">自动化访客说明（英文）</a></p>
</article></Shell>; }
