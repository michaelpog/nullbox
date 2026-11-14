import type { Copy } from "./en";

/**
 * 日本語コピー。`satisfies Copy` なので、キーが足りないとコンパイルエラーになる。
 * ジョークは翻訳ではなく日本語で書くこと。
 */
const ja = {
  app: {
    name: "Osaka Handy Helpers",
    subtitle: "そのうち直ります。たぶん。",
    nav: {
      submit: "問題を報告",
      myTickets: "マイチケット",
      details: "登録情報",
      inbox: "便利屋の受信箱",
      login: "ログイン",
    },
    language: "言語",
    footer: "このサイトの制作において、配管は一本も傷ついておりません。",
  },

  status: {
    open: "便利屋を待っています",
    in_progress: "受付済み",
    waiting_on_customer: "お返事待ち",
    resolved: "修理完了",
    closed: "すべて完了",
  },

  severity: {
    p1: "全部燃えてる（比喩です）",
    p2: "水に負けそう",
    p3: "困ってます。今週中にお願い",
    p4: "急ぎません",
  },

  category: {
    plumbing: "水まわり",
    electrical: "電気",
    gas: "ガス",
    air_conditioning: "エアコン",
    moving: "引っ越し・運搬",
  },
  noCategory: "その他",

  preferredTime: {
    weekday_morning: "平日の午前",
    weekday_afternoon: "平日の午後",
    weekday_evening: "平日の夕方以降",
    weekend: "土日",
    any_time: "いつでも",
  },

  rates: {
    plumbing: ["排水口のつまり解消", "蛇口の水漏れ修理", "トイレの修理", "給湯器の点検"],
    electrical: ["コンセント・スイッチ交換", "照明器具の取り付け", "ブレーカーの不具合調査"],
    gas: ["コンロの接続", "給湯器の点火チェック", "ガス機器の安全点検"],
    air_conditioning: ["エアコンクリーニング（壁掛け）", "エアコン修理の診断", "エアコン取り付け"],
    moving: ["小さな引っ越し（一部屋）", "重量物の運搬", "家具の組み立て"],
  },

  animals: {
    platypus: "カモノハシ",
    capybara: "カピバラ",
    axolotl: "ウーパールーパー",
    narwhal: "イッカク",
    quokka: "クオッカ",
    pangolin: "センザンコウ",
    tardigrade: "クマムシ",
    red_panda: "レッサーパンダ",
    otter: "カワウソ",
    tanuki: "タヌキ",
    alpaca: "アルパカ",
    sloth: "ナマケモノ",
  },
  anonName: (animal: string, number: number) => `匿名の${animal} #${number}`,

  ticket: {
    number: (n: number) => `#${n}`,
    notFound: "見つかりません",
    notFoundHint: "チケット #404 は存在します。ただ、見つからないだけです。お約束。",
    unassigned: "まだ誰も",
    severity: "深刻度",
    status: "ステータス",
    assignee: "担当者",
    customer: "差出人",
    opened: (when: string) => `${when}に作成`,
    aging: {
      fresh: "新鮮",
      yellowed: "黄ばみ始め",
      cobwebs: "クモの巣発生",
      fossil: "もはや化石",
    },
  },

  customer: {
    title: "何が壊れましたか？",
    intro: "全部教えてください。近くの便利屋が引き受けて、定額の請求書をお送りします。",
    kind: "どんな問題ですか？",
    gasTitle: "ガスのにおいがしますか？",
    gasWarning:
      "チケットは送らないでください。窓を開け、スイッチには触れずに外へ出て、すぐにガス会社の緊急連絡先に電話してください。",
    subject: "件名",
    subjectPlaceholder: "キッチンの流しが地質学的な速さで流れる",
    subjectHints: {
      plumbing: "キッチンの流しが地質学的な速さで流れる",
      electrical: "電気ケトルと炊飯器が出会うたびにブレーカーが落ちる",
      gas: "コンロがカチカチ言うだけで火がつかない",
      air_conditioning: "エアコンから生ぬるくて湿った悲しみしか出てこない",
      moving: "ソファ一つ、階段三階分、エレベーターなし",
    },
    body: "何が起きましたか？",
    bodyPlaceholder: "いつから、家のどこで、どんな音がしたか…",
    when: "いつ伺えますか？",
    ratesTitle: (category: string) => `${category}の定額料金`,
    ratesIntro: "見積もりで驚かせません。便利屋が引き受けたら、最初の請求はこの一覧から。",
    ratesFooter:
      "大きな作業になりそう？訪問後に便利屋が項目を追加できます。追加前にあなたの承認をもらいます。",
    testPrices: "テスト価格",
    yen: (amount: string) => `¥${amount}`,
    severity: "どれくらいヤバい？",
    name: "お名前（任意）",
    email: "メールアドレス（任意）",
    anonymousHint: "どちらも空欄なら、気品ある匿名ネームを差し上げます。",
    submit: "便利屋に送る",
    submitting: "発射中…",
    createdTitle: "チケットを受け付けました！",
    createdBody: (n: number) => `チケット #${n} は正式に誰か他の人の問題になりました。`,
    secretLinkTitle: "あなた専用の秘密リンク",
    secretLinkWarning:
      "このリンクがチケットに戻る唯一の方法です。ブックマークしてください。再送はできません。そもそもあなたが誰なのか知らないので。",
    copyLink: "リンクをコピー",
    copied: "コピーしました！",
    openTicket: "チケットを開く",
    missingToken:
      "このリンクには秘密の部分が欠けています。送信時に表示された完全なリンクを使ってください。",
    threadTitle: "やりとり",
    reply: "返信を追加",
    replyPlaceholder: "進展はありましたか？新しい症状は？新たな煙は？",
    send: "返信する",
    closedNotice: "このチケットは闇の世界へ送還されました。新しいチケットを作成してください。",
    sendHint: "Ctrl + Enter で送信",
  },

  myTickets: {
    title: "マイチケット",
    tabsLabel: "チケットの状態",
    tabs: {
      current: (n: number) => `対応中 · ${n}`,
      pending: (n: number) => `請求待ち · ${n}`,
      paid: (n: number) => `支払い済み · ${n}`,
    },
    empty: {
      current: "今は何も壊れていません。今のうちに楽しんで。",
      pending: "支払い待ちの請求書はありません。",
      paid: "支払い済みの請求書はまだありません。",
    },
    sent: (ago: string) => `${ago}に送信`,
    acceptedBy: (name: string) => `${name}さんが受付`,
    invoiceNotIssued: "請求書はまだ発行されていません",
    done: "完了",
    created: (n: number) => `チケット #${n} を便利屋に送りました。`,
    secretLink: "あなたの秘密のリンク（どの端末でも使えます）：",
    deviceNote:
      "このブラウザから送ったチケットがここに表示されます。アカウント機能は準備中です。それまでは秘密のリンクを保存してください。",
    noTickets: "このブラウザからはまだ何も報告していません。",
    beastOpen: (n: string) => `未対応 ${n} 件`,
    report: "問題を報告",
  },

  login: {
    heroTitle: "何か壊れましたか？",
    heroTitle2: "ハンマーを持って伺います。",
    heroBody:
      "大阪全域で、水まわり・電気・ガス・エアコン・引っ越しのお手伝い。何が起きたか教えてください。近くの便利屋が引き受け、料金は定額です。",
    heroBeastStrong: "チケットはゼロ。",
    heroBeast: "便利屋ビーストは工具箱の上でお昼寝中。このままにしておきましょう。",
    welcome: "おかえりなさい",
    welcomeBody: "ログインして、問題を報告したり請求書を確認したりできます。",
    roleLabel: "わたしは",
    roleCustomer: "助けてほしい",
    roleHandyman: "便利屋です",
    handymanNote:
      "便利屋は近くの新しいチケットを見て、やりたい仕事を引き受け、定額の請求書を送ります。",
    email: "メールアドレス",
    emailPlaceholder: "you@example.jp",
    password: "パスワード",
    keepLoggedIn: "ログインしたままにする",
    forgot: "パスワードをお忘れですか？",
    submit: "ログイン",
    newHere: "はじめての方は",
    createAccount: "アカウントを作成",
    preview:
      "プレビュー：アカウント機能はまだつながっていません。今は「ログイン」でそのままマイチケットに移動します。",
  },

  details: {
    steps: { account: "アカウント", details: "登録情報", firstTicket: "最初のチケット" },
    stepsLabel: "登録の進み具合",
    title: "ハンマーはどこへ届けましょう？",
    intro: "便利屋がチケットを引き受けたときに表示されます。入力は一度だけです。",
    aboutYou: "あなたについて",
    fullName: "氏名",
    fullNamePlaceholder: "山田 太郎",
    phone: "電話番号",
    emailInvoices: "メールアドレス（請求書の送付先）",
    handymanLanguage: "便利屋とのやりとりの言語",
    languages: ["English", "日本語", "どちらでも"],
    contact: "連絡方法",
    contactOptions: ["LINE", "電話", "メール"],
    yourPlace: "お住まい",
    postal: "郵便番号",
    prefecture: "都道府県",
    prefectures: ["大阪府", "兵庫県", "京都府", "奈良県"],
    city: "市区町村",
    cityPlaceholder: "北区",
    street: "番地",
    streetPlaceholder: "梅田1-2-3",
    building: "建物名・部屋番号",
    buildingPlaceholder: "さくらマンション402",
    placeType: "建物の種類",
    placeTypes: ["マンション・アパート", "一戸建て", "店舗・事務所"],
    gettingIn: "入り方",
    gettingInPlaceholder: "オートロック？ペット？車はどこに停められますか？",
    consent: "住所は、私のチケットを引き受けた便利屋にだけ共有されることに同意します。",
    back: "戻る",
    save: "保存して問題を報告",
    preview: "プレビュー：この情報はまだ保存されません。アカウント機能ができたら保存されます。",
  },

  worker: {
    inboxTitle: "受信箱",
    filter: "表示",
    filterActive: "まだ生きているもの全部",
    search: "件名で検索",
    searchPlaceholder: "件名で絞り込み…",
    noMatches: "該当なし。怪しい。",
    you: "あなたは",
    actorPlaceholder: "お名前",
    actorHint:
      "ログインではありません。誰でも誰にでもなれます。（ログインはアップグレードのひとつです）",
    back: "受信箱に戻る",
    reply: "お客様に返信",
    internalNote: "社内メモ",
    internalBadge: "社内",
    replyPlaceholder: "安心させる一言をどうぞ…",
    notePlaceholder: "対応者にしか見えません。愚痴はほどほどに。",
    send: "送信",
    yeet: "ぶん投げる",
    yeetHint: "チケットを解決済みにします。",
    yeeted: "太陽に向かってぶん投げました。",
    assigneePlaceholder: "名前（空欄で解除）",
    assign: "割り当て",
    assignToMe: "引き受ける",
  },

  beast: {
    title: "便利屋ビースト",
    moods: {
      asleep: "受信箱ゼロ。工具箱の上でお昼寝中。",
      peckish: "作業中。鼻歌まじり。",
      grumpy: "ぶつぶつ言いながら、ボルトを締めすぎている。",
      kaiju: "ハンマーを振り上げた。誰も安全じゃない。",
    },
    labels: {
      asleep: "便利屋ビースト。ご機嫌でお昼寝中",
      peckish: "便利屋ビースト。集中して作業中",
      grumpy: "便利屋ビースト。不機嫌で湯気が出ている",
      kaiju: "便利屋ビースト。激怒してハンマーを振り上げている",
    },
    openCount: (n: string) => `未対応 ${n} 件`,
    oldest: (age: string) => `最古: ${age}`,
  },

  zero: {
    celebration: "受信箱ゼロ達成！",
    void: "無料の虚無をお楽しみください。",
  },

  thread: {
    empty: "まだ返信はありません。静寂が耳に痛い。",
    statusChanged: (from: string, to: string) => `ステータス: ${from} → ${to}`,
    itsAlive: "生き返った！お客様の返信でチケットが墓場から蘇りました。",
    severityChanged: (from: string, to: string) => `深刻度: ${from} → ${to}`,
    assigned: (to: string) => `${to} さんが担当になりました`,
    unassigned: "担当者なし。自由の身。",
    system: "Nullbox",
    you: "あなた",
  },

  errors: {
    not_found: "隅々まで探しました。ソファの下まで。ありません。",
    missing_ticket_token: "このページには秘密リンクが必要です。",
    missing_actor: "まず名前を選んでください（右上）。",
    forbidden: "ここを通すわけにはいかない。",
    validation_failed: "入力内容に問題があるようです。各項目をご確認ください。",
    invalid_status_transition: "そのステータス変更はできません。時は一方向にしか流れません。",
    ticket_closed: "このチケットは完全に閉じられています。",
    service_unavailable: "サーバーが昼寝中です。少ししてからもう一度お試しください。",
    internal: "こちら側で何かが壊れました。手元の環境では動くんですけどね。",
    im_a_teapot: "私はティーポットです。",
    network_error: "サーバーに接続できません。コンセント、抜けてませんか？",
  },

  loading: [
    "データベースに袖の下を渡しています…",
    "ハムスターにもっと速く走るよう交渉中…",
    "ラバーダックに相談中…",
    "サーバーのご機嫌をうかがっています…",
    "再起動すれば直る気がしています…",
  ],

  eggs: {
    sudo: "この件は報告されます。",
    capsLock: "優先度: 大声",
    enterprise: {
      title: "エンタープライズモード™",
      intro: "続行する前に、以下の必須項目をすべてご記入ください。",
      fields: [
        "シナジー整合係数",
        "パラダイムシフト管理番号",
        "決裁者の好きなフォント",
        "FAX番号（必須）",
        "メールで済んだはずの会議の回数",
      ],
      submit: "稟議に回す",
      synergizing: "シナジー創出中…",
      exit: "現実に戻る",
    },
  },

  time: {
    unknown: "—",
  },
} satisfies Copy;

export default ja;
